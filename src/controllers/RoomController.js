const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password

        let roomId

        for(var i = 0; i < 6; i++){
            
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
            //usar o toString pra transformar os numeros em String, para que o roomId += nao somasse os numeros e sim concatenasse os numeros
        }

    
        await db.run(`INSERT INTO rooms(
            id,
            pass
        ) VALUES (
            ${parseInt(roomId)},
            ${pass}
        )`) 
        //parseInt transforma String em numero

        await db.close()
   
        res.redirect(`/room/${roomId}`)

    }
}