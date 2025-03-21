import express from 'express';
import movies from './movie.json' with { type: 'json' };
import cors from 'cors';
import fs from 'fs';
import { getInitHTml } from './dist/index.js';

const app = express()
const port = 3000;
app.use(cors());
//
app.use(express.static('dist'));

const getFilteredMovies = (keyword) => {
  return movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase()));
};

app.get('/', (req, res)=> {
  fs.readFile('index.html', (err,file)=>{
    res.send(file.toString().replace('<!-- app -->', getInitHTml['/']))
  });

})
app.get('/search', (req, res)=> {
  const filteredMovies = getFilteredMovies(req.query.keyword);
  const initialData = {
    movies: filteredMovies,
  };
  
  fs.readFile('index.html', (err,file)=>{
    res.send(file.toString().replace('<!-- app -->', getInitHTml['/search'](initialData)))
  });

})
app.get('/api/search', (req, res)=> {
  console.log(req.query.keyword)
  res.json(getFilteredMovies(req.query.keyword));
})
app.listen(port,()=>{
  console.log('sdff')
})