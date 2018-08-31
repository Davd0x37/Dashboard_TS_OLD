import r from "rethinkdb";
import log from "signale";

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
 * Execute query
 *
 * @param {((_: any | Promise<any>) => any[] | Promise<any[]>)} queryFn
 * @param {{ tableName?: string; db?: string }} [{
 *     tableName = "general",
 *     db = "users"
 *   }={}]
 * @returns
 */
export const query = async (
  queryFn: (_: any | Promise<any>) => any[] | Promise<any[]>,
  { tableName = "general", db = "users" }: { tableName?: string; db?: string } = {}
) => {
  try {
    // Get table
    const req: any = await r.db(db).table(tableName);
    // Get query sequence
    const cb: any = await queryFn(req);
    // Run sequence
    const res = await cb.run(await DB());
    // If sequence has property "toArray" then return it as array instead of object
    // otherwise return object
    if ("toArray" in res) {
      return res.toArray();
    } else {
      return res;
    }
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
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
  } catch (error) {
    log.error(error);
  }
};
