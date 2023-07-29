const express = require('express') //express import edildi
const cors = require('cors') //cors import edildi
const mongoose = require('mongoose') //mongoose import edildi
const todoRouter = require('./routes/todo')
const quoteRouter = require('./routes/quote')


const app = express() //express uygulamaya dahil edildi
require('dotenv').config()//dotenv paketi kullanıma hazır hale getirildi

app.use(express.json())// yazılacak json formatındaki verilerin kullanılabilirliği için
app.use(cors()) //cors kullanıma açıldı
app.use('/api/todo', todoRouter)
app.use('/api/quote', quoteRouter)

const port = process.env.PORT || 5000 //.env de port varsa onu yoksa 5000 portunu al
const uri = process.env.DB_URI //.env deki DB_URI yi al

app.listen(port, console.log(`Server running on ${port}`)) //uygulamanın hangi portta çalışacağını bildir

mongoose.connect(uri, {
    useNewUrlParser: true, // MongoDB bağlantısı için yeni bir URL ayrıştırıcı kullanılmasını belirtir. 
    useUnifiedTopology: true //MongoDB'nin yeni ve modern bağlantı yönetim motorunu kullanılmasını sağlar.
}).then(() => {
    console.log("MongoDB connection successful...!")
}).catch((err) => {
    console.log('Connection failed ', err.message)
})


app.get('/api', (req, res) => {
    res.send('Welcome to Todo App backend')
})