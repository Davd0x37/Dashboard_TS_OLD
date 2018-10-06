import { QueryUser } from "../controller/User";
import { Component, Method, Prop, Route } from "../decorators";
import { DataBinding } from "../lib/DataBinding";
import Triton from "../lib/Triton";
import { $ } from "../utils/DOM";

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
          <p class="label__title" data-v-model="login">Login</p>
          <input type="text" class="input" data-v-model="login">
          <p class="label__title">Password</p>
          <input type="password" class="input" data-v-model="password">
          <input type="submit" id="login_submit" value="Log in">
        </div>
        <div class="tab register__tab">
          <p class="label__title" data-v-model="login">Login</p>
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
    const login = $(".authenticate > .container .tab #login_submit")!;
    login.addEventListener("click", () => this.authenticateUser());
    const register = $(".authenticate > .container .tab #register_submit")!;
    register.addEventListener("click", () => this.registerUser());
  }

  @Method()
  private async authenticateUser() {
    const res = await QueryUser.authenticate(this.login, this.password);
  }

  @Method()
  private async registerUser() {
    const res = await QueryUser.registerUser(this.login, this.password, this.email);
  }
}

export default new Authenticate()