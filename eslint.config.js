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
      "qwik/loader-location": ["warn", { routesDir: "src/app/routes" }],
    },
  },

  // Main TypeScript configuration
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "worker/**/*.ts"],
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

  /*
   * Architecture boundaries (see docs/ARCHITECTURE.md):
   *   platform  → nothing above it
   *   modules   → platform, and other modules only through their public API (~/modules/<name>)
   *   app       → everything, through public APIs
   *   routes    → re-export lines only
   */
  {
    files: ["src/platform/**/*.ts", "src/platform/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^~/(modules|app)(/|$)",
              message: "platform/ must not know about modules/ or app/.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/modules/**/*.ts", "src/modules/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^~/app(/|$)",
              message: "modules/ must not depend on app/.",
            },
            {
              regex: "^~/modules/[^/]+/.+",
              message:
                "Import another module through its public API (~/modules/<name>); use relative paths inside your own.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/**/*.ts", "src/app/**/*.tsx", "src/root.tsx", "src/entry.ssr.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^~/modules/[^/]+/.+",
              message: "Import a module through its public API (~/modules/<name>).",
            },
          ],
        },
      ],
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
