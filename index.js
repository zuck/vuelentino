#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const vuelentino = require("src/generator")

const argv = yargs(hideBin(process.argv)).argv;

vuelentino(
  argv.i || "src/**/*.vue",
  argv.o || "docs/",
  argv.t || `${__dirname}/templates/template.md`
);
