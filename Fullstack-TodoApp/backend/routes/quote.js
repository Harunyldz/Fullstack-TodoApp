const express = require('express')
const router = express.Router()
const QuoteModel = require('../models/quote')

//Get all quotes
router.get('/', (req, res) => {
    const query = QuoteModel.find({})
    query
        .then((result) => res.json({ message: 'All quotes', data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Add a quote
router.post('/', (req, res) => {
    const newQuote = new QuoteModel(req.body)
    newQuote.save()
        .then((result) => res.json({ message: 'Quote added', data: result }))
        .catch((err) => res.json({ message: 'Error!', error: err }))
})

//Get one qoute
router.get('/:id', (req, res) => {
    const query = QuoteModel.findById(req.params.id)
    query
        .then((result) => res.json({ message: `${req.params.id} quote`, data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Update a Quote
router.put('/:id', (req, res) => {
    const query = QuoteModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    query
        .then((result) => res.json({ message: `${req.params.id} updated`, data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})

//Delete a quote
router.delete('/:id', (req, res) => {
    const query = QuoteModel.findByIdAndDelete(req.params.id, { new: true })
    query
        .then((result) => res.json({ message: `${req.params.id} deleted`, data: result }))
        .catch((err) => res.json({ message: "Error!", error: err }))
})
module.exports = router