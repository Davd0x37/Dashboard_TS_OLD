import { error, success } from "../controller/Alert";
import Router from "../controller/Router";
import { QueryUser } from "../controller/User";
import { Component, Method, Prop } from "../decorators";
import { DataBinding } from "../lib/DataBinding";
import Triton from "../lib/Triton";
import { IState } from "../store/State";
import Store from "../store/Store";
import { $, $$ } from "../utils/DOM";

@Component()
class Authenticate extends Triton {
  @Prop()
  private login: string = "";
  @Prop()
  private password: string = "";
  @Prop()
  private email: string = "";

  constructor() {
    super();
  }

  @Method()
  public render() {
    return /*html*/ `
    <main class="authenticate">
      <input type="radio" name="tabs" id="login" checked="checked"/>
      <label for="login">LOGIN</label>

      <input type="radio" name="tabs" id="register" />
      <label for="register">REGISTER</label>
      <section class="container">
        <div class="tab login__tab">
          <p class="label__title">Login</p>
          <input type="text" class="input" data-v-model="login">
          <p class="label__title">Password</p>
          <input type="password" class="input" data-v-model="password">
          <input type="submit" id="login_submit" value="Log in">
        </div>
        <div class="tab register__tab">
          <p class="label__title">Login</p>
          <input type="text" class="input" data-v-model="login">
          <p class="label__title">Password</p>
          <input type="password" class="input" data-v-model="password">
          <p class="label__title" data-v-model="email">E-mail</p>
          <input type="text" class="input" data-v-model="email">
          <input type="submit" id="register_submit" value="Register">
        </div>
      </section>
    </main>
    `;
  }

  @Method()
  public mounted() {
    DataBinding((v: { [key: string]: string }) => {
      this.login = v.login || this.login;
      this.password = v.password || this.password;
      this.email = v.email || this.email;
    });
    this.isEmpty($$(`[data-v-model="login"]`)!);
    this.isEmpty($$(`[data-v-model="password"]`)!);
    this.isEmpty($$(`[data-v-model="email"]`)!);
    const login = $(".authenticate > .container .tab #login_submit")!;
    login.addEventListener("click", () => this.authenticateUser());
    const register = $(".authenticate > .container .tab #register_submit")!;
    register.addEventListener("click", () => this.registerUser());
  }

  @Method()
  private async authenticateUser() {
    if (this.login.length !== 0 && this.password.length !== 0) {
      const res: any = await QueryUser.authenticate(this.login, this.password);
      if (res) {
        Store.dispatch("updateAllData", {
          user: {
            id: res.id,
            avatar: res.avatar,
            username: res.login
          },
          Spotify: {
            username: res.Spotify.username,
            email: res.Spotify.email,
            type: res.Spotify.type,
          },
          DigitalOcean: {
            email: res.DigitalOcean.email,
            total: res.DigitalOcean.total,
            dropletLimit: res.DigitalOcean.dropletLimit,
            lastCreatedDroplet: res.DigitalOcean.lastCreatedDroplet,
          },
          Paypal: {
            username: res.Paypal.username,
            email: res.Paypal.email,
            phone: res.Paypal.phone,
            verified: res.Paypal.verified,
            country: res.Paypal.country,
            zoneinfo: res.Paypal.zoneinfo,
          }
        } as IState);
        document.cookie = `user_id=${res.id}; expires=${new Date('2019')};`;
        success(`Witaj ${res.login}!`, () => Router.go("/"));
      } else {
        error("Nie ma takiego użytkownika");
      }
    }
  }

  @Method()
  private async registerUser() {
    if (this.login.length !== 0 && this.password.length !== 0 && this.email.length !== 0) {
      const res: any = await QueryUser.registerUser(this.login, this.password, this.email);
      if (res) {
        success(`ZAREJESTROWANO!`, () => Router.go("/auth"));
      } else {
        error(`USER ALREADY EXISTS`);
      }
    }
  }

  @Method()
  private isEmpty(elem: NodeListOf<Element>) {
    elem.forEach((el: any) => {
      el.addEventListener("blur", (e: any) => {
        if (e.target.value.length === 0) {
          e.target.classList.remove("input--success");
          e.target.classList.add("input--error");
        } else {
          e.target.classList.remove("input--error");
          e.target.classList.add("input--success");
        }
      });
    });
  }
}

export default new Authenticate();
