'use strict';
import vscode = require('vscode');
import MainController from './controllers/controller';
var open = require("open");

let controller: MainController = undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
    controller = new MainController(context);
	context.subscriptions.push(controller);
	controller.activate();
    const extensionUpgradeMessage = 'This extension is not actively maintained. Install the official mssql extension from the Marketplace.';
    vscode.window.showInformationMessage(extensionUpgradeMessage, 'Go to Marketplace' ).then(selected => {
        if (selected === 'Go to Marketplace') {
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