import { IUser } from "../controller/User/Interface";
import { AuthenticateUser, RegisterUser } from "../controller/User/Manager";
import App from "../lib/App";
import { DataBinding } from "../lib/DataBinding";
import { fromEvent } from "../lib/Observable";
import Triton from "../lib/Triton";
import { error, success } from "../utils/Alert";
import { $ } from "../utils/DOM";

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
      <label for="login">${this.lang.Authenticate.loginLink}</label>

      <input type="radio" name="tabs" id="register" />
      <label for="register">${this.lang.Authenticate.registerLink}</label>
      <section class="container">
        <div class="tab login__tab">
          <form onsubmit="return false;">
            <p class="label__title">${this.lang.Authenticate.login}</p>
            <input type="text" id="login__input" class="input" minlength="5" maxlength="40" data-v-model="login">

            <p class="label__title">${this.lang.Authenticate.password}</p>
            <input type="password" id="password__input" class="input" minlength="5" maxlength="40" data-v-model="password">

            <input type="submit" id="login_submit" class="btn flex" value="${this.lang.Authenticate.loginLink}">
          </form>
        </div>
        <div class="tab register__tab">
          <form onsubmit="return false;">
            <p class="label__title">${this.lang.Authenticate.login}</p>
            <input type="text" class="input" minlength="5" maxlength="40" data-v-model="login">

            <p class="label__title">${this.lang.Authenticate.password}</p>
            <input type="password" class="input" minlength="5" maxlength="40" data-v-model="password">

            <p class="label__title">${this.lang.Authenticate.email}</p>
            <input type="email" class="input" minlength="5" maxlength="80" data-v-model="email">

            <p class="label__title">${this.lang.Authenticate.avatar}</p>
            <input type="text" class="input" data-v-model="avatar">

            <input type="submit" id="register_submit" class="btn flex" value="${this.lang.Authenticate.registerLink}">
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
      console.log(v.login)
    });
    fromEvent($(".authenticate > .container .tab #login_submit")!, "click").subscribe({
      next: async () => this.authenticateUser(this.login, this.password)
    });
    fromEvent($(".authenticate > .container .tab #register_submit")!, "click").subscribe({
      next: async () => this.registerUser(this.login, this.password, this.email, this.avatar)
    });
  }

  private async authenticateUser(login: string, password: string) {
    if (login.length !== 0 && password.length !== 0) {
      const res: IUser | false = await AuthenticateUser({ login, password });
      if (res) {
        this.store.dispatch("updateAllData", res);
        success(`${this.lang.Messages.welcome} ${res.User.Login}!`, () => App.go("/"));
      } else {
        error(this.lang.Messages.notFound);
      }
    }
  }

  private async registerUser(login: string, password: string, email: string, avatar: string) {
    if (login.length !== 0 && password.length !== 0 && email.length !== 0) {
      const res: any = await RegisterUser({ login, password, email, avatar });
      if (res) {
        success(this.lang.Messages.registered, () => App.go("/auth"));
      } else {
        error(this.lang.Messages.userExists);
      }
    }
  }
}

export default new Authenticate();
