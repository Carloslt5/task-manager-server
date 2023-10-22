module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "standard-with-typescript",
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "project": ["./**/tsconfig.json"],
    "sourceType": "module",
  },
  "ignorePatterns": [
    "**/*.eslintrc.js"
  ],
  "rules": {
    "semi": [1, "never"],
    "no-multi-spaces": "error",
    "quotes": [2, "single"],
    "@/typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "@/typescript-eslint/space-before-function-paren": "off"

  }
}