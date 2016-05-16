'use strict';
import vscode = require('vscode');
import Constants = require('../models/constants');
import Utils = require('../models/utils');
import { RecentConnections } from '../models/recentConnections';
import Interfaces = require('../models/interfaces');
import ConnectionUI from '../views/connectionUI'
import StatusView from '../views/statusView';

var mssql = require('mssql');

export default class ConnectionManager
{
    private _context: vscode.ExtensionContext;
    private _statusView: StatusView;
    private _connection;
    private _connectionCreds: Interfaces.IConnectionCredentials;
    private _recentConnections: RecentConnections;

    constructor(context: vscode.ExtensionContext, statusView: StatusView)
    {
        this._context = context;
        this._statusView = statusView;

        // Init recent connections MRU
        this._recentConnections = new RecentConnections(this._context);
        this._recentConnections.clear();
    }

    get connectionCredentials(): Interfaces.IConnectionCredentials {
        return this._connectionCreds;
    }

    get connection(): any {
        return this._connection;
    }

    private get statusView() {
        return this._statusView;
    }

    get isConnected() {
        return this._connection && this._connection.connected;
    }

    public onDisconnect()
    {
        if(this.isConnected) {
            this._connection.close();
        }

        this._connection = null;
        this._connectionCreds = null;
    }

    // let users pick from a list of previous connections or enter credentials for a new database connection
    public onNewConnection()
    {
        return new Promise<any>((resolve, reject) =>
        {
            let self = this;
            self.onDisconnect();

            ConnectionUI.showConnectionList(self._recentConnections)
            .then(function(connectionCreds)
            {
                self.connect(connectionCreds)
                .then(function() {
                    self._recentConnections.add(connectionCreds);
                    resolve();
                })
            });
        });
    }

    // create a new connection with the connectionCreds provided
    public connect(connectionCreds: Interfaces.IConnectionCredentials)
    {
        return new Promise<any>((resolve, reject) =>
        {
            let self = this;
            const connection = new mssql.Connection(connectionCreds);
            self.statusView.connecting(connectionCreds);
            connection.connect()
            .then(function() {
                self._connectionCreds = connectionCreds;
                self._connection = connection;
                self.statusView.connectSuccess(connectionCreds);
                resolve();
            })
            .catch(function(err) {
                self._statusView.connectError(connectionCreds, err);
                Utils.showErrorMsg(Constants.gMsgError + err);
                reject(err);
            });
        });
    }
}