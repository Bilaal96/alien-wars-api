import express from 'express';

const PORT = 9090;
const app = express();

app.get('/api', (req, res) => {
  res.status(200).send('Test endpoint');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
