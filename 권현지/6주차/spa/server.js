import express from 'express';
import movies from './movie.json' with { type: 'json' };
import cors from 'cors';

const app = express()
const port = 3000;
app.use(cors());
app.get('/', (req, res)=> {
  res.send('Hello World')
})
app.get('/search', (req, res)=> {
  console.log(req.query.keyword)
  const searchRes = movies.filter((movie) => movie.title.toLowerCase().includes(req.query.keyword.toLowerCase()));
  res.send(searchRes);
})
app.listen(port,()=>{
  console.log('sdff')
})