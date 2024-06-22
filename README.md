# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

<!-- Api information -->

I have integrated the News API successfully into my project, and during development on localhost, the API requests and functionality worked perfectly. However, upon deployment to production, I encountered issues due to News API's pricing restrictions. To circumvent this, I opted for the developer plan offered by News API, which is intended solely for development and testing purposes across various project types. Unfortunately, News API does not permit its use in production environments, restricting its functionality to non-commercial activities and testing phases. This necessitated adjustments in my deployment strategy to accommodate these limitations while ensuring continued functionality and compliance with News API's usage policies.

<!-- Please run the code on localhost -->

<!-- Guide to run the News app- -->

1. bun install or npm install (you can use both)
2. bun dev or npm run dev (you can use both)

<!-- very important point----->

After starting the app on browser it's necessery to allow the location because app want's your location to show the temperature or date of your current location.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
