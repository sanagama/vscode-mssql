'use strict';
import vscode = require('vscode');
import MainController from './controllers/controller';
var open = require("open");

let controller: MainController = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
    // Don't initialize the controller & commands - display the info message and do nothing
    //
    // controller = new MainController(context);
	// context.subscriptions.push(controller);
	// controller.activate();

    const extensionUpgradeMessage = "This prototype is deprecated. Get Microsoft's official 'mssql' extension from the VS Code Marketplace.";
    vscode.window.showInformationMessage(extensionUpgradeMessage, 'Go to VS Code Marketplace' ).then(selected => {
        if (selected === 'Go to VS Code Marketplace') {
            open('https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql');
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate()
{
    if(controller) {
        controller.deactivate();
    }
}