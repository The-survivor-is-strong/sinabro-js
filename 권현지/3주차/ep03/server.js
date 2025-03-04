import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;


// // localhost:3000/
// app.use(express.static('dist'));
app.use(cors());

app.get('/api/test', (req, res) => {
  res.send('Hello World express');
  // res.json({
  //   name: 'Eunjae',
  // });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
