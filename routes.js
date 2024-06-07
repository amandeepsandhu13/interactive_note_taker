const express = require('express');
const fs = require('fs').promises;
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const path = require('path');
const router = express.Router()


//reterive all notes
router.get('/notes', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read notes' });
  }
});

//Add note



module.exports = router;