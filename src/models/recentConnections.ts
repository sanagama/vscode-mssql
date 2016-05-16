'use strict';
import vscode = require('vscode');
import Constants = require('./constants');
import ConnInfo = require('./connectionInfo');
import Interfaces = require('./interfaces');

export class RecentConnections
{
    private _recentConnections: Array<Interfaces.IConnectionCredentials> = undefined;
    private _context: vscode.ExtensionContext = undefined;

    constructor(context: vscode.ExtensionContext)
    {
        this._context = context;
        this.loadState();
    }

    public getConnections(): Interfaces.IConnectionCredentials[] {
        return this._recentConnections;
    }

    // removes all recent connections
    public clear() {
        this._recentConnections = new Array<Interfaces.IConnectionCredentials>();
        this.saveState();
    }

    public isEmpty(): boolean {
        return !this._recentConnections || this._recentConnections.length == 0;
    }

    // return index of match, else -1
    public contains(item: Interfaces.IConnectionCredentials): number {
        return this.getConnections().findIndex((value) => ConnInfo.equals(item, value));
    }

    public add(item: Interfaces.IConnectionCredentials) {
        if(this.contains(item) == -1)
        {
            // empty out the password before adding connection info to MRU
            item.password = "";
            this.getConnections().push(item);
            this.saveState();
        }
    }

    public remove(item: Interfaces.IConnectionCredentials) {
        let index = this.contains(item);
        if(index != -1)
        {
            this.getConnections().splice(index, 1);
            this.saveState();
        }
    }

    private loadState() {
        this._recentConnections = this._context.globalState.get<Interfaces.IConnectionCredentials[]>(Constants.gGlobalState_recentConnections, []);
        if(this._recentConnections == null)
        {
            this._recentConnections = new Array<Interfaces.IConnectionCredentials>();
        }
    }

    private saveState() {
        this._context.globalState.update(Constants.gGlobalState_recentConnections, this._recentConnections);
    }

    public getPickListItems(): Array<Interfaces.IConnectionCredentialsQuickPickItem>
    {
        const connections = this.getConnections();
        const pickListItems = connections.map( (item) => {
            return <Interfaces.IConnectionCredentialsQuickPickItem> {
                label: ConnInfo.getDisplayLabel(item),
                description: ConnInfo.getDisplayDescription(item),
                connectionCreds: item
            }
        });
        return pickListItems;
    }
}