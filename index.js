#!/usr/bin/env node
const docgen = require("vue-docgen-api");
const fs = require("fs");
const glob = require("glob");
const mustache = require("mustache");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;

async function parseComponents(inputPath) {
  return new Promise((resolve, reject) => {
    glob(inputPath, function (err, files) {
      if (err) return reject(err);
      resolve(Promise.all(files.map((file) => docgen.parseMulti(file))));
    });
  }).then((res) =>
    res.reduce((components, defs) => components.concat(defs), [])
  );
}

async function renderComponents(components, outputPath, templatePath, ext) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const template = fs.readFileSync(templatePath, { encoding: "utf-8" });
  return Promise.all(
    components.map((component) => {
      const name = component.displayName;
      const dest = `${outputPath}/${name}.${ext}`;
      const output = mustache.render(template, component);
      return new Promise((resolve, reject) =>
        fs.writeFile(dest, output, (err) => {
          if (err) return reject(err);
          resolve(name);
        })
      );
    })
  );
}

async function main(inputPath, outputPath, templatePath, ext) {
  const components = await parseComponents(inputPath);
  return renderComponents(components, outputPath, templatePath, ext);
}

main(
  argv.i || "src/components/*.vue",
  argv.o || "docs/components",
  argv.t || `${__dirname}/templates/template.md`,
  argv.e || "md"
);
