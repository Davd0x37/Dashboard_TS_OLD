import { readFileSync } from "fs";

export const loadGQLSchema = (path: string): string =>
  readFileSync(path, "utf-8");
