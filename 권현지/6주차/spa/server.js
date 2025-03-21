import express from 'express';
import movies from './movie.json' with { type: 'json' };
import cors from 'cors';
import fs from 'fs';
import { getInitHTml } from './dist/index.js';

const app = express()
const port = 3000;
app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res)=> {
  fs.readFile('index.html', (err,file)=>{
    res.send(file.toString().replace('<!-- app -->', getInitHTml['/']))
  });

})
app.get('/search', (req, res)=> {
  console.log(req.query.keyword)
  const searchRes = movies.filter((movie) => movie.title.toLowerCase().includes(req.query.keyword.toLowerCase()));
  res.send(searchRes);
})
app.listen(port,()=>{
  console.log('sdff')
})