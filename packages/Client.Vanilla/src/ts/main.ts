import App from "./App";
import DigitalOcean from "./components/DigitalOcean";
import Header from "./components/Header";
import Paypal from "./components/Paypal";
import Spotify from "./components/Spotify";

App.render("#app", [new Spotify(), new DigitalOcean(), new Paypal()]);
App.render("#Header", [new Header()], false);
