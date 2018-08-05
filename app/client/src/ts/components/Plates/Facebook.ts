import { Component } from "../Component";

interface IData {
  username: string;
  email: string;
  phoneNumber: string;
  notifications: string;
  messages: string;
}

export class FacebookPlate extends Component {
  protected template: string;
  protected userData: IData = {
    username: "Jon Doe",
    email: "jondoe@gmail.com",
    phoneNumber: "+48 123 456 789",
    notifications: "12",
    messages: "12"
  };

  constructor(data?: IData) {
    super();
  }

  /**
   * Invokes all methods after creating component
   *
   * @memberof Search
   */
  public postProcess() {
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
   * Invoke all needed methods to create component
   *
   * @protected
   * @memberof FacebookPlate
   */
  protected create(): void {
    // FILL
  }

  protected view(): void {
    this.template = `<header class="plate__brand">
    <i class="fab fa-facebook fa-2x" style="color: #3C5A9A;"></i>
    <h3 class="plate__title">Facebook</h3>
</header>
<div class="plate__container facebook-plate">
    <div class="container">
        <aside class="container__details">
            <p class="item__title">Nazwa użytkownika</p>
            <p class="item__value">${this.userData.username}</p>
            <p class="item__title">Email</p>
            <p class="item__value facebook--color-blue">${
              this.userData.email
            }</p>
            <p class="item__title">Numer telefonu</p>
            <p class="item__value item__value--last facebook--color-green">${
              this.userData.phoneNumber
            }
            </p>
        </aside>
        <div class="container__other">
            <div class="notifications">
                <div class="flex">
                    <i class="fas fa-bell fa-2x" style="color: #3C5A9A; padding-right: 10px;"></i>
                    <div class="message_text">
                        <p class="item__title">Powiadomień</p>
                        <p class="item__value">${
                          this.userData.notifications
                        }</p>
                    </div>
                </div>
                <div class="flex">
                    <i class="fas fa-comment-dots fa-2x" style="color: #3C5A9A; padding-right: 10px;"></i>
                    <div class="message_text">
                        <p class="item__title">Wiadomości</p>
                        <p class="item__value item__value--last">${
                          this.userData.messages
                        }
                        </p>
                    </div>
                </div>
            </div>
            <!-- <div class="post">
              <textarea class="post__message" name="post_message" id="post_message" cols="20" rows="4" placeholder="Czym chcesz się podzielić z innymi?"></textarea>
              <button class="item__btn btn--color-green">
                  <i class="fas fa-paper-plane"></i>
              </button>
          </div> -->
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
