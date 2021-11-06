# VoxSmart Component Library

This repo is for the VoxSmart component library.

This component library is built using [Fractal](https://fractal.build/).

## Requirements

You'll need a [supported LTS version](https://github.com/nodejs/Release) of Node. Fractal may work on unsupported versions, but there is no active support from Fractal and new features may not be backwards compatible with EOL versions of Node.

This component library utilizes the following dependecies.

- [Node.js](https://nodejs.org/en/)
- [Fractal](https://fractal.build/)
- [Yarn](https://yarnpkg.com/)

## Getting started

### Install into your project (recommended)

```shell
npm install @frctl/fractal --save-dev
```

Then create your `fractal.config.js` file in the project root, and configure using the [official documentation][docs].

Then you can either run `npx fractal start` to start up the project, or create an alias under the `scripts` section in your package.json as a shortcut.

e.g.

```json
"scripts": {
    "fractal:start": "fractal start --sync",
    "fractal:build": "fractal build"
}
```

then

```shell
npm run fractal:start
```

### Installing globally

```shell
npm i -g @frctl/fractal
```

This will also give you global access to the `fractal` command which you can use to scaffold a new Fractal project with `fractal new`.

The downside is that it's then difficult to use different Fractal versions on different projects.
