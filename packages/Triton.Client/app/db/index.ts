// @ts-ignore
import idb from "pouchdb-adapter-idb";
import RxDB, { RxDatabase } from "rxdb";

import { UserSchema } from "./Schema";
import { IDashboardDatabaseCollections } from "./Types";
import { UserDocMethods } from "./UserDocMethods";

const DB_NAME = "dashboard_client_database";
const ADAPTER = "idb";
const DB_PASSWORD = "un5Dzx_DxB=5rnkvpdbznd&fh$n2eqm$fCWrdedg";

export const DB = {
  async load(): Promise<RxDatabase<IDashboardDatabaseCollections>> {
    const plugin = RxDB.plugin(idb);
    const db = await RxDB.create<IDashboardDatabaseCollections>({
      name: DB_NAME,
      adapter: ADAPTER,
      password: DB_PASSWORD
    });

    const collection = await db.collection({
      name: "dashboard",
      schema: UserSchema,
      methods: UserDocMethods
    });

    return db;
  }
};
