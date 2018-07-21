const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const DB = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to MongoDB
mongooes
  .connect( DB, { useNewUrlParser: true } )
  .then(() => { console.log('MongoDB Connected') })
  .catch(err => { console.log(err) });

app.get('/', (req, res) => {
    res.send('hello yuth');
});

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.Port || 5000;

app.listen(port, () => {
    console.log('server runing on port ' + port);
});