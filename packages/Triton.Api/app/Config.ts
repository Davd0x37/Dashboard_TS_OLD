import { resolve } from "path";
import { loadConfig } from "./utils/fs";

export default loadConfig(resolve("./config.yml"));
