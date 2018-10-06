import { Route } from "../decorators";

class Router {
  constructor() {
    //
  }

  public getPathTemplate(path: string) {
    return Reflect.getMetadata(`$Route:${path}`, this);
  }

  @Route("/auth")
  public authenticate() {
    return /*html*/ `
    <Authenticate/>
    `;
  }

  @Route("/")
  public index() {
    // return /*html*/ `
    // <Header id="Header"/>
    // <main class="feed">
    //   <Spotify id="Spotify"/>
    //   <DigitalOcean id="DigitalOcean"/>
    //   <Paypal id="Paypal"/>
    // </main>
    // `;
    return /*html*/ `
      <DigitalOcean id="DigitalOcean"/>
    `;
  }

  public notFound() {
    return /*html*/ `
    404 NOT FOUND
    `;
  }
}

export default new Router();
