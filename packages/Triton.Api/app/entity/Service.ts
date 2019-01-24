import { entityExists } from "@/repository/Manager";
import { AppError } from "@/utils/log";
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
  @PrimaryGeneratedColumn("increment")
  public readonly id!: string;

  @ManyToOne(_ => User, user => user.services, { nullable: false })
  @JoinColumn()
  public user!: User;

  @Column("jsonb", { nullable: false })
  public data!: string;

  @Column("varchar", { length: 128, nullable: false })
  public serviceName!: string;

  /**
   * Update service data.
   * @static
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {string} data Updated data
   * @returns {Promise<boolean>} True if update succeed or false
   * @memberof Service
   */
  public static async updateData(
    id: string,
    serviceName: string,
    data: string
  ): Promise<boolean> {
    const exists = await entityExists(id, serviceName, this);

    return (
      exists &&
      (await this.update({ user: { id }, serviceName }, { data }).then(
        _ => true,
        err => AppError(err, false)
      ))
    );
  }

  /**
   * Create new service and assign it to the user.
   * @static
   * @param {string} id User id
   * @param {string} serviceName Service name
   * @param {string} data Everything that needs to be stored in database
   * must be stringified object
   * @returns {Promise<boolean>} False if service exists/wrong user ID
   * otherwise true
   * @memberof Service
   */
  public static async saveService(
    id: string,
    serviceName: string,
    data: string
  ): Promise<boolean> {
    // If service exists it will return true
    // If User ID is incorrect or something went wrong then we receive false
    const serviceExists = await entityExists(id, serviceName, this);

    return (
      !serviceExists &&
      (await this.create({
        user: { id },
        serviceName,
        data
      })
        .save()
        .then(_ => true, err => AppError(err, false)))
    );
  }

  /**
   * Get service assigned to user id.
   * @static
   * @param {string} id User id
   * @param {string} serviceName service name
   * @returns {(Promise<Service | null>)} Service or undefined if not found
   * @memberof Service
   */
  public static async getServiceByName(
    id: string,
    serviceName: string
  ): Promise<Service | null> {
    try {
      return await this.findOneOrFail({ where: { user: { id }, serviceName } });
    } catch (err) {
      return AppError(err, null);
    }
  }

  /**
   * Get all services assigned to user.
   * @static
   * @param {string} id User id
   * @returns {(Promise<Service[] | null>)} Array of services or null if not found
   * @memberof Service
   */
  public static async getServiceById(id: string): Promise<Service[] | null> {
    try {
      const service = await this.find({ where: { user: { id } } });
      return service.length > 0 ? service : null;
    } catch (err) {
      // Return null and print error because user ID may be incorrect
      return AppError(err, null);
    }
  }
}
