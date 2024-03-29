// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2021,
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/vue3-essential',
    // https://github.com/airbnb/javascript/blob/master/README.md
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  ignorePatterns: ['src/l10n/**'],
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': ['error', 'as-needed', { "requireForBlockBody": true }],
    'no-underscore-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-nested-ternary': 'off',
    'indent': ['error', 2, { 'flatTernaryExpressions': true }],
    'vue/script-setup-uses-vars': 'off',
    'camelcase': 'off',
    'no-warning-comments': 'warn',
  },
  overrides: [
    {
      files: ['packages/**/*.test.js'],
      env: {
        mocha: true,
        jest: true, // for `expect` global
      },
    },
    {
      files: ['packages/**'],
      rules: {
        'import/extensions': 'off',
        'no-param-reassign': 'off',
      }
    },
  ],
}
