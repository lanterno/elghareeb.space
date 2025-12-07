import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import qwik from "eslint-plugin-qwik";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript strict type-checked rules
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Perfectionist for import sorting
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          newlinesBetween: "always",
        },
      ],
      "perfectionist/sort-named-imports": ["error", { type: "natural" }],
      "perfectionist/sort-named-exports": ["error", { type: "natural" }],
    },
  },

  // Qwik-specific configuration
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      qwik,
    },
    rules: {
      ...qwik.configs.recommended.rules,
    },
  },

  // Main TypeScript configuration
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "adapters/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Strict TypeScript rules (additional to strictTypeChecked)
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/consistent-type-exports": [
        "error",
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unnecessary-type-parameters": "error",

      // General strict rules
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",

      // Disable base rules that are covered by TypeScript
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },

  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "server/**",
      "tmp/**",
      ".qwik/**",
      "*.config.js",
      "*.config.ts",
    ],
  }
);
