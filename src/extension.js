// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

"use strict";

var _vscode = require("vscode");

var vscode = _interopRequireWildcard(_vscode);

var _child_process = require("child_process");

var cp = _interopRequireWildcard(_child_process);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information(console.log) and errors(console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  var disposable = vscode.commands.registerCommand("extension.quickcode", function () {
    // The code you place here will be executed every time your command is executed
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
      // No open text editor
    }
    var selection = editor.selection;
    if (editor.document.getText(selection).length < 1) {
      vscode.window.showInformationMessage("Please select a sentence for QuickCode to work!!!");
    } else {
      var text = editor.document.getText(selection) + " in " + editor.document.languageId;
      var how = "howdoi \"" + text + "\"";
      // Run howdoi command on the shell
      cp.exec(how, function (err, ans) {
        if (err) {
          throw err;
        }

        editor.edit(function (editBuilder) {
          editBuilder.replace(selection, ans);
        });
      });
    }
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
