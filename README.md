# vuelentino

Generate docs for Vue components with style

## Installation

```bash
npm install -g vuelentino
```

## Getting started

```bash
# Look for Vue components and generate docs!
vuelentino
```

Vuelentino by default will look for Vue components using the `src/**/*.vue`
glob pattern and will generate the documentation under `docs/` using
a [Markdown template](https://github.com/zuck/vuelentino/blob/main/templates/template.md).

Of course, you can override all default options according to your needs:

```bash
vuelentino -i src/components/*.vue -o docs/components -t template.html
```

## Contribute

If you want, you can also freely donate to fund the project development:

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://paypal.me/EBertoldi)

## Have you found a bug?

Please open a new issue on:

<https://github.com/zuck/vuelentino/issues>

## License

Copyright (c) Emanuele Bertoldi

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
