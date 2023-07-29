const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    content: { type: String, required: true, minlength: 10 },
    author: { type: String, default:"Anonim" }
})

const QuoteModel = mongoose.model('quote', quoteSchema)
module.exports = QuoteModel