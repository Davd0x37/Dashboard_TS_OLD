import Triton from "../lib/Triton";

class Header extends Triton {
  private AppName: string = "Dashboard";

  constructor() {
    super();
  }

  public render() {
    const username = this.store.getter.User.Login;
    // const slicedUsername = username.length >= 6 ? username.slice(0, 6) + "..." : username;
    return /*html*/ `
    <header class="header">
      <div class="logo">
        <a href="#">${this.AppName}</a>
      </div>
      <!--<div class="search">-->
      <!--  <div class="search__actions">-->
      <!--    <input type="text" class="search__input" id="search__search-input" placeholder="Type action..."-->
      <!--      aria-label="Search input">-->
      <!--    <a href="#" aria-label="talk">-->
      <!--      <i class="fas fa-microphone-alt fa-lg" style="color: #F5F7FA;"></i>-->
      <!--    </a>-->
      <!--  </div>-->
      <!--  <div id="search__result" class="search__result">-->
      <!--    <a class="search__item">-->
      <!--      <div class="item__icon">-->
      <!--        <i class="fas fa-{{type}}" style="font-size: 1.3rem; color: #59B369;"></i>-->
      <!--      </div>-->
      <!--      <p class="item__name"></p>-->
      <!--    </a>-->
      <!--  </div>-->
      <!--</div>-->
      <div class="user">
        <p class="user__name">${username}</p>
        <img src="${this.store.getter.User.Avatar}" alt="Avatar" class="user__avatar">
      </div>
    </header>`;
  }

  public mounted() {
    //
  }
}

export default new Header();
