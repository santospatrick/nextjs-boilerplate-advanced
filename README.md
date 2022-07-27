# `santospatrick/nextjs-boilerplate-advanced`
> Next.js boilerplate made with Chakra-UI + Typescript + React-table + React-hook-form

[![Netlify Status](https://api.netlify.com/api/v1/badges/0e6e63e0-f1fe-44f0-baf2-253db63e4d79/deploy-status)](https://app.netlify.com/sites/sample-nextjs-app/deploys)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=flat&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=flat&logo=prettier&logoColor=F7BA3E)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![vscode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white)

- [Live Demo](https://sample-nextjs-app.santospatrick.com)
- [Storybook Demo](https://main--62e089a345749171c6216585.chromatic.com)

<img src="docs/preview.gif" width="576" />

## Usage

1. Initialize your project with this command:

```bash
yarn create next-app -e https://github.com/santospatrick/nextjs-boilerplate-advanced
```

2. Duplicate `.env.example` to `.env.local` fulfilling variables as needed
```bash
cp .env.example .env.local
```

3. Run the following commands:
```bash
yarn install
yarn dev # start development server
```

4. Done 🎉

## Instructions
> How to get the most out of this boilerplate 🚀

[![Slides.com template presentation](docs/slides.png)](https://slides.com/santospatrick/nextjs-chakraui-typescript)

## Features

### `v1`
- [x] Authentication screens pre-built
- [x] Server side rendering
- [x] Forms (compatible with `react-hook-form`)
  - [x] Text Input (masked/normalized)
  - [x] Date Input
  - [x] Upload Input
  - [x] Autocomplete/Select Input
  - [x] Number Input
  - [x] Phone Input
  - [x] Textarea Input
  - [x] Schema validation with `yup`
- [x] Data table with inline editing
- [x] Layouts
- [x] CRUD example
- [x] Modal with fullscreen option
- [x] Email templates for authentication flow
- [x] VSCode workspace recommendations
- [x] Profile page for user editing
- [x] Collapsable & nested menu
- [x] Code Generator (component, form, and page)
- [X] VSCode debug setup

### `v2`
- [ ] Advanced filter for data tables (like Notion)
- [ ] Form builder

## Technologies
- [x] Next.js
- [x] Typescript
- [x] Chakra UI
- [x] Next SEO
- [x] React Table
- [x] Eslint/Prettier
- [x] React Toastify
- [x] React Query
- [x] React Hook Form
- [x] NProgress
- [x] Git hooks
- [x] Perfect scrollbar
- [x] Mjml
- [x] useHooks Typescript
- [x] Utility Types
- [x] Storybook
- [x] Plop (Template Generator)

## Storybook

In order to see storybook, run development server with following command:

```bash
yarn install # if you didn't yet :)
yarn storybook # start server at http://localhost:6006
```
