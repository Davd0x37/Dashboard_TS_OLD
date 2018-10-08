import { error, success } from "../controller/Alert";
import Router from "../controller/Router";
import { QueryUser } from "../controller/User";
import { Component } from "../decorators";
import { DataBinding } from "../lib/DataBinding";
import Triton from "../lib/Triton";
import { IState } from "../store/State";
import Store from "../store/Store";
import { $, $$ } from "../utils/DOM";

@Component()
class Authenticate extends Triton {
  private login: string = "";
  private password: string = "";
  private email: string = "";

  constructor() {
    super();
  }

  public render() {
    return /*html*/ `
    <main class="authenticate">
      <input type="radio" name="tabs" id="login" checked="checked"/>
      <label for="login">LOGIN</label>

      <input type="radio" name="tabs" id="register" />
      <label for="register">REGISTER</label>
      <section class="container">
        <div class="tab login__tab">
          <form onsubmit="return false;">
            <p class="label__title">Login</p>
            <input type="text" id="login__input" class="input" minlength="5" maxlength="40" data-v-model="login">

            <p class="label__title">Password</p>
            <input type="password" id="password__input" class="input" minlength="5" maxlength="40" data-v-model="password">

            <input type="submit" id="login_submit" value="Log in">
          </form>
        </div>
        <div class="tab register__tab">
          <form onsubmit="return false;">
            <p class="label__title">Login</p>
            <input type="text" class="input" minlength="5" maxlength="40" data-v-model="login">

            <p class="label__title">Password</p>
            <input type="password" class="input" minlength="5" maxlength="40" data-v-model="password">

            <p class="label__title" minlength="5" maxlength="80" data-v-model="email">E-mail</p>
            <input type="email" class="input">

            <input type="submit" id="register_submit" value="Register">
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
    });
    const login = $(".authenticate > .container .tab #login_submit")!;
    login.addEventListener("click", () => this.authenticateUser(this.login, this.password));
    const register = $(".authenticate > .container .tab #register_submit")!;
    register.addEventListener("click", () => this.registerUser(this.login, this.password, this.email));
  }

  private async authenticateUser(login: string, password: string) {
    if (login.length !== 0 && password.length !== 0) {
      const res: any = await QueryUser.authenticate(login, password);
      console.log(res)
      // if (res) {
      //   // Store.dispatch("updateAllData", res);
      //   document.cookie = `user_id=${res.id}; expires=${new Date("2019")};`;
      //   success(`Witaj ${res.login}!`, () => Router.go("/"));
      // } else {
      //   error("Nie ma takiego użytkownika");
      // }
    }
  }

  private async registerUser(login: string, password: string, email: string) {
    if (login.length !== 0 && password.length !== 0 && email.length !== 0) {
      const res: any = await QueryUser.registerUser(login, password, email);
      if (res) {
        success(`ZAREJESTROWANO!`, () => Router.go("/auth"));
      } else {
        error(`USER ALREADY EXISTS`);
      }
    }
  }
}

export default new Authenticate();
