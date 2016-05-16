'use strict';
import vscode = require('vscode');
import ConnInfo = require('../models/connectionInfo');
import Constants = require('../models/constants');
import Utils = require('../models/utils');
import { RecentConnections } from '../models/recentConnections';
import Interfaces = require('../models/interfaces');

export default class ConnectionUI
{
    // Helper to let user choose a connection from a picklist
    // Return the ConnectionInfo for the user's choice
    public static showConnectionList(recentConnections: RecentConnections)
    {
        return new Promise<Interfaces.IConnectionCredentials>((resolve, reject) =>
        {
            if(recentConnections.isEmpty())
            {
                // No recent connections - show the new connection wizard
                this.showNewConnectionWizard()
                .then((selection) =>
                {
                    if(!selection) {
                        return false;
                    }
                    resolve(selection);
                });
            }
            else
            {
                // We have recent connections - show "New connection..." followed by recent connections in a picklist
                this.showNewAndRecentConnectionPickList(recentConnections).then((selection) =>
                {
                    if(!selection) {
                        return false;
                    }
                    resolve(selection);
                });
            }
        });
    }

    // Helper to let user choose between "New connection..." and "recent connections" from a picklist
    private static showNewAndRecentConnectionPickList(recentConnections: RecentConnections)
    {
        return new Promise<Interfaces.IConnectionCredentials>((resolve, reject) =>
        {
            let pickList: Array<Interfaces.IConnectionCredentialsQuickPickItem> = [];

            // Add "New connection..." to picklist
            pickList.push({
                label: Constants.gNewConnectionLabel,
                description: Constants.gNewConnectionDescription,
                connectionCreds: null
            });

            // Add the list of recent connections to picklist
            pickList = pickList.concat(recentConnections.getPickListItems());

            let opts: vscode.QuickPickOptions = {
                matchOnDescription: true, placeHolder: Constants.gNewOrRecentConnectionPlaceholder
            };

            vscode.window.showQuickPick(pickList, opts).then(selection =>
            {
                if(selection != null)
                {
                    if(selection.label == Constants.gNewConnectionLabel)
                    {
                        // User chose "New Connection..."
                        this.showNewConnectionWizard().then((choice) =>
                        {
                            if(!choice) {
                                return false;
                            }
                            resolve(choice);
                        });
                    }
                    else
                    {
                        // User chose a connection from "Recent connections"
                        let connectionCreds = selection.connectionCreds;

                        // prompt user for password since we don't save the password in the MRU
                        this.promptForPassword().then((input) =>
                        {
                            if(!input) {
                                return false;
                            }
                            else {
                                connectionCreds.password = input;
                                resolve(connectionCreds);
                            }
                        });
                    }
                }
            });
        });
    }

    // Prompt user for server, database, username, password and return a new ConnectionInfo instance
    private static showNewConnectionWizard()
    {
        return new Promise<Interfaces.IConnectionCredentials>((resolve, reject) =>
        {
            let server = "";
            let database = "";
            let username = "";
            let password = "";

            // prompt for server
            this.promptForServer().then((input) =>
            {
                if(!input) {
                    return false;
                }
                server = input;

                // prompt for database
                this.promptForDatabase().then((input) =>
                {
                    database = input;

                    // prompt for username
                    this.promptForUsername().then((input) =>
                    {
                        if(!input) {
                            return false;
                        }
                        username = input;

                        // prompt for password
                        this.promptForPassword().then((input) =>
                        {
                            if(!input) {
                                return false;
                            }
                            password = input;

                            let connectionCreds = ConnInfo.createConnectionCredentials(server, database, username, password);
                            resolve(connectionCreds);
                        });
                    });
                });
            });
        });
    }

    // Helper to prompt for server
    private static promptForServer() {
        return this.promptUser({
            placeHolder: Constants.gServerPlaceholder,
            prompt: Constants.gServerPrompt});
    }

    // Helper to prompt for database
    private static promptForDatabase() {
        return this.promptUser({
            placeHolder: Constants.gDatabasePlaceholder,
            prompt: Constants.gDatabasePrompt }, false /*inputRequired*/);
    }

    // Helper to prompt for username
    private static promptForUsername() {
        return this.promptUser({
            placeHolder: Constants.gUsernamePlaceholder,
            prompt: Constants.gUsernamePrompt});
    }

    // Helper to prompt for password
    private static promptForPassword()
    {
        return this.promptUser({
            placeHolder: Constants.gPasswordPlaceholder,
            prompt: Constants.gPasswordPrompt, password: true});
    }

    // Helper to prompt user for input
    private static promptUser(options: vscode.InputBoxOptions, inputRequired = true) {
        return new Promise<string>((resolve, reject) => {
            var prompt = () => {
                vscode.window.showInputBox(options).then((input) =>
                {
                    if ((!input || !input.trim()) && inputRequired)
                    {
                        // Prompt user to re-enter if this is a mandatory input
                        vscode.window.showWarningMessage(options.prompt + Constants.gMsgIsRequired, Constants.gMsgRetry).then((choice) =>
                        {
                            if (choice === Constants.gMsgRetry) {
                                prompt();
                            }
                        });
                        return false;
                    }
                    else
                    {
                        resolve(input);
                    }
                });
            }
            prompt();
        });
    }
}