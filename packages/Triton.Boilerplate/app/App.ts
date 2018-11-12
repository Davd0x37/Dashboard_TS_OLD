#!/usr/bin/env node

import { existsSync, mkdirSync } from "fs";
import { writeFileSync } from "jsonfile";
import ncp from "ncp";
import { resolve } from "path";
import prompts from "prompts";
import choiceList from "./choices";
import packageJson from "./package.json";

const root = resolve(".", "app");

const replaceAt = (str: string) =>
  str.includes("@") ? str.replace("@", "") : str;
const strToUpper = (str: string) => str[0].toUpperCase() + str.substr(1);
const createDir = (path: string) => existsSync(path) && mkdirSync(path);
const copyTemplate = (src: string, dist: string) =>
  ncp.ncp(src, dist, (err: Error) => err && console.log(err));
const replacePackage = (path: string, pckg: object) =>
  writeFileSync(path, pckg, { spaces: 2 });

const formatString = (str: string) =>
  str
    .split("/")
    .map(replaceAt)
    .map(strToUpper)
    .join(".");

const createPackage = async (values: prompts.Answers<string>) => {
  const dirName = values.name.includes("/")
    ? formatString(values.name)
    : values.name;
  const genPackage = { ...values, ...packageJson };
  return { dirName, genPackage };
};

const choices = prompts(choiceList)
  .then(createPackage)
  .then(res => ({
    genPackage: res.genPackage,
    path: resolve(process.cwd(), res.dirName)
  }))
  .then(res =>
    Promise.all([
      createDir(res.path),
      copyTemplate(resolve(root, "template"), res.path),
      replacePackage(resolve(res.path, "package.json"), res.genPackage)
    ])
  );
export default choices;
