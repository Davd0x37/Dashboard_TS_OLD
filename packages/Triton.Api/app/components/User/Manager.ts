import { AuthTokens } from "@ENTITY/AuthTokens";
import { Service } from "@ENTITY/Service";
import { User } from "@ENTITY/User";
import { IServiceTokens } from "@TYPE/auth";
import { log } from "@UTILS/log";
import { getConnection, ObjectType } from "typeorm";

/**
 * *----------------------------------------*
 * *----------------------------------------*
 * *----------------------------------------*
 * *--------------**Mutation**--------------*
 * *----------------------------------------*
 * *----------------------------------------*
 * *----------------------------------------*
 */

/**
 * Update authentication tokens
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServiceTokens} tokens Selected tokens
 * @returns {Promise<boolean>} True if update succeed or false
 */
export const updateTokens = (
  id: string,
  service: string,
  tokens: IServiceTokens
): Promise<boolean> =>
  getConnection()
    .createQueryBuilder()
    .update(AuthTokens)
    .set(tokens)
    .where("user = :id", { id })
    .andWhere("serviceName = :service", { service })
    .execute()
    .then(_ => true)
    .catch(err => log(err, false));

/**
 * Update service data
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {string} data New user data
 * @returns {Promise<boolean>} True if update succeed or false
 */
export const updateService = (
  id: string,
  service: string,
  data: string
): Promise<boolean> =>
  getConnection()
    .createQueryBuilder()
    .update(Service)
    .set({ data })
    .where("user = :id", { id })
    .andWhere("serviceName = :service", { service })
    .execute()
    .then(_ => true)
    .catch(err => log(err, false));

/**
 * Setup user new tokens and service
 * Create new service row or do nothing if exists
 * Do the same with tokens
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServiceTokens} tokens Selected tokens
 * @param {boolean} api Should use api defined in manager (default false) or from entity?
 * @returns {Promise<boolean>}
 */
export const setupServiceTokens = async (
  id: string,
  serviceName: string,
  tokens: IServiceTokens,
  api: boolean = false
): Promise<boolean> => {
  try {
    const serviceExists = await entityExists(id, serviceName, Service);
    const tokenExists = await entityExists(id, serviceName, AuthTokens);

    if (!serviceExists) {
      return api
        ? await saveService(id, serviceName, "")
        : await Service.saveService(id, serviceName, "");
    }

    if (!tokenExists) {
      return api
        ? await saveTokens(id, serviceName, tokens)
        : await AuthTokens.saveTokens(id, serviceName, tokens);
    } else {
      return api
        ? await updateTokens(id, serviceName, tokens)
        : await AuthTokens.updateTokens(id, serviceName, tokens);
    }
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Create new tokens and assign them to user
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {IServiceTokens} tokens Tokens that will be saved in database
 * @returns {Promise<boolean>} Success or failure state
 */
export const saveTokens = async (
  id: string,
  serviceName: string,
  tokens: IServiceTokens
): Promise<boolean> => {
  try {
    // There is no need to initialize tokens with empty string or 0 number
    // They are nullable by default when saving without value
    const newTokens = new AuthTokens();
    newTokens.accessToken = tokens.accessToken;
    newTokens.refreshToken = tokens.refreshToken;
    newTokens.expiresIn = tokens.expiresIn;
    newTokens.tokenType = tokens.tokenType;
    newTokens.state = tokens.state;
    newTokens.serviceName = serviceName;
    await newTokens.save();

    await getConnection()
      .createQueryBuilder()
      .relation(User, "tokens")
      .of(id)
      .add(newTokens);

    return true;
  } catch (e) {
    return log(e, false);
  }
};

/**
 * Create new service and assign it to the user
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @param {string} data Everything that need to be stored in database
 * Must be stringified object
 * @returns {Promise<boolean>} Success or failure state
 */
export const saveService = async (
  id: string,
  serviceName: string,
  data: string
): Promise<boolean> => {
  try {
    const newService = new Service();
    newService.serviceName = serviceName;
    newService.data = data;
    await newService.save();

    await getConnection()
      .createQueryBuilder()
      .relation(User, "services")
      .of(id)
      .add(newService);

    return true;
  } catch (e) {
    return log(e, false);
  }
};

/**
 * *-----------------------------------------*
 * *-----------------------------------------*
 * *-----------------------------------------*
 * *----------------**Query**----------------*
 * *-----------------------------------------*
 * *-----------------------------------------*
 * *-----------------------------------------*
 */

/**
 * Return user with given id
 *
 * @param {string} id User id
 * @returns {Promise<User>} User if exists otherwise null
 */
export const getUserById = (id: string): Promise<User> =>
  User.findOneOrFail(id).catch(err => log(err, null));

/**
 * Get user ID by his state key
 * Created for authenticating third party services
 * @param {string} state State key
 * @returns {Promise<string>} User ID
 */
export const getUserIdByStateKey = (state: string): Promise<string> =>
  AuthTokens.findOneOrFail({ where: { state }, loadRelationIds: true })
    .then(res => res.user)
    .catch(log);

/**
 * Get all auth tokens assigned to user
 *
 * @param {string} id User id
 * @returns {(Promise<AuthTokens[] | null>)} Array of auth tokens or null if not found
 */
export const getAuthTokensById = (id: string): Promise<AuthTokens[] | null> =>
  AuthTokens.find({ where: { user: id } })
    .then(res => (res.length > 0 ? res : null))
    .catch(log);

/**
 * Get auth tokens assigned to user id
 *
 * @param {string} id User id
 * @param {string} serviceName service name
 * @returns {Promise<AuthTokens>} Auth tokens or undefined if not found
 */
export const getAuthTokenByName = (
  id: string,
  serviceName: string
): Promise<AuthTokens> =>
  AuthTokens.findOneOrFail({ where: { user: id, serviceName } }).catch(log);

/**
 * Get all services assigned to user
 *
 * @param {string} id User id
 * @returns {Promise<Service[]>} Array of services or null if not found
 */
export const getServiceById = (id: string): Promise<Service[]> =>
  Service.find({ where: { user: id } })
    .then(res => (res.length > 0 ? res : null))
    .catch(log);

/**
 * Get service assigned to user id
 *
 * @param {string} id User id
 * @param {string} serviceName service name
 * @returns {Promise<Service>} Service or undefined if not found
 */
export const getServiceByName = (
  id: string,
  serviceName: string
): Promise<Service> =>
  Service.findOneOrFail({ where: { user: id, serviceName } }).catch(log);

/**
 * Get user state key
 *
 * @param {string} id User id
 * @param {string} serviceName Service name
 * @returns {(Promise<string | undefined>)} state key or undefined if not exists
 */
export const getStateKey = (
  id: string,
  serviceName: string
): Promise<string | undefined> =>
  AuthTokens.findOneOrFail({ where: { user: id, serviceName } })
    .then(key => key.state)
    .catch(log);

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
    .findOneOrFail({ where: { user: id, serviceName } })
    .then(_ => true)
    .catch(err => log(err, false));
