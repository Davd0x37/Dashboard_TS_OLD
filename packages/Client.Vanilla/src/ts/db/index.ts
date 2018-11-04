// @ts-ignore
// import http from "pouchdb-adapter-http";
import idb from "pouchdb-adapter-idb";
import RxDB, { RxDatabase } from "rxdb";

import { IDashboardDatabaseCollections, UserSchema } from "./Schema";
import { UserDocMethods } from "./UserDocMethods";

const DB_NAME = "dashboard_client_database";
const ADAPTER = "idb";
const DB_PASSWORD = "un5Dzx_DxB=5rnkvpdbznd&fh$n2eqm$fCWrdedg";

export const DB = {
  async load(): Promise<RxDatabase<IDashboardDatabaseCollections>> {
    RxDB.plugin(idb);
    // RxDB.plugin(http);
    const db = await RxDB.create<IDashboardDatabaseCollections>({
      name: DB_NAME,
      adapter: ADAPTER,
      password: DB_PASSWORD
    });

    await db.collection({
      name: "dashboard",
      schema: UserSchema,
      methods: UserDocMethods
    });

    return db;
  }
};

// export const DB = {
//   load: async () => {
//     // const replication = await DashboardCollection.sync({
//     //   remote: "http://localhost:5984/dashboard",
//     //   waitForLeadership: true,
//     //   direction: {
//     //     pull: true,
//     //     push: true
//     //   },
//     //   options: {
//     //     live: true,
//     //     retry: true
//     //   }
//     // });
//     // replication.change$.subscribe(async e => {
//     // });
//   }
// };
