# `santospatrick/nextjs-boilerplate-advanced`
> Next.js boilerplate made with Chakra-UI + Typescript + React-table + React-hook-form

[![Netlify Status](https://api.netlify.com/api/v1/badges/0e6e63e0-f1fe-44f0-baf2-253db63e4d79/deploy-status)](https://app.netlify.com/sites/sample-nextjs-app/deploys)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=flat&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=flat&logo=prettier&logoColor=F7BA3E)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
<a href="https://github.com/storybooks/storybook" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>
![vscode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white)

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=125ecf6a44b8&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=santospatrick_nextjs-boilerplate-advanced)

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

## Deployment

- Run the following commands:
```bash
yarn build # this command will fail if there is any Typescript or Lint errors
yarn start
```

- Or, deploy on [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/) (don't forget about environment variables):

| Netlify | Vercel |
|---------|--------|
| [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/santospatrick/nextjs-boilerplate-advanced) | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/santospatrick/nextjs-boilerplate-advanced) |

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

### Contributors

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/santospatrick>
            <img src=https://avatars.githubusercontent.com/u/13510169?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Patrick Santos/>
            <br />
            <sub style="font-size:14px"><b>Patrick Santos</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/lincolncosta>
            <img src=https://avatars.githubusercontent.com/u/26147019?v=4 width="100;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Lincoln M. Costa/>
            <br />
            <sub style="font-size:14px"><b>Lincoln M. Costa</b></sub>
        </a>
    </td>
</tr>
</table>
