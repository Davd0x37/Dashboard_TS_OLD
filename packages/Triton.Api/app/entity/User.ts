import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AuthTokens } from "./AuthTokens";
import { Service } from "./Service";

import { log } from "@UTILS/log";
@Entity({ name: "Users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @Column("varchar", { length: 512, unique: true, nullable: false })
  public login!: string;

  @Column("varchar", { length: 512, nullable: false })
  public password!: string;

  @Column("varchar", { length: 512, unique: true, nullable: false })
  public email!: string;

  @Column("text", { nullable: true })
  public avatar?: string;

  @Column("timestamptz", { nullable: false, default: new Date() })
  public registerDate!: Date;

  @Column("boolean", { nullable: false })
  public isOnline!: boolean;

  @OneToMany(_ => AuthTokens, token => token.user)
  public tokens?: AuthTokens[];

  @OneToMany(_ => Service, service => service.user)
  public services?: Service[];

  /**
   * Return user with given id
   *
   * @param {string} id User id
   * @returns {Promise<User | null>} User if exists otherwise null
   */
  public static getUserById(id: string): Promise<User | null> {
    try {
      return this.findOneOrFail(id);
    } catch (err) {
      return log(err, null);
    }
  }

  /**
   * Get user ID by his state key
   * Created for authenticating third party services
   * @param {string} state State key
   * @returns {Promise<string | null>} User ID
   */
  public static async getUserIdByStateKey(
    state: string
  ): Promise<string> {
    try {
      const id = await AuthTokens.findOneOrFail({
        where: { state },
        loadRelationIds: true
      });
      return id.user.id;
    } catch (err) {
      return log(err, null);
    }
  }
}
