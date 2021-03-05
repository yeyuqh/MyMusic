module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],

  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // TypeScript
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': [2, { vars: 'all', args: 'none' }],
    '@typescript-eslint/camelcase': [0, { properties: 'always' }],
    '@typescript-eslint/interface-name-prefix': [0, { prefixWithI: 'always' }],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
