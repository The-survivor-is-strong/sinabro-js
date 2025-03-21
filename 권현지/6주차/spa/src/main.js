const routingMap ={
  '/':renderInx,
  '/search' : renderSearch
}

window.addEventListener('popstate',(e)=>{
  if(routingMap[location.pathname]){
    routingMap[location.pathname]();
    return
  // }else{

  }
})

const goto = (url,{push}={}) => {
  const pathname = url.split("?")[0];
  const searchParam = Object.fromEntries(new URLSearchParams(url.split("?")[1]));
  if(routingMap[pathname]){
    if(push){
      history.pushState({},'',url);
    }
    routingMap[pathname]({searchParam});
    return;
  }
  location.href = url;
}

function renderInx(){
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
    goto(`/search?query=${event.target.query.value}`, { push: true });
  });
}
function renderSearch({searchParam}){
  document.querySelector('#app').innerHTML = `
  <h1>movie search</h1>
  <p>${searchParam.query}</p>
`
}


// renderInx();
goto(location.pathname+location.search)