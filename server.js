const express = require('express');
const app = express();
const apiRoute = require('./routes');

const path = require('path');
const fs = require('fs');
const port = process.env.port || 3000;

// Use the API routes
app.use('/api', apiRoute);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//for all other get request redirect to index.html
app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname,'public/index.html'))
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
