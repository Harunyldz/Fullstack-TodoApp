const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({ //mongoose un Scheam özelliğinden bir todoSchema türettik
    id: { type: Number, required: true },
    title: { type: String, required: true },
    subject: { type: String },
    targetDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false }
}, { timestamps: true })


const TodoModel = mongoose.model('Todo', todoSchema)

module.exports = TodoModel