// import { routes } from "./routes";
let routes;

window.addEventListener('popstate',(e)=>{
  if(routes[location.pathname]){
    routes[location.pathname]();
    return
  // }else{

  }
})

export const goto = (url,{push}={}) => {
  const pathname = url.split("?")[0];
  const searchParam = Object.fromEntries(new URLSearchParams(url.split("?")[1]));
  if(routes[pathname]){
    if(push){
      history.pushState({},'',url);
    }
    routes[pathname]({searchParam});
    return;
  }
  location.href = url;
}

export const start = (params)=>{
  routes = params.routes;
  goto(location.pathname+location.search)
}
