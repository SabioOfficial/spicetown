// why tf was i trying to import shit out of thin air

export default [
  {
    languageOptions: {
      sourceType: "module",
      globals: {
        chrome: "readonly",
        browser: "readonly",
        window: "readonly",
        document: "readonly",
        console: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
        navigator: "readonly",
        location: "readonly",
        DOMParser: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];