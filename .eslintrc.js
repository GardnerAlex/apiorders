module.exports = {
  "extends": [
  "airbnb",
  "airbnb/hooks",
  "plugin:@typescript-eslint/eslint-recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking"
  // "prettier",
  // "prettier/@typescript-eslint"
],
  "parser": "@typescript-eslint/parser",
  "plugins": [
  "import",
  "no-null",
  "@typescript-eslint"
  // "prettier"
],
  "parserOptions": {
  "ecmaFeatures": {
    "sourceType": "module",
      "allowImportExportEverywhere": false,
      "codeFrame": true,
      "jsx": false
  },
  "project": "./tsconfig.json",
  //   "babelOptions": {
  //   "root": "./packages/front"
  // }
},
  "settings": {
  "import/parsers": {
    "@typescript-eslint/parser": [".ts"]
  },
  "import/resolver": {
    // use <root>/tsconfig.json
    "typescript": {
      "alwaysTryTypes": true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
    },
  // "import/resolver": {
  //   "node": {
  //     "extensions": [
  //       ".js",
  //       // ".jsx",
  //       ".ts",
  //       ".tsx"
  //     ]
  //   }
  }
},
  "rules": {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint//no-dynamic-require": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/class-name-casing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-console": "off",
  // "prettier/prettier": 2,
    // "react/jsx-uses-react": 1,
    // "react/prop-types": 0,
    "linebreak-style": 0,
    "no-shadow": "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": 2,
    "import/no-dynamic-require": "off",
    "import/extensions": "off",
    "import/no-duplicates": "off",
    "implicit-arrow-linebreak": "off",
    "comma-dangle": [
    "error",
    {
      "arrays": "never",
      "objects": "only-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }
  ],
    "no-null/no-null": "off",
    "no-mixed-operators": "off",
    "no-confusing-arrow": "off",
    "no-bitwise": "off",
    "function-paren-newline": "off",
    "object-curly-newline": "off",
    "object-property-newline": "off",
    "arrow-parens": "off",
    "no-underscore-dangle": "off",
  //   "react/jsx-filename-extension": [
  //   1,
  //   {
  //     "extensions": [
  //       ".tsx"
  //     ]
  //   }
  // ],
    "max-len": [
    "error",
    200,
    2,
    {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": false,
      "ignoreTemplateLiterals": false
    }
  ]
},
  "globals": {
  "react": false
},
  "env": {
  "es6": true,
    "browser": false
}
}
