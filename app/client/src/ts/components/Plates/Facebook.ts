import { PlateComponent } from "../Component";

interface IData {
  username: string;
  email: string;
  phoneNumber: string;
  notifications: string;
  messages: string;
}

class FacebookPlate extends PlateComponent {
  protected template: string;
  protected userData: IData = {
    username: "Jon Doe",
    email: "jondoe@gmail.com",
    phoneNumber: "+48 123 456 789",
    notifications: "12",
    messages: "12"
  };

  constructor() {
    super();
  }

  /**
   * Invoke all needed methods to create component
   *
   * @memberof FacebookPlate
   */
  public create(): void {
    // FILL
  }

  /**
   * Update component
   *
   * @memberof FacebookPlate
   */
  public update(): void {
    // FILL
  }

  /**
   * Invokes all methods after creating component
   *
   * @memberof FacebookPlate
   */
  public postProcess(): void {
    // FILL
  }

  /**
   * Create and update view
   *
   * @protected
   * @memberof FacebookPlate
   */
  protected view(): void {
    this.template = `<header class="plate__brand">
    <i class="fab fa-facebook fa-2x" style="color: #3C5A9A;"></i>
    <h3 class="plate__title">Facebook</h3>
</header>
<div class="plate__container facebook-plate">
    <div class="container">
        <aside class="container__details">
            <p class="label__title">Nazwa użytkownika</p>
            <p class="label__value">${this.userData.username}</p>
            <p class="label__title">Email</p>
            <p class="label__value facebook--color-blue">${
              this.userData.email
            }</p>
            <p class="label__title">Numer telefonu</p>
            <p class="label__value label__value--last facebook--color-green">${
              this.userData.phoneNumber
            }
            </p>
        </aside>
        <div class="container__other">
            <div class="notifications">
                <div class="flex">
                    <i class="fas fa-bell fa-2x" style="color: #3C5A9A; padding-right: 10px;"></i>
                    <div class="message_text">
                        <p class="label__title">Powiadomienia</p>
                        <p class="label__value">${
                          this.userData.notifications
                        }</p>
                    </div>
                </div>
                <div class="flex">
                    <i class="fas fa-comment-dots fa-2x" style="color: #3C5A9A; padding-right: 10px;"></i>
                    <div class="message_text">
                        <p class="label__title">Wiadomości</p>
                        <p class="label__value label__value--last">${
                          this.userData.messages
                        }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
  }

  /**
   * Controll buttons and all data
   *
   * @protected
   * @memberof FacebookPlate
   */
  protected controller(): void {
    // FILL
  }
}

export default new FacebookPlate();
