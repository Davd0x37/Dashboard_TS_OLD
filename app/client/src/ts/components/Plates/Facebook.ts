import Storage from "../../controller/Storage";
import { PlateComponent } from "../Component";

class FacebookPlate extends PlateComponent {
  constructor() {
    super();
  }

  public create(): void {
    const template = this.view();
    this.createPlate(template);
  }

  public update(): void {
    const template = this.view();
    this.article.innerHTML = template;
  }

  protected view(): string {
    const data = Storage.store.services.facebook;
    return `<header class="plate__brand">
    <i class="fab fa-facebook fa-2x" style="color: #3C5A9A;"></i>
    <h3 class="plate__title">Facebook</h3>
</header>
<div class="plate__container facebook-plate">
    <div class="container">
        <aside class="container__details">
            <p class="label__title">Nazwa użytkownika</p>
            <p class="label__value">${data.username}</p>
            <p class="label__title">Email</p>
            <p class="label__value label__value--no-capitalize  facebook--color-blue">${
              data.email
            }</p>
            <p class="label__title">Numer telefonu</p>
            <p class="label__value label__value--last facebook--color-green">${
              data.phoneNumber
            }
            </p>
        </aside>
        <div class="container__other">
            <div class="notifications">
                <div class="flex">
                    <i class="fas fa-bell fa-2x" style="color: #3C5A9A; padding-right: 10px;"></i>
                    <div class="message_text">
                        <p class="label__title">Powiadomienia</p>
                        <p class="label__value">${data.notifications}</p>
                    </div>
                </div>
                <div class="flex">
                    <i class="fas fa-comment-dots fa-2x" style="color: #3C5A9A; padding-right: 10px;"></i>
                    <div class="message_text">
                        <p class="label__title">Wiadomości</p>
                        <p class="label__value label__value--last">${
                          data.messages
                        }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
  }

  protected controller(): void {
    // FILL
  }
}

export default new FacebookPlate();
