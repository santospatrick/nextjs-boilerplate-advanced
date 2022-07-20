module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "New reusable component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter your component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/component/stories.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("form", {
    description: "New reusable form",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter your form name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/forms/{{pascalCase name}}Form/{{pascalCase name}}Form.tsx",
        templateFile: "templates/form/component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/forms/{{pascalCase name}}Form/index.ts",
        templateFile: "templates/form/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/forms/{{pascalCase name}}Form/schema.ts",
        templateFile: "templates/form/schema.ts.hbs",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "New page with layout",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter your page name (which will also be the url):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/pages/{{kebabCase name}}.tsx",
        templateFile: "templates/page/component.tsx.hbs",
      },
    ],
  });
};
