'use strict';
import Constants = require('./constants');
import Interfaces = require('./interfaces');

export function createConnectionCredentials(s: string, d: string, u: string, p: string): Interfaces.IConnectionCredentials
{
    let connCreds: Interfaces.IConnectionCredentials = {
        server: s, database: d, user: u, password: p, options: {encrypt: true, appName: Constants.gConnectionAppName},
        connectionTimeout: Constants.gAzureSqlDbConnectionTimeout,
        requestTimeout: Constants.gAzureSqlDbRequestTimeout
    }

    // Fix up connection settings if not connecting to Azure
    if(!isAzureDatabase(connCreds.server)) {
        connCreds.options.encrypt = false;
        connCreds.connectionTimeout = Constants.gDefaultConnectionTimeout;
        connCreds.requestTimeout = Constants.gDefaultRequestTimeout;
    }
    return connCreds;
}

// return true if if server name ends with ".database.woindows.net"
function isAzureDatabase(server: string) {
    return (server ? server.endsWith(Constants.gSqlDbPrefix) : false);
}

export function dump(connCreds: Interfaces.IConnectionCredentials): string {
    let contents = "server=" + (connCreds.server ? connCreds.server : "null") +
                    " | database=" + (connCreds.database ? connCreds.database : "null") +
                    " | username=" + (connCreds.user ? connCreds.user : "null") +
                    " | encrypt=" + connCreds.options.encrypt +
                    " | connectionTimeout=" + connCreds.connectionTimeout +
                    " | connectionTimeout=" + connCreds.requestTimeout;

    return contents;
}

// compare connections porperties, except for password
export function equals(connCreds: Interfaces.IConnectionCredentials, theOther: Interfaces.IConnectionCredentials): boolean
{
    let equal = (connCreds.server == theOther.server) &&
                (connCreds.database == theOther.database) &&
                (connCreds.user == theOther.user) &&
                (connCreds.options.encrypt == theOther.options.encrypt) &&
                (connCreds.connectionTimeout == theOther.connectionTimeout) &&
                (connCreds.requestTimeout == theOther.requestTimeout);
    return equal;
}

export function getDisplayLabel(connCreds: Interfaces.IConnectionCredentials): string
{
    return getServerName(connCreds) + " (" + getDatabaseName(connCreds) + ")";
}

export function getServerName(connCreds: Interfaces.IConnectionCredentials): string
{
    return connCreds.server;
}

export function getDatabaseName(connCreds: Interfaces.IConnectionCredentials): string
{
    return connCreds.database ? connCreds.database : "default";
}

export function getDisplayDescription(connCreds: Interfaces.IConnectionCredentials): string
{
    return getServerName(connCreds) + " (database: " + getDatabaseName(connCreds) +
            " | username: " + connCreds.user + ")" +
            (isAzureDatabase(connCreds.server) ? " [Azure] " : "");
}