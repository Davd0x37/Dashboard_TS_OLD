import { log } from "@UTILS/log";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public readonly id!: string;

  @ManyToOne(_ => User, user => user.services)
  @JoinColumn()
  public user!: User;

  @Column("jsonb", { nullable: false })
  public data!: string;

  @Column("varchar", { length: 128, nullable: false })
  public serviceName!: string;

  /**
   * Update service data
   *
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {string} data Updated data
   * @returns {Promise<boolean>} True if update succeed or false
   */
  public static async updateData(
    id: string,
    serviceName: string,
    data: string
  ): Promise<boolean> {
    try {
      const _ = await this.createQueryBuilder()
        .update()
        .set({ data })
        .where("user = :id", { id })
        .andWhere("serviceName = :serviceName", { serviceName })
        .execute();
      return true;
    } catch (err) {
      return log(err, false);
    }
  }

  /**
   * Create new service and assign it to the user
   *
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {string} data Everything that need to be stored in database
   * Must be stringified object
   * @returns {Promise<boolean>} Success or failure state
   */
  public static async saveService(
    id: string,
    serviceName: string,
    data: string
  ): Promise<boolean> {
    try {
      const newService = this.create({ serviceName, data }).save();

      await this.createQueryBuilder()
        .relation(User, "services")
        .of(id)
        .add(newService);

      return true;
    } catch (e) {
      return log(e, false);
    }
  }

  /**
   * Get service assigned to user id
   *
   * @param {string} id User id
   * @param {string} serviceName service name
   * @returns {Promise<Service | null>} Service or undefined if not found
   */
  public static async getServiceByName(
    id: string,
    serviceName: string
  ): Promise<Service> {
    try {
      return this.findOneOrFail({ where: { user: id, serviceName } });
    } catch (e) {
      return log(e, null);
    }
  }

  /**
   * Get all services assigned to user
   *
   * @param {string} id User id
   * @returns {Promise<Service[] | null>} Array of services or null if not found
   */
  public static async getServiceById(id: string): Promise<Service[] | null> {
    try {
      const service = await this.find({ where: { user: id } });
      return service.length > 0 ? service : null;
    } catch (e) {
      return log(e, null);
    }
  }
}
