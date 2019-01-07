import { entityExists } from "@/repository/Manager";
import { IServiceTokens } from "@/type";
import { AppError } from "@/utils/log";
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

  @ManyToOne(_ => User, user => user.tokens, { nullable: false })
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

  @Column("text", { nullable: true })
  public state?: string;

  @Column("timestamptz", { nullable: true })
  public updateTime?: Date;

  /**
   * Update authentication tokens.
   * @static
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {IServiceTokens} tokens Selected tokens
   * @returns {Promise<boolean>} True if update succeed or false
   * @memberof AuthTokens
   */
  public static async updateTokens(
    id: string,
    serviceName: string,
    tokens: IServiceTokens
  ): Promise<boolean> {
    const exists = await entityExists(id, serviceName, this);

    return (
      exists &&
      (await this.update(
        { user: { id }, serviceName },
        { ...tokens, updateTime: new Date() }
      ).then(_ => true, err => AppError(err, false)))
    );
  }

  /**
   * Create new tokens and assign them to user.
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {IServiceTokens} tokens Tokens that will be saved in database
   * @returns {Promise<boolean>} False if tokens exists or true if not
   * @memberof AuthTokens
   */
  public static async saveTokens(
    id: string,
    serviceName: string,
    tokens: IServiceTokens
  ): Promise<boolean> {
    const tokensExists = await entityExists(id, serviceName, this);

    return (
      !tokensExists &&
      (await this.create({
        user: { id },
        serviceName,
        ...tokens
      })
        .save()
        .then(_ => true, err => AppError(err, false)))
    );
  }

  /**
   * Get auth tokens assigned to user id.
   * @static
   * @param {string} id User id
   * @param {string} serviceName service name
   * @returns {(Promise<AuthTokens | null>)} Auth tokens or null if not found
   * @memberof AuthTokens
   */
  public static async getAuthTokenByName(
    id: string,
    serviceName: string
  ): Promise<AuthTokens | null> {
    try {
      return await this.findOneOrFail({ where: { user: { id }, serviceName } });
    } catch (err) {
      return AppError(err, null);
    }
  }

  /**
   * Get all auth tokens assigned to user.
   * @static
   * @param {string} id User id
   * @returns {(Promise<AuthTokens[] | null>)} Array of auth tokens or null if not found
   * @memberof AuthTokens
   */
  public static async getAuthTokensById(
    id: string
  ): Promise<AuthTokens[] | null> {
    try {
      const tokens = await this.find({ where: { user: { id } } });
      return tokens.length > 0 ? tokens : null;
    } catch (err) {
      return AppError(err, null);
    }
  }

  /**
   * Get user state key.
   * @static
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @returns {(Promise<string | null>)} State key or null if not exists
   * @memberof AuthTokens
   */
  public static async getStateKey(
    id: string,
    serviceName: string
  ): Promise<string | null> {
    try {
      const key = await this.findOneOrFail({
        where: { user: { id }, serviceName }
      });
      // It de facto returns null if is empty but typescript
      // recognizes `?` operator as undefined not as null
      return key.state ? key.state : null;
    } catch (err) {
      return AppError(err, null);
    }
  }
}
