const sqlite3 = require("sqlite3");
const { open } = require("sqlite") //{open} usaremos apenas essa função do sqlite

module.exports = () => 

    //define o nome do banco de dados
    //open acessa o banco de dados
    open({
        filename: "./src/db/rocketq.sqlite",
        driver: sqlite3.Database
    });
