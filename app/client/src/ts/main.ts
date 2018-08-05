import App from "./App";
import {
  DigitalOceanPlate,
  FacebookPlate,
  PaypalPlate,
  SpotifyPlate
} from "./components/Plates";
import { Search } from "./components/Search";

const searchs = new Search("#searchbox__search-input")

import { User } from "./controller/User";
User.authenticate("Mark", "test1").then(res => console.log(res));
App.addPlates(document.querySelector(".feed"), [
  new SpotifyPlate(),
  new DigitalOceanPlate(),
  new PaypalPlate(),
  new FacebookPlate()
]);

window.addEventListener("hashchange", ev => {
  console.log(ev);
});
