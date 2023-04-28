import express from 'express';

const PORT = 9090;
const app = express();

// Run DB config
import './db/connection.js';

app.get('/api', (req, res) => {
  res.status(200).send('Test endpoint');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
