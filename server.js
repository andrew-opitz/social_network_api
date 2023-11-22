const express = require('express')

const app = express()

app.use(express.json())

const thought_routes = require('./controllers/thought_routes')
const user_routes = require('./controllers/user_routes')

const PORT = process.env.PORT || 3333

const db = require('./config/connection')


app.use('/api/thoughts', thought_routes)
app.use('/api/users', user_routes)

db.on('open', () => {
    app.listen(PORT, () => console.log('Server started on Port ', PORT))
})