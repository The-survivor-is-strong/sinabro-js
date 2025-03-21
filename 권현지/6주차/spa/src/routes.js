import { renderInx, getInitHtml as getInitHtmlForIndex} from "./pages/index";
import { renderSearch, getInitHtml as getInitHtmlForSearch } from "./pages/search";

export const routes ={
  '/':renderInx,
  '/search' : renderSearch
}

export const getInitHTml = {
  '/':getInitHtmlForIndex,
  '/search' : getInitHtmlForSearch
}