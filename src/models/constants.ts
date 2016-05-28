// constants
export const gLanguageId = "sql";
export const gExtensionName = "vscode-mssql: ";
export const gConnectionAppName = "vscode-mssql-node-mssql";
export const gOutputChannelName = "MSSQL";

export const gCmdRunQuery = 'extension.runQuery';
export const gCmdConnect = 'extension.connect';
export const gCmdDisconnect = 'extension.disconnect';

export const gSqlDbPrefix = ".database.windows.net";
export const gDefaultConnectionTimeout = 15000;
export const gDefaultRequestTimeout = 15000;
export const gAzureSqlDbConnectionTimeout = 30000;
export const gAzureSqlDbRequestTimeout = 30000;
export const gAzureDatabase = "Azure";

export const gGlobalState_recentConnections = "mssql.recentConnections";

export const gOutputContentTypeRoot = '/';
export const gOutputContentTypeMessages = "messages";
export const gOutputContentTypeResultsetMeta = 'resultsetsMeta';
export const gOutputContentTypeColumns = 'columns'
export const gOutputContentTypeRows = 'rows'
export const gOutputServiceLocalhost = "http://localhost:";

export const gMsgContentProviderSqlOutputHtml = 'sqlOutput.html';
export const gConfigSectionName = "mssqlserver";
export const gConfigLogDebugInfo = "'logDebugInfo";

// localizable strings
export const gMsgLocalWebserviceStaticContent = "LocalWebService: added static html content path: ";
export const gMsgLocalWebserviceStarted = 'LocalWebService listening on port ';
export const gMsgRunQueryAllBatchesExecuted = 'runQuery: all batches executed';
export const gMsgRunQueryError = 'runQuery: error: ';
export const gMsgRunQueryExecutingBatch = 'runQuery: executeBatch called with SQL: '
export const gMsgRunQueryAddBatchResultsets = 'runQuery: adding resultsets for batch: '
export const gMsgRunQueryAddBatchError = 'runQuery: adding error message for batch: '
export const gMsgRunQueryConnectionActive = 'runQuery: active connection is connected, using it to run query';
export const gMsgRunQueryConnectionDisconnected = 'runQuery: active connection is disconnected, reconnecting';
export const gMsgRunQueryNoConnection = 'runQuery: no active connection - prompting for user';

export const gMsgContentProviderOnContentUpdated = "Content provider: onContentUpdated called";
export const gMsgContentProviderOnRootEndpoint = 'LocalWebService: Root end-point called';
export const gMsgContentProviderOnResultsEndpoint = "LocalWebService: ResultsetsMeta endpoint called";
export const gMsgContentProviderOnMessagesEndpoint = 'LocalWebService: Messages end-point called';
export const gMsgContentProviderOnColumnsEndpoint = "LocalWebService:  Columns end-point called for index = ";
export const gMsgContentProviderOnRowsEndpoint = "LocalWebService: Rows end-point called for index = ";
export const gMsgContentProviderOnClear = "Content provider: clear called";
export const gMsgContentProviderOnUpdateContent = 'Content provider: updateContent called';
export const gMsgContentProviderProvideContent = 'Content provider: provideTextDocumentContent called: ';

export const gExtensionActivated = "activated.";
export const gExtensionDeactivated = "de-activated.";
export const gMsgOpenSqlFile = "Open a .sql file in the active editor to use this command.";

export const gMsgOpenSqlFileLong = new Array(
                                "Open a .sql file in the active editor to use this command. Try one of the following:",
                                "1. If you're starting with a new empty file then press 'Ctrl+K M' to select the language mode and choose 'SQL'",
                                "2. Press 'File...Open' to open a .sql file from your computer in the editor",
                                "3. Click inside the editor with your SQL statements to make it the active editor that has focus"
                            );

export const gActiveTextEditorChanged = "Active text editor changed. LanguageId = ";

export const gNewConnectionLabel = "New connection...";
export const gNewConnectionDescription = "Create a new database connection.";
export const gNewOrRecentConnectionPlaceholder = "Create a new connection or choose a recent connection";

export const gServerPrompt = "Server name";
export const gServerPlaceholder = "hostname\\instance or <server>.database.windows.net";
export const gDatabasePrompt = "Database name";
export const gDatabasePlaceholder = "database name (defaults to 'master' if empty)";
export const gUsernamePrompt = "Username";
export const gUsernamePlaceholder = "username (SQL Authentication)";
export const gPasswordPrompt = "Password";
export const gPasswordPlaceholder = "Password (SQL Authentication)";

export const gMsgIsRequired = " is required.";
export const gMsgRetry = "Retry";
export const gMsgError = "Error: ";

export const gNotConnectedLabel = "Not connected";
export const gNotConnectedTooltip = "Click to connect to a database";
export const gConnectingLabel = "Connecting";
export const gConnectingTooltip = "Connecting to: ";
export const gConnectedLabel = "Connected.";
export const gConnectErrorLabel = "Connection error!";
export const gConnectErrorTooltip = "Error connecting to: ";
export const gConnectErrorCode = "Errorcode: ";
export const gConnectErrorMessage = "ErrorMessage: ";
export const gExecuteQueryLabel = "Executing query ";
export const gExecuteQueryErrorLabel = "Query completed with errors";
export const gExecuteQuerySuccessLabel = "Query executed successfully";
export const gExecuteQueryRowsAffected = " row(s) affected";
export const gExecuteQueryCommandCompleted = "Command(s) completed successfully.";