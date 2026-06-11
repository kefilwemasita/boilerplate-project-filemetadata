const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const app = express();

// Enable CORS
app.use(cors());

// Static files (required by FCC)
app.use('/public', express.static(process.cwd() + '/public'));

// Home route
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Multer setup
const upload = multer({ dest: 'public/data/uploads/' });

// File analysis endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});