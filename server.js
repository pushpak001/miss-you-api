const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Your RDS config (paste your values here)
const db = mysql.createConnection({
  host: 'database-1.clysk00aa7p8.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Pushpak-1437',
  database: 'cloudbiezdb'
});

// DB Connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to RDS DB:', err);
  } else {
    console.log('Connected to RDS MySQL database!');
  }
});

// Save message endpoint
app.post('/save', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ success: false, error: 'No message received' });

  const query = 'INSERT INTO messages (content) VALUES (?)';
  db.query(query, [message], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ success: false, error: 'DB error' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
