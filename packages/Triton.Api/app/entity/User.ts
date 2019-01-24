import { AppError } from "@/utils/log";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AuthTokens, Service } from "./index";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public readonly id!: string;

  @Column("text", { nullable: true })
  public avatar?: string;

  @Column("varchar", { length: 512, unique: true, nullable: false })
  public login!: string;

  @Column("text", { nullable: false })
  public password!: string;

  @Column("varchar", { length: 512, unique: true, nullable: false })
  public email!: string;

  @Column("timestamptz", { nullable: false })
  public registerDate!: Date;

  @Column("boolean", { nullable: false })
  public isOnline!: boolean;

  @Column("text", { nullable: true })
  public sessionId?: string;

  @OneToMany(_ => AuthTokens, token => token.user)
  public tokens?: AuthTokens[];

  @OneToMany(_ => Service, service => service.user)
  public services?: Service[];

  /**
   * Find user by id.
   * @param {string} id User id
   * @returns {(Promise<User | null>)} User or null if not found
   */
  public static async getById(id: string): Promise<User | null> {
    try {
      return await this.findOneOrFail(id);
    } catch (err) {
      return AppError(err, null);
    }
  }

  /**
   * Get user ID by his state key.
   * @param {string} state State key
   * @returns {(Promise<string | null>)} User ID or null if state key has been delete
   */
  public static async getIdByStateKey(state: string): Promise<string | null> {
    try {
      // There is <any> because result contains user column
      // and typescript recognizes it as object with user entity
      // instead of user ID. Note that, we used `loadRelationIds`
      // so it returns relation ID in place of relation column.
      const { user } = await AuthTokens.findOneOrFail<any>({
        where: { state },
        loadRelationIds: true
      });
      return user;
    } catch (err) {
      return AppError(err, null);
    }
  }

  public static async updateSession(
    id: string,
    sessionId: string
  ): Promise<boolean> {
    try {
      await this.findOneOrFail(id);
      return await this.update({ id }, { sessionId })
        .then(_ => true)
        .catch(err => AppError(err, false));
    } catch (err) {
      return AppError(err, false);
    }
  }
}
