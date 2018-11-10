#!/usr/bin/env node
import program from "commander";
import bundler from "./bundler";

program
  .version("0.1.0")
  .option("-c, --config [string]", "Add config")
  .option("-d, --dev [bool]", "Use dev mode", false)
  .action(bundler)
  .parse(process.argv);
