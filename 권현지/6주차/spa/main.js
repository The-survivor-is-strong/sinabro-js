import { start } from "./src/router"
import { routes, getInitHTml} from "./src/routes";

export {getInitHTml};
console.log(typeof window)
if(typeof window !== 'undefined'){
  console.log('starting the client-side routing...');
  console.log('initial data', window.__INITIAL_DATA__);

  start({routes})
}
// goto(location.pathname+location.search)