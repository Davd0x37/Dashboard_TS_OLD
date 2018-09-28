import { Component, Method, Prop } from "../decorators";

@Component()
export default class Header {
  @Prop()
  private AppName: string = "Dashboard";
  @Prop()
  private action: string = "test";
  @Prop()
  private username: string = "Vernon";
  @Prop()
  private avatar: string =
    "https://images.8tracks.com/cover/i/009/400/711/mr_robot_fuck_society-866.jpg?rect=0,170,1047,1047&q=98&fm=jpg&fit=max&w=640&h=640";

  @Method()
  public render() {
    return /*html*/ `
    <div class="logo">
      <a href="#">${this.AppName}</a>
    </div>
    <div class="search">
      <div class="searchbox">
        <div class="search__input">
          <input type="text" class="search__input" id="search__search-input" placeholder="Type action..."
            aria-label="Search input">
        </div>
        <a href="#" class="search__action" aria-label="talk">
          <i class="fas fa-microphone-alt fa-lg" style="color: #F5F7FA;"></i>
        </a>
      </div>
      <div id="search__result" class="search__result">
        <a class="search__item">
          <div class="item__icon">
            <i class="fas fa-{{type}}" style="font-size: 1.3rem; color: #59B369;"></i>
          </div>
          <p class="item__name">${this.action}</p>
        </a>
      </div>
    </div>
    <div class="user__profile">
      <p class="user__name">${this.username}</p>
      <img src="${this.avatar}" alt="Avatar" class="user__avatar">
    </div>`;
  }
}
