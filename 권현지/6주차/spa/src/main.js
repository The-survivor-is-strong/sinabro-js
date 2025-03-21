import { start } from "./router"
import { renderInx } from "./pages/index";
import { renderSearch } from "./pages/search";
import { routes
  
 } from "./routes";
start({routes})
// goto(location.pathname+location.search)