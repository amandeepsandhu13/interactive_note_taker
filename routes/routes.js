const express = require('express');
const fs = require('fs').promises;
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');
const path = require('path');
const router = express.Router()

//reterive all notes
router.get('/notes', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read notes' });
  }
});

//Add note post request handler

router.post('/notes', async (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    try {
      const data = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
      const notes = JSON.parse(data);
      notes.push(newNote);
      await fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 4));
      res.status(201).json(newNote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save new note' });
    }
  } else {
    res.status(400).json({ error: 'Title and text are required' });
  }
});

//delete note by id
router.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== id);
    await fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 4));
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});


module.exports = router;