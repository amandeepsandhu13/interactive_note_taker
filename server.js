const express = require('express');
const path = require('path');
const fs = require('fs');
const port = process.env.port || 3000;
const app = express();


// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('*',(req,res) => {
//     res.send(path.join(__dirname,'public/index.html'));
// });

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname,'public/notes.html'))
);
 

app.listen(`${port}`, () => {
    console.log(`ok , Server is running on http://localhost:${port}`);
})