// import { routes } from "./routes";
let routes;

export const goto = (url,{push,initialData }={}) => {
  const pathname = url.split("?")[0];
  const searchParam = Object.fromEntries(new URLSearchParams(url.split("?")[1]));
  if(routes[pathname]){
    if(push){
      history.pushState({},'',url);
    }
    routes[pathname]({searchParam,
      initialData,
    });
    return;
  }
  location.href = url;
}

export const start = (params)=>{
  routes = params.routes;

  window.addEventListener('popstate',(e)=>{
    if(routes[location.pathname]){
      routes[location.pathname]();
      return
    // }else{

    }
  })

  goto(location.pathname+location.search, {
    initialData: window.__INITIAL_DATA__,
  })
}
