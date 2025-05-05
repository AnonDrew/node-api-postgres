const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// Simulates an error to pass down
app.use((req, res, next) => {
  const error = new Error('Something went wrong');
  next(error);
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('Internal Server Error');
});