const express = require('express');
const apiRoute = require('./routes/routes');
const path = require('path');
const fs = require('fs');
const port = process.env.port || 3000;

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Use the API routes
app.use('/api', apiRoute);

// Route to serve notes.html for GET /notes
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
