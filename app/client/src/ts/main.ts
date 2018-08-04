import App from "./App";
import { DigitalOceanPlate } from "./components/Plates/DigitalOcean";
// import { Search } from "./components/Search";


// const searchs = new Search("#searchbox__search-input", "#searchbox__result")

// import {User} from './controller/User'
// console.log(User.authenticate('Mark', 'test1'))
// const app = App
// app.addPlates(document.querySelector(".feed"), [
//   new SpotifyPlate().render(),
//   new DigitalOceanPlate().render(),
//   new FacebookPlate().render(),
//   new PaypalPlate().render()
// ])
const dop = new DigitalOceanPlate({
  username: "Jon Doe",
  email: "jon@pm.me",
  amount: "$200.00",
  droplets: "1",
  usage: "$0.00"
})

App.addPlates(document.querySelector(".feed"), [dop.renderPlate()])