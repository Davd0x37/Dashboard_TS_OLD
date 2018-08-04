import { DigitalOcean } from "./components/DigitalOcean";
import { Search } from "./components/Search";

const chart = new DigitalOcean("#digital_ocean_chart");

const search = document.querySelector("#searchbox__search-input");
// let pressing = false;
// let keys;
// search.addEventListener("keydown", (e: any) => {
//   pressing = true;
//   clearTimeout(keys);
// });
// search.addEventListener("keyup", (e: any) => {
//   pressing = false;
//   //   keys = setTimeout(() => {
//   //     if (!pressing) {
//   //       console.log("lol");
//   //     }
//   //   }, 1000);
//   clearTimeout(keys);
//   keys = setTimeout(() => {
//     if (!pressing) {
//       console.log("notpressing");
//     }
//   }, 200);
// });
new Search(search)