import { start } from "./src/router"
import { routes, getInitHTml} from "./src/routes";

export {getInitHTml};
console.log(typeof window)
if(typeof window !== 'undefined'){
  console.log('starting the client-side routing...');
  start({routes})
}
// goto(location.pathname+location.search)