const Database = require("./config.js")

const initDb = {
    async init(){ //async e await tem que estar juntos
        const db = await Database()  //await faz com que primeiro de executar o Database(). O javascript retorna muito rapido

        //comandos sql em maiusculo
        //tabela rooms
        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            pass TEXT
        )`);  

        //tabela questions
        await db.exec(`CREATE TABLE questions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room INT
        )`);

        await db.close()
    }
}

initDb.init();
