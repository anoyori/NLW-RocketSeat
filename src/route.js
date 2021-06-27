const { Router } = require('express')
const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

route.get('/', (req, res) => res.render("index", {page: "enter-room"})) /* req é requisição, res é resposta*/
route.get('/create-pass', (req, res) => res.render("index", {page: "create-pass"}))

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)

//Formato que o formulario de dentro da modal tem que passar a informacao
route.post('/question/:room/:question/:action', QuestionController.index) 
route.post('/question/create/:room', QuestionController.create)

module.exports = route