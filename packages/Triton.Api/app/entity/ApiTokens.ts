import { IServiceAPI } from "@/type";
import { AppError } from "@/utils/log";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ApiTokens" })
export class ApiTokens extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("character varying", {
    length: 128,
    nullable: false,
    unique: true
  })
  public serviceName!: string;

  @Column("character varying", { length: 2048, nullable: false })
  public apiURL!: string;

  @Column("character varying", { length: 2048, nullable: true })
  public tokenService?: string;

  @Column("character varying", { length: 2048, nullable: true })
  public authorizeURL?: string;

  @Column("text", { nullable: true, array: true })
  public userScopes?: string[];

  @Column("character varying", { length: 2048, nullable: true })
  public clientID?: string;

  @Column("character varying", { length: 2048, nullable: true })
  public redirectURL?: string;

  @Column("character varying", { length: 2048, nullable: true })
  public clientSecret?: string;

  @Column("text", { nullable: false, array: true })
  public paths!: string[];

  @Column("text", { nullable: false, array: true })
  public requestedData!: string[];

  @Column("character varying", { length: 2048, nullable: false })
  public tokenType!: string;

  /**
   * Update authentication tokens.
   * @static
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {IServiceAPI} tokens Selected tokens
   * @returns {Promise<boolean>} True if update succeed or false
   * @memberof ApiTokens
   */
  public static async updateTokens(tokens: IServiceAPI): Promise<boolean> {
    try {
      await this.findOneOrFail({ serviceName: tokens.serviceName });
      return await this.update(
        { serviceName: tokens.serviceName },
        { ...tokens }
      ).then(_ => true, err => AppError(err, false));
    } catch (err) {
      return AppError(err, false);
    }
  }

  /**
   * Create new tokens and assign them to user.
   * @param {IServiceAPI} tokens Tokens that will be saved in database
   * @returns {Promise<boolean>} False if tokens exists or true if not
   * @memberof ApiTokens
   */
  public static async saveTokens(tokens: IServiceAPI): Promise<boolean> {
    return await this.create({ ...tokens })
      .save()
      .then(_ => true, err => AppError(err, false));
  }

  /**
   * Get auth tokens assigned to user id.
   * @static
   * @param {string} serviceName Service name
   * @returns {(Promise<ApiTokens | null>)} Auth tokens or null if not found
   * @memberof ApiTokens
   */
  public static async getAuthTokenByName(
    serviceName: string
  ): Promise<ApiTokens | null> {
    try {
      return await this.findOneOrFail({ where: { serviceName } });
    } catch (err) {
      return AppError(err, null);
    }
  }
}
