import App from "./App";
import {
  DigitalOceanPlate,
  FacebookPlate,
  PaypalPlate,
  SpotifyPlate
} from "./components/Plates";
import { Search } from "./components/Search";

const searchs = new Search("#searchbox__search-input", "#searchbox__result", "#background__backdrop")

// import {User} from './controller/User'
// console.log(User.authenticate('Mark', 'test1'))
App.addPlates(document.querySelector(".feed"), [
  new SpotifyPlate(),
  new DigitalOceanPlate(),
  new PaypalPlate(),
  new FacebookPlate(),
]);
