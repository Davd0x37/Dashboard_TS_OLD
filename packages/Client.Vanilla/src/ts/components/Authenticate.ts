import { Exists, IUser } from "../controller/User/Interface";
import { AuthenticateUser, RegisterUser } from "../controller/User/Manager";
import { Component } from "../decorators";
import { error, success } from "../lib/Alert";
import { DataBinding } from "../lib/DataBinding";
import { $ } from "../lib/DOM";
import Router from "../lib/Router";
import Triton from "../lib/Triton";

@Component()
class Authenticate extends Triton {
  private login: string = "";
  private password: string = "";
  private email: string = "";
  private avatar: string = "";

  constructor() {
    super();
  }

  public render() {
    return /*html*/ `
    <main class="authenticate">
      <input type="radio" name="tabs" id="login" checked="checked"/>
      <label for="login">${this.lang.data.Authenticate.loginLink}</label>

      <input type="radio" name="tabs" id="register" />
      <label for="register">${this.lang.data.Authenticate.registerLink}</label>
      <section class="container">
        <div class="tab login__tab">
          <form onsubmit="return false;">
            <p class="label__title">${this.lang.data.Authenticate.login}</p>
            <input type="text" id="login__input" class="input" minlength="5" maxlength="40" data-v-model="login">

            <p class="label__title">${this.lang.data.Authenticate.password}</p>
            <input type="password" id="password__input" class="input" minlength="5" maxlength="40" data-v-model="password">

            <input type="submit" id="login_submit" class="btn flex" value="${this.lang.data.Authenticate.loginLink}">
          </form>
        </div>
        <div class="tab register__tab">
          <form onsubmit="return false;">
            <p class="label__title">${this.lang.data.Authenticate.login}</p>
            <input type="text" class="input" minlength="5" maxlength="40" data-v-model="login">

            <p class="label__title">${this.lang.data.Authenticate.password}</p>
            <input type="password" class="input" minlength="5" maxlength="40" data-v-model="password">

            <p class="label__title">${this.lang.data.Authenticate.email}</p>
            <input type="email" class="input" minlength="5" maxlength="80" data-v-model="email">

            <p class="label__title">${this.lang.data.Authenticate.avatar}</p>
            <input type="text" class="input" data-v-model="avatar">

            <input type="submit" id="register_submit" class="btn flex" value="${this.lang.data.Authenticate.registerLink}">
          </form>
        </div>
      </section>
    </main>
    `;
  }

  public mounted() {
    DataBinding((v: { [key: string]: string }) => {
      this.login = v.login || this.login;
      this.password = v.password || this.password;
      this.email = v.email || this.email;
      this.avatar = v.avatar || this.avatar;
    });
    const login = $(".authenticate > .container .tab #login_submit")!;
    login.addEventListener("click", () => this.authenticateUser(this.login, this.password));
    const register = $(".authenticate > .container .tab #register_submit")!;
    register.addEventListener("click", () => this.registerUser(this.login, this.password, this.email, this.avatar));
  }

  private async authenticateUser(login: string, password: string) {
    if (login.length !== 0 && password.length !== 0) {
      const res: IUser | Exists = await AuthenticateUser({ login, password });
      if (res !== Exists.NotFound) {
        this.store.dispatch("updateAllData", res);
        document.cookie = `user_id=${res.id}; expires=${new Date("2019")};`;
        success(`${this.lang.data.Authenticate.welcome} ${res.User.Login}!`, () => Router.go("/"));
      } else {
        error(this.lang.data.Authenticate.notFound);
      }
    }
  }

  private async registerUser(login: string, password: string, email: string, avatar: string) {
    if (login.length !== 0 && password.length !== 0 && email.length !== 0) {
      const res: any = await RegisterUser({ login, password, email, avatar });
      if (res) {
        success(this.lang.data.Authenticate.registered, () => Router.go("/auth"));
      } else {
        error(this.lang.data.Authenticate.userExists);
      }
    }
  }
}

export default new Authenticate();
