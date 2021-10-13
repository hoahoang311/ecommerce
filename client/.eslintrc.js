module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
    'jest',
    'import',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 0,
    'no-console': 'warn',
    quotes: [1, 'single', {avoidEscape: true}],
    'react/prefer-stateless-function': [0, {ignorePureComponents: true}],
    'react/require-default-props': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'function-paren-newline': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/no-array-index-key': 0,
    'import/no-extraneous-dependencies': 0,
    'no-plusplus': 0,
    'global-require': 0,
    'object-curly-newline': 0,
    'max-len': 0,
    'linebreak-style': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-has-content': 0,
    'class-methods-use-this': 0,
    'react/jsx-no-bind': 0,
    'no-unused-expressions': 0,
    'react/sort-comp': 0,
    'react/jsx-no-target-blank': 0,
    'object-shorthand': 0,
    'arrow-body-style': 0,
    'jsx-quotes': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    camelcase: [
      'warn',
      {
        allow: ['UNSAFE_componentWillReceiveProps'],
      },
    ],
    'import/namespace': 0,
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'parent',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}