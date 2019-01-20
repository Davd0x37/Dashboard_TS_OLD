import { AppError } from "@/utils/log";
import { BaseEntity, getConnection, ObjectType } from "typeorm";

/**
 * Search for services and tokens assigned to userId and serviceName.
 *
 * NOTE: Always use it when creating new tokens/services or updating existing.
 * When i'll find other method to validate uniquability of
 * `serviceName` and `userId` in whole table, you can stop using it.
 * I mean, there cannot be more than one service in services or
 * AuthTokens assigned to user
 * _unique: true_ not working for this case because it checks
 * serviceName in entire table.
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {ObjectType<BaseEntity>} ent Entity with type of T (AuthTokens...)
 * @returns {Promise<boolean>} True if exists or false if not found
 */
export const entityExists = (
  id: string,
  serviceName: string,
  ent: ObjectType<BaseEntity>
): Promise<boolean> =>
  getConnection()
    .getRepository(ent)
    .findOneOrFail({ where: { user: { id }, serviceName } })
    .then(_ => true, err => AppError(err, false));

/**
 * It does the same thing as `entityExists` but
 * instead of returning true/false it returns true
 * or throw fales/reject false.
 * It is useful when you need stop executing function
 * without checking returned value.
 * Just throw exception and stop executing.
 * #Note: Tt will reject if entity exists,
 * where `entityExists` returns true.
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {ObjectType<BaseEntity>} ent Entity with type of T (AuthTokens...)
 * @returns {Promise<boolean>} Reject with false if entity not exists or
 * resolve true if exists
 */
export const entityExistsThrow = (
  id: string,
  serviceName: string,
  ent: ObjectType<BaseEntity>
): Promise<boolean> =>
  getConnection()
    .getRepository(ent)
    .findOneOrFail({ where: { user: { id }, serviceName } })
    .then(_ => Promise.reject(AppError("Not found", false)), _ => true);
