import { readFileSync } from "fs";
import yaml from "js-yaml";

export const loadConfig = (path: string): any => {
  const file = readFileSync(path, "utf-8");
  return yaml.safeLoad(file);
};
