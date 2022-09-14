#!/usr/bin/env node
const docgen = require("vue-docgen-api");
const fs = require("fs");
const path = require("path");
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

function renderComponent(component, template) {
  const data = {
    ...component,
    props: component.props.map((prop) => ({
      ...prop,
      type: {
        ...prop.type,
        name: prop.type.name.replace("|", ", "),
      },
    })),
  };
  return mustache.render(template, data);
}

async function renderComponents(components, outputPath, templatePath) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const template = fs.readFileSync(templatePath, { encoding: "utf-8" });
  const ext = path.extname(templatePath);
  return Promise.all(
    components.map((component) => {
      const name = component.displayName;
      const dest = `${outputPath}/${name}${ext || ""}`;
      const output = renderComponent(component, template);
      return new Promise((resolve, reject) =>
        fs.writeFile(dest, output, (err) => {
          if (err) return reject(err);
          resolve(name);
        })
      );
    })
  );
}

async function main(inputPath, outputPath, templatePath) {
  const components = await parseComponents(inputPath);
  return renderComponents(components, outputPath, templatePath);
}

main(
  argv.i || "src/**/*.vue",
  argv.o || "docs/",
  argv.t || `${__dirname}/templates/template.md`
);
