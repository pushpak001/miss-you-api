// Import required modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize app
const app = express();
app.use(cors());              // Allow requests from S3
app.use(express.json());      // Parse JSON body

// 🔐 RDS credentials - directly paste your details here
const connection = mysql.createConnection({
    host: 'database-1.clysk00aa7p8.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Pushpak-1437',
    database: 'cloudbiezdb'
              // 🟢 DB name
});

// 📨 POST endpoint to save message to database
app.post('/save', (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).send("Message required");

  // Insert message into table
  const query = 'INSERT INTO miss_you_messages (message) VALUES (?)';
  connection.query(query, [message], (err) => {
    if (err) return res.status(500).send("DB Error: " + err.message);
    res.send("Inserted");
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
