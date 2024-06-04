const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 3000;

app.use(express.static('Main/public'));

app.get('/',(req,res) => {
    res.send('hello world');
});

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname,'Develop/public/notes.html'))
);

app.listen(`${port}`, () => {
    console.log(`ok , Server is running on http://localhost:${port}`);
})