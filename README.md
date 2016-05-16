# Microsoft SQL Server support in VS Code

## What is it?
This extension is a proof of concept that adds MSSQL support to Visual Studio Code and let's you:
* Connect to your database in [SQL Server](https://aka.ms/sqlserver) running on-premises or in the cloud, [Azure SQL Database](https://aka.ms/sqldb) and [Azure SQL Data Warehouse](https://aka.ms/sqldw)
* Type T-SQL statements, scripts and queries in the Visual Studio Code editor window
* Run T-SQL scripts to see results in a stylized HTML grid alongside the T-SQL editor
* Easily view and switch between multiple result sets

Head over to [Github](https://github.com/sanagama/vscode-mssql) for the source code, bug tracking, and feature requests.

##Screenshots
![IDE](images/vscode-mssql-demo.gif)

## Supported features
* Get started with T-SQL Snippets
* Execute T-SQL scripts (selected T-SQL text vs. everything in the editor)
* Execute multiple batches (simple `GO` parsing)
* View and navigate multiple result sets
* View messages from SQL Server
* Search for text in results
* Paginated results
* Basic T-SQL keyword colorization
* Remember recently used connections

##Usage
First, download and install Visual Studio Code `1.0` (or later) for your platform from here: [download Visual Studio Code](https://code.visualstudio.com/#alt-downloads)

###Installing the extension
1. Launch Visual Studio Code
2. Press `F1` to open the command palette
3. Type `ext ins` and click `Install extension`
4. Type `mssql` and select `vscode-mssql` in the list of extensions
5. Visual Studio Code will show you a message confirming successful installation
6. Restart Visual Studio Code when prompted

###Getting started
1. Launch Visual Studio Code
2. *Change language mode to SQL:* Open a `.sql` file or press `Ctrl+K M` (`Cmd+K M` on Mac) to select the language mode and choose `SQL`
3. *Connect to a database:* Press `F1` to open the command palette, type `mssql` then click `Connect to a database` and follow the prompts
4. *Use the T-SQL editor:* Type T-SQL statements in the editor. Type the word `sql` to see a list of code snippets you can tweak & reuse
5. *Run T-SQL statements:* Press `Ctrl+Shift+e` (`Cmd+Shift+e` on Mac) to execute all the T-SQL code in the editor

>*Tip:* Put `GO` on a line by itself to separate T-SQL batches

>*Tip:* Select some T-SQL text in the editor and press `Ctrl+Shift+e` (`Cmd+Shift+e` on Mac) to execute the selection

###Commands
The extension provides a few commands in the command palette when working with MSSQL:
* `MSSQL: Connect to a database` - prompts you for server, database, username and password and connects to a database. Remembers the connection in the list of recently used connections upon a successful connection.
* `MSSQL: Run T-SQL query` - executes T-SQL statements (selected T-SQL text vs. everything in the editor) and displays results
* `MSSQL: Disconnect active connection` - disconnects from the database

###Uninstalling the extension
1. Launch Visual Studio Code
2. Press `F1` to open the command palette
3. Type `ext show` and click `Show installed extensions`
3. Click `vscode-mssql` in the list of extensions and then click the `x` to uninstall the extension
4. Click `OK` when Visual Studio Code prompts for confirmation
5. Restart Visual Studio Code when prompted

## Acknowledgements
The extension uses several open source components including:
- [Twitter Bootstrap](https://github.com/twbs/bootstrap) for CSS styling and tab navigation
- [express](https://github.com/expressjs/express) to serve dynamic SQL output
- [Backgrid.js](https://github.com/wyuenho/backgrid) to render SQL results in a grid
- [node-mssql](https://github.com/patriksimek/node-mssql) and [Tedious](https://github.com/pekim/tedious) to connect to SQL Server

Thanks to [GIPHY](http://giphy.com/) for the animated GIF ;-)

## License
[MIT](LICENSE.txt)