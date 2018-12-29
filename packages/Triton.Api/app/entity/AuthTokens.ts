import { IServiceTokens } from "@/type/auth";
import { log } from "@UTILS/log";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity({ name: "AuthTokens" })
export class AuthTokens extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @ManyToOne(_ => User, user => user.tokens)
  public user!: User;

  @Column("character varying", { length: 128, nullable: false })
  public serviceName!: string;

  @Column("character varying", { length: 2048, nullable: true })
  public accessToken?: string;

  @Column("character varying", { length: 2048, nullable: true })
  public refreshToken?: string;

  @Column("character varying", { length: 32, nullable: true })
  public tokenType?: string;

  @Column("int", { nullable: true })
  public expiresIn?: number;

  @Column("character varying", { length: 128, nullable: true })
  public state?: string;

  @Column("timestamptz", { nullable: false, default: new Date() })
  public updateTime!: Date;

  /**
   * Update authentication tokens
   *
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {IServiceTokens} tokens Selected tokens
   * @returns {Promise<boolean>} True if update succeed or false
   */
  public static async updateTokens(
    id: string,
    serviceName: string,
    tokens: IServiceTokens
  ): Promise<boolean> {
    try {
      const _ = await this.createQueryBuilder("")
        .update()
        .set({ tokens })
        .where("user = :id", { id })
        .andWhere("serviceName = :serviceName", { serviceName })
        .execute();
      return true;
    } catch (err) {
      return log(err, false);
    }
  }

  /**
   * Create new tokens and assign them to user
   *
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {IServiceTokens} tokens Tokens that will be saved in database
   * @returns {Promise<boolean>} Success or failure state
   */
  public static async saveTokens(
    id: string,
    serviceName: string,
    tokens: IServiceTokens
  ): Promise<boolean> {
    try {
      // There is no need to initialize tokens with empty string or 0 number
      // They are nullable by default when saving without value
      const newTokens = await this.create({
        serviceName,
        ...tokens
      }).save();

      await this.createQueryBuilder()
        .relation(User, "tokens")
        .of(id)
        .add(newTokens);

      return true;
    } catch (e) {
      return log(e, false);
    }
  }

  /**
   * Get all auth tokens assigned to user
   *
   * @param {string} id User id
   * @returns {(Promise<AuthTokens[] | null>)} Array of auth tokens or null if not found
   */
  public static async getAuthTokensById(
    id: string
  ): Promise<AuthTokens[] | null> {
    try {
      const tokens = await this.find({ where: { user: id } });
      return tokens.length > 0 ? tokens : null;
    } catch (e) {
      return log(e, e, true);
    }
  }

  /**
   * Get auth tokens assigned to user id
   *
   * @param {string} id User id
   * @param {string} serviceName service name
   * @returns {Promise<AuthTokens>} Auth tokens or undefined if not found
   */
  public static async getAuthTokenByName(
    id: string,
    serviceName: string
  ): Promise<AuthTokens> {
    try {
      return await this.findOneOrFail({ where: { user: id, serviceName } });
    } catch (e) {
      return log(e, e, true);
    }
  }

  /**
   * Get user state key
   *
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @returns {(Promise<string | undefined>)} state key or undefined if not exists
   */
  public static async getStateKey(
    id: string,
    serviceName: string
  ): Promise<string | undefined> {
    try {
      const key = await this.findOneOrFail({
        where: { user: id, serviceName }
      });
      return key.state;
    } catch (e) {
      return log(e, e, true);
    }
  }
}
