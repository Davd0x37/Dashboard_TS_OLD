import Triton from "#/lib/Triton";

class Header extends Triton {
  private AppName: string = "Dashboard";

  constructor() {
    super();
  }

  public render() {
    const username = this.store.getter.User.Login;
    return /*html*/ `
    <header class="header">
      <div class="logo">
        <a href="#">${this.AppName}</a>
      </div>
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
