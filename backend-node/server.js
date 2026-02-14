const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hiv_dashboard',
  password: 'SuperGal@345!',  // <-- replace with your real password
  port: 5432,
});

// Test route


// Endpoint to get daily KPIs
app.get('/api/kpi', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM daily_kpi ORDER BY report_date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/ai/query', (req, res) => {
  const { question } = req.body;

  if (question.toLowerCase().includes('trend')) {
    return res.json({ answer: 'HIV positivity increased to 4.2%' });
  }

  return res.json({ answer: 'No data available' });
});


app.listen(3000, () => {
  console.log('Node.js server running on port 3000');
});
