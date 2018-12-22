import Config from "#/Config";
import r from "rethinkdb";

const cfg = Config.database;

/**
 * Connect with server and returns promise with active connection
 *
 * @returns {Promise<r.Connection>}
 */
export const DB = (): Promise<r.Connection> =>
  r
    .connect({
      // @TODO: Add automatic mode
      host: process.env.mode === "dev" ? cfg.dev.host : cfg.prod.host,
      port: cfg.port
    })
    .catch(err => Promise.reject(err));

/**
 * Execute query
 *
 * @param {((_: any | Promise<any>) => Promise<ReadonlyArray<any>>)} queryFn
 * @param {{ readonly tableName?: string; readonly db?: string }} [{
 *     tableName = "general",
 *     db = "users"
 *   }={}]
 * @returns
 */
export const query = async (
  queryFn: (_: any | Promise<any>) => Promise<ReadonlyArray<any>>,
  {
    tableName = "general",
    db = "users"
  }: { readonly tableName?: string; readonly db?: string } = {}
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
    return res !== null && "toArray" in res ? res.toArray() : res;
  } catch (e) {
    throw Error(e);
  }
};
