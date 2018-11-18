import lang from "#/i18n";
import Component from "#/lib/Component";
import { VElement } from "#/vdom/Interfaces";
import { createElement } from "#/vdom/VDOM";

export default class Authenticate extends Component {
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
              />
              <p class="label__title">{lang.Authenticate.password}</p>
              <input
                type="password"
                id="password__input"
                class="input"
                minlength="5"
                maxlength="40"
              />
              <input
                type="submit"
                id="login_submit"
                class="btn flex"
                value={lang.Authenticate.loginLink}
              />
            </form>
          </div>
          <div class="tab register__tab">
            <form ignoreEvents onsubmit="return false;">
              <p class="label__title">{lang.Authenticate.login}</p>
              <input type="text" class="input" minlength="5" maxlength="40" />>
              <p class="label__title">{lang.Authenticate.password}</p>
              <input
                type="password"
                class="input"
                minlength="5"
                maxlength="40"
              />
              <p class="label__title">{lang.Authenticate.email}</p>
              <input type="email" class="input" minlength="5" maxlength="80" />
              <p class="label__title">{lang.Authenticate.avatar}</p>
              <input type="text" class="input" />
              <input
                type="submit"
                id="register_submit"
                class="btn flex"
                value={lang.Authenticate.registerLink}
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

  // private async authenticateUser(login: string, password: string) {
  //   if (login.length !== 0 && password.length !== 0) {
  //     const res: IUserDocType | false = await authenticateUser({
  //       login,
  //       password
  //     });
  //     if (res) {
  //       store.dispatch("updateAllData", res);
  //       success(`${lang.Messages.welcome} ${res.User.Login}!`, () => null);
  //     } else {
  //       error(lang.Messages.notFound);
  //     }
  //   }
  // }

  // private async registerUser(
  //   login: string,
  //   password: string,
  //   email: string,
  //   avatar: string
  // ) {
  //   if (login.length !== 0 && password.length !== 0 && email.length !== 0) {
  //     const res: any = await registerUser({ login, password, email, avatar });
  //     if (res) {
  //       success(lang.Messages.registered, () => null);
  //     } else {
  //       error(lang.Messages.userExists);
  //     }
  //   }
  // }
}
