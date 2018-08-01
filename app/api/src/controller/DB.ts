import * as r from "rethinkdb";
import * as log from "signale";

/**
 * Connect with server and returns promise with active connection
 *
 * @returns [Promise] active connection
 */
export const DB = async () => {
  return r.connect({
    host: "localhost",
    port: 28015
  });
};

/**
 * Create tables in database
 *
 */
export const createDB = async () => {
  try {
    const db = await DB();

    r.dbCreate("users")
      .run(db)
      .catch(err => log.error(err));
    r.db("users")
      .tableCreate("general")
      .run(db)
      .catch(err => log.error(err));
    r.db("users")
      .tableCreate("post")
      .run(db)
      .catch(err => log.error(err));
    r.db("users")
      .tableCreate("gallery")
      .run(db)
      .catch(err => log.error(err));
    r.db("users")
      .tableCreate("notes")
      .run(db)
      .catch(err => log.error(err));
  } catch (error) {
    log.error(error);
  }
};
