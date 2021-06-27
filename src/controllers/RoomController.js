const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true

        while(isRoom){
            /* Gera o numero da sala*/
            for(var i = 0; i < 6; i++){
                        
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
                //usar o toString pra transformar os numeros em String, para que o roomId += nao somasse os numeros e sim concatenasse os numeros
            }

                /* Verifica se esse numero de sala ja existe no banco de dados*/
                const roomsExistIds = await db.all(`SELECT id FROM rooms`) // all retorna todos os conteudos

                isRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId) //some verifica um dos Ids e retorna, não varre todas as Ids


                if(!isRoom){
                    /* Insere a sala no banco de dados*/
                    await db.run(`INSERT INTO rooms(
                        id,
                        pass
                    ) VALUES (
                        ${parseInt(roomId)},
                        ${pass}
                    )`) 
                    //parseInt transforma String em numero
                    }
        }
        
        await db.close()
   
        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions 

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }

        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(req, res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
  
}