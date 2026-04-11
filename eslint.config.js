import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: ["dist/**", "node_modules/**"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.ts", "src/**/*.d.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-undef": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "error",
            "sort-vars": "error",
        }
    },
];
