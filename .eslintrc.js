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
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "ignorePatterns": ['**/*.eslintrc.js'],
  "rules": {
    "semi": [1, "never"],
    "no-multi-spaces": "error",
    "quotes": [2, "single"]
  }
}
