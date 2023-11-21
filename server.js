const express = require('express')

const app = express()

const api_routes = require('./controllers/api_routes')

const PORT = process.env.PORT || 3333

const db = require('./config/connection')

app.use(express.json())

app.use('/api', api_routes)

db.on('open', () => {
    app.listen(PORT, () => console.log('Server started on Port ', PORT))
})