import "reflect-metadata"
import App from "../App";
import { Route } from "../decorators";

class Router {
  constructor() {
    //
  }

  public getPathTemplate(path: string) {
    return Reflect.getMetadata(`$Route:${path}`, this);
  }

  public go(path: string) {
    history.pushState({}, path, path);
    App.run();
  }

  @Route("/auth")
  public authenticate() {
    return /*html*/ `
    <Authenticate/>
    <Actions id="Actions"/>
    `;
  }

  @Route("/")
  public index() {
    return /*html*/ `
    <Header id="Header"/>
    <main class="feed">
      <Spotify id="Spotify"/>
      <DigitalOcean id="DigitalOcean"/>
      <Paypal id="Paypal"/>
      <Actions id="Actions"/>
    </main>
    `;
  }

  public notFound() {
    return /*html*/ `
    404 NOT FOUND
    `;
  }
}

export default new Router();
