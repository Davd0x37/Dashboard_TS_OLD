import { createConnection, getConnectionOptions } from "typeorm";

export const igniteConnection = async (name?: string) => {
  const connectionOptions = await getConnectionOptions(
    name || process.env.NODE_ENV
  );
  // If we want name other than `default` then in every entity/repository
  // we must change name of selected connection.

  return createConnection({ ...connectionOptions, name: "default" });
};
