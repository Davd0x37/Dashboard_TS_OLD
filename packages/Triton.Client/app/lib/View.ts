import "reflect-metadata";

import { Route } from "./Decorator";

class View {
  public getView(path: string): () => string {
    return Reflect.getMetadata(`$Route:${path}`, this);
  }

  @Route("/")
  public index(): string {
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

  @Route("/auth")
  public authenticate(): string {
    return /*html*/ `
    <Authenticate/>
    <Actions id="Actions"/>
    `;
  }

  public notFound(): string {
    return /*html*/ `
    404 NOT FOUND
    `;
  }
}

export default new View();
