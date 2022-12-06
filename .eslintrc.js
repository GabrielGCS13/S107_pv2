module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-shadow': 'off',
    'no-param-reassign': 0,
    '@typescript-eslint/no-shadow': 'error',
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-dynamic-require': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
