# f2e-2021

This is a monorepo containing all work related to [2021 F2E challenge](https://2021.thef2e.com/).

Special thanks to

- [hexschool](https://www.hexschool.com) team for designing user stories
- UI mockups contributed by various designers under [CC BY-NC 3.0 TW](https://creativecommons.org/licenses/by-nc/3.0/tw/deed.en) license
- open data powered by [Public Transport data eXchange](https://ptx.transportdata.tw/PTX/) (PTX).

## Introduction

This repository has been bootstrapped by [nextjs-template](https://github.com/Howard86/nextjs-template) and managed by [lerna](https://lerna.js.org) in the following folder structure

- `/apps` - this contains all published applications on [Vercel Platform](https://vercel.com)
  - [scene](https://taiwan-scene.howardism.dev) - exploring taiwan places of interest, designer [Hanali](https://www.behance.net/cfc5cf51)
  - [ubike](https://ubike.howardism.dev) - getting nearest [YouBike](https://ntpc.youbike.com.tw/home) and search for cycle paths, designer [Viola](https://www.linkedin.com/in/violaleeee)
  - [bus](https://bus.howardism.dev) - getting taiwan bus info in real time! Designer [Hanali](https://www.behance.net/cfc5cf51)
- `/libs` - this contains all shared internal libraries, e.g. `ptx` services to connect to PTX api

### Apps folder structure

- public - all static assets publicly available under `/{fileName}.{fileExtension}`
- src
  - pages - next.js page folder with built-in route support
  - components - store all individual components
  - constants - shared fixed values for components
  - hooks - some utility hooks to encapsulate logic
  - redux - redux store with redux toolkit and support RTK query
  - services - business logic about api calls & mapbox
  - utils - some custom utils to save some space when working on components
  - theme - following Chakra UI theme structure
  - types - extra type folder to add global or 3rd party types

### 3rd party libraries

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/): a client-side JavaScript library for building web maps and web applications with Mapbox's modern mapping technology

## Getting Started

Current running local environment:

- OS: [macOS Monterey 12.0.1](https://www.apple.com/macos/monterey/) Apple chip or [Ubuntu 20.04.2 LTS](https://ubuntu.com)
- [Node.js](https://nodejs.org/en/): v14.18.1
- [Yarn](https://yarnpkg.com): v1.22.17

Checkout to individual `apps` folder, copy required environmental variables in `.env.sample` into `.env.local` and update required fields

e.g. for `bus`

```bash
cd apps/bus

cp .env.sample .env.local
vi .env.local # update required fields and save

yarn # this will build libs if required
yarn dev
```

You should be able to visit [localhost:3000](http://localhost:3000) to view the application successfully

## Dependencies

This project will mainly follow the dependencies of [nextjs-template](https://github.com/Howard86/nextjs-template), while installing individual tools specific for each `apps` or `libs`

### Common dependencies

1. [Chakra UI](https://chakra-ui.com)
2. [Emotion](https://emotion.sh)
3. [Framer Motion](https://www.framer.com/motion/)
4. [Redux Toolkit](https://redux-toolkit.js.org)
5. [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
6. [next-api-handler](https://github.com/Howard86/next-api-handler)
7. [next-head-seo](https://github.com/catnose99/next-head-seo)

### Development dependencies

1. [TypeScript](https://www.typescriptlang.org/)
2. [ESLint](https://eslint.org/) with [Airbnb config](https://github.com/iamturns/eslint-config-airbnb-typescript)
3. [Prettier](https://prettier.io/)
4. Pre-commit & pre-push git hooks powered by [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://typicode.github.io/husky/#/)
5. [Commitlint](https://commitlint.js.org/#/)
6. [Lerna](https://lerna.js.org)

## Deployment

All apps will be deployed on [Vercel](https://vercel.com) with a custom subdomain under `howardism.dev`

## License

All rights reserved.
