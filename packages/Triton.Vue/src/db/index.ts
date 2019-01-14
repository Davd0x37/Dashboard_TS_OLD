// @ts-ignore
import idb from "pouchdb-adapter-idb";
import RxDB, { RxDatabase } from "rxdb";

import { UserSchema } from "./Schema";
import { IDashboardDatabaseCollections } from "./Types";
import { UserDocMethods } from "./UserDocMethods";


// @TODO: Change password encryption to user password
const DB_NAME = "dashboard_client_database";
const ADAPTER = "idb";
const DB_PASSWORD =
  "1%U_h6^~U7gtjz<lEK9,+hcEK1z0$&=3O>Fz]:l{b8*UL<NLbohK?,WK{5lbku)=aZIV#KUFdfd12THoz=q&CN-2@D?<ZZ~~E_[/";

export const DB = {
  async load(): Promise<RxDatabase<IDashboardDatabaseCollections>> {
    RxDB.plugin(idb);
    const db = await RxDB.create<IDashboardDatabaseCollections>({
      name: DB_NAME,
      adapter: ADAPTER,
      password: DB_PASSWORD
    });
    await db.waitForLeadership();

    await db.collection({
      name: "dashboard",
      schema: UserSchema,
      methods: UserDocMethods
    });

    return db;
  }
};
