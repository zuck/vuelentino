const docgen = require("vue-docgen-api");
const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const mustache = require("mustache");

async function parseComponents(inputPath) {
  return glob(inputPath)
    .then((files) => Promise.all(files.map((file) => docgen.parseMulti(file))))
    .then((res) =>
        res.reduce((components, defs) => components.concat(defs), [])
    );
}

function renderComponent(component, template) {
  const data = {
    ...component,
    props: (component.props || []).map((prop) => ({
      ...prop,
      type: {
        ...prop.type,
        name: prop.type.name.replace("|", ", "),
      },
    })),
    methods: (component.methods || []).map((method) => ({
      ...method,
      returns:
        method.returns ||
        (method.tags.return || []).map((ret) => {
          const [type, description] = ret.description.split("} ");
          return {
            description,
            type: {
              name: type.replace("{", ""),
            },
          };
        }),
      args: (method.params || []).map((param) => param.name).join(", "),
      params: (method.params || []).map((param) => ({
        name: param.name,
        description: param.description,
        type: (param.type?.elements || [param.type]).map((type) => type.name).join(", "),
      })),
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

module.exports = async function generate(inputPath, outputPath, templatePath) {
  const components = await parseComponents(inputPath);
  return renderComponents(components, outputPath, templatePath);
}
