import { goto } from "../router";

export function getInitHtml(){
  return `
    <h1>movie info</h1>
    <form>
      <input type="search" name="query" />
      <button type="submit">search</button> 
    </form>
  `
}

export const renderInx= ()=>{
  document.querySelector('#app').innerHTML = `
    <h1>movie info</h1>
    <form>
      <input type="search" name="query" />
      <button type="submit">search</button> 
    </form>
  `;

  document.body.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event.target.query.value);
    // location.href= `/search?query=${event.target.query.value}`
    goto(`/search?keyword=${event.target.query.value}`, { push: true });
  });
}