import lang from "#/i18n";
import Component from "#/lib/Component";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";
import { IUserDocType } from "#SH/Interfaces";
import { authenticateUser, registerUser } from "#/controller/UserManager";
import { success, error } from "#/utils/Alert";

export default class Authenticate extends Component {
  protected state = {
    login: "",
    password: "",
    email: "",
    avatar: ""
  };

  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <main class="authenticate">
        <input type="radio" name="tabs" id="login" checked="checked" />
        <label for="login">{lang.Authenticate.loginLink}</label>

        <input type="radio" name="tabs" id="register" />
        <label for="register">{lang.Authenticate.registerLink}</label>
        <section class="container">
          <div class="tab login__tab">
            <form ignoreEvents onsubmit="return false;">
              <p class="label__title">{lang.Authenticate.login}</p>
              <input
                type="text"
                id="login__input"
                class="input"
                minlength="5"
                maxlength="40"
                v-bind={(login: string) => this.setState({ login })}
              />
              <p class="label__title">{lang.Authenticate.password}</p>
              <input
                type="password"
                id="password__input"
                class="input"
                minlength="5"
                maxlength="40"
                v-bind={(password: string) => this.setState({ password })}
              />
              <input
                type="submit"
                id="login_submit"
                class="btn flex"
                value={lang.Authenticate.loginLink}
                onClick={() => this.authenticateUser()}
              />
            </form>
          </div>
          <div class="tab register__tab">
            <form ignoreEvents onsubmit="return false;">
              <p class="label__title">{lang.Authenticate.login}</p>
              <input
                type="text"
                class="input"
                minlength="5"
                maxlength="40"
                v-bind={(login: string) => this.setState({ login })}
              />
              <p class="label__title">{lang.Authenticate.password}</p>
              <input
                type="password"
                class="input"
                minlength="5"
                maxlength="40"
                v-bind={(password: string) => this.setState({ password })}
              />
              <p class="label__title">{lang.Authenticate.email}</p>
              <input
                type="email"
                class="input"
                minlength="5"
                maxlength="80"
                v-bind={(email: string) => this.setState({ email })}
              />
              <p class="label__title">{lang.Authenticate.avatar}</p>
              <input
                type="text"
                class="input"
                v-bind={(avatar: string) => this.setState({ avatar })}
              />
              <input
                type="submit"
                id="register_submit"
                class="btn flex"
                value={lang.Authenticate.registerLink}
                onClick={() => this.registerUser()}
              />
            </form>
          </div>
        </section>
      </main>
    );
  }

  public mounted() {
    const el = this.pCurrentElement.dom;
    if (el) {
    }
  }

  private async authenticateUser() {
    const { login, password } = this.state;
    if (login.length !== 0 && password.length !== 0) {
      const res: IUserDocType = await authenticateUser({
        login,
        password
      });
      if (res) {
        this.store.dispatch("UpdateUserData", res);
        success(`${lang.Messages.welcome} ${res.User.Login}!`, () => null);
      } else {
        error(lang.Messages.notFound);
      }
    }
  }

  private async registerUser() {
    const { login, password, email, avatar } = this.state;
    if (login.length !== 0 && password.length !== 0 && email.length !== 0) {
      const res: boolean = await registerUser({
        login,
        password,
        email,
        avatar
      });
      if (res) {
        success(lang.Messages.registered, () => null);
      } else {
        error(lang.Messages.userExists);
      }
    }
  }
}
