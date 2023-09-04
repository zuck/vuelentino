const tap = require('tap')
const fs = require('fs').promises;
const vuelentino = require('../src/generator')

const outputDir = `${__dirname}/out`

tap.test('some async stuff', async t => {
  await vuelentino(
    "**/*.vue",
    outputDir,
    `${__dirname}/../templates/template.md`
  )

  const output = await fs.readFile(`${outputDir}/Test.md`)

  t.ok(output.includes("# Test"), 'should render the component name as title')
  t.ok(output.includes("> A test component"), 'should render the component short description')
  t.ok(output.includes("With a long description"), 'should render the component long description')
  t.ok(output.includes("| `test` | `string` | A test prop | `\"foo\"` |"), 'should render the component props')
  t.ok(output.includes("| `test` | A test slot |  |"), 'should render the component slots')
  t.ok(output.includes("| `test` | A test event |"), 'should render the component events')
  t.ok(output.includes("### `test(foo, bar)`"), 'should render signatures of the component public methods')
  t.ok(output.includes("A test method"), 'should render description of the component public methods')
  t.ok(output.includes("| `foo` | `(string, boolean)` | A test arg |"), 'should render simple component public method arguments')
  t.ok(output.includes("| `bar` | `string` | Another test arg |"), 'should render complex component public method arguments')
  t.ok(output.includes("`string` A result"), 'should render the component public method return values')
})