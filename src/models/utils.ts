'use strict';
import vscode = require('vscode');
import Constants = require('./constants');

// Return the active text editor if there's one
export function getActiveTextEditor()
{
    let editor = undefined;
    if(vscode.window && vscode.window.activeTextEditor)
    {
        editor = vscode.window.activeTextEditor;
    }
    return editor;
}

// Helper to log messages to "MSSQL" output channel
export function logToOutputChannel(msg: any)
{
    let outputChannel = vscode.window.createOutputChannel(Constants.gOutputChannelName);
    outputChannel.show();
    if(msg instanceof Array)
    {
        msg.forEach(element => {
            outputChannel.appendLine(element.toString());
        });
    }
    else
    {
        outputChannel.appendLine(msg.toString());
    }
}

// Helper to log debug messages
export function logDebug(msg: any)
{
    let config = vscode.workspace.getConfiguration(Constants.gExtensionName);
    let logDebugInfo = config[Constants.gConfigLogDebugInfo];
    if(logDebugInfo == true)
    {
        let currentTime = new Date().toLocaleTimeString();
        let outputMsg = "[" + currentTime + "]: " + msg ? msg.toString() : "";
        console.log(outputMsg);
    }
}

// Helper to show an info message
export function showInfoMsg(msg: string)
{
    vscode.window.showInformationMessage(Constants.gExtensionName + ": " + msg );
}

// Helper to show an warn message
export function showWarnMsg(msg: string)
{
    vscode.window.showWarningMessage(Constants.gExtensionName + ": " + msg );
}

// Helper to show an error message
export function showErrorMsg(msg: string)
{
    vscode.window.showErrorMessage(Constants.gExtensionName + ": " + msg );
}
