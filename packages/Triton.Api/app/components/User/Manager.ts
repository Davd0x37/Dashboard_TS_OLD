import { AuthTokens } from "@ENTITY/AuthTokens";
import { Service } from "@ENTITY/Service";
import { IServiceTokens } from "@TYPE/auth";
import { AppError } from "@UTILS/log";
import { getConnection, ObjectType } from "typeorm";

/**
 * Setup user new tokens and service
 * Create new service row or do nothing if exists
 * Do the same with tokens
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServiceTokens} tokens Selected tokens
 * @returns {Promise<boolean>}
 */
export const setupServiceTokens = async (
  id: string,
  serviceName: string,
  tokens: IServiceTokens
): Promise<boolean> => {
  try {
    const savedService = await Service.saveService(id, serviceName, "");
    // Save/update existing tokens
    const savedTokens = await AuthTokens.saveTokens(
      id,
      serviceName,
      tokens,
      true
    );

    return savedService && savedTokens;
  } catch (err) {
    return AppError(err, false);
  }
};

/**
 * Search for services and tokens assigned to userId and serviceName
 *
 * NOTE: Always use it when creating new tokens/services or updating existing.
 * When i'll find other method to validate uniquability of
 * `serviceName` and `userId` in whole table, you can stop using it.
 * I mean, there cannot be more than one service in services or
 * AuthTokens assigned to user
 * _unique: true_ not working for this case because it checks
 * serviceName in whole table
 *
 * @template T AuthTokens | Service
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {ObjectType<T>} ent Entity with type of T (AuthTokens...)
 * @returns {Promise<boolean>} True if exists or false if not found
 */
export const entityExists = <T extends AuthTokens | Service>(
  id: string,
  serviceName: string,
  ent: ObjectType<T>
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
 * Note that it will reject if entity exists,
 * where `entityExists` returns true
 *
 * @template T AuthTokens | Service
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {ObjectType<T>} ent Entity with type of T (AuthTokens...)
 * @returns {Promise<boolean>} Reject with false if entity exists or
 * resolve true if not exists
 */
export const entityExistsThrow = <T extends AuthTokens | Service>(
  id: string,
  serviceName: string,
  ent: ObjectType<T>
): Promise<boolean> =>
  getConnection()
    .getRepository(ent)
    .findOneOrFail({ where: { user: { id }, serviceName } })
    .then(_ => Promise.reject(AppError("Entity exists", false)), _ => true);
