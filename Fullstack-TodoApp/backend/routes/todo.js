const express = require('express')
const TodoModel = require('../models/todo')
const router = express.Router()

//Get All Todos
router.get('/', (req, res) => {
    const query = TodoModel.find({})
    query
        .then((result) => res.json({ message: "All Todos", data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Add a Todo
router.post('/', (req, res) => {
    const newTodo = new TodoModel(req.body)
    newTodo.save()
        .then((result) => res.json({ message: "Todo added", data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Get a Todo
router.get('/:id', (req, res) => {
    const query = TodoModel.findById(req.params.id)
    query
        .then((result) => {res.json({ message: `${req.params.id} Todo`, data: result })})
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Update a Todo
router.put('/:id', (req, res) => {
    const query = TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    query
        .then((result) => res.json({ message: `${req.params.id} Updated`, data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Delete a Todo
router.delete('/:id', (req, res) => {
    const query = TodoModel.findByIdAndDelete(req.params.id, { new: true })
    query
        .then((result) => res.json({ message: `${req.params.id} Deleted`, data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

module.exports = router