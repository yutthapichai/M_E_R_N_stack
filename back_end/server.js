const express = require('express')
const mongooes = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const path = require('path')

const DB = require('./config/keys').mongoURI
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


// bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Connect to MongoDB
mongooes
  .connect( DB, { useNewUrlParser: true } )
  .then(() => { console.log('MongoDB Connected') })
  .catch(err => { console.log(err) })

// passport middleware
app.use(passport.initialize())
// Use Congfig
require('./config/passport')(passport)

// Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('../front_end/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front_end', 'build', 'index.html'))
  })
}

const port = process.env.Port || 5000

app.listen(port, () => {
    console.log('server runing on port ' + port)
})