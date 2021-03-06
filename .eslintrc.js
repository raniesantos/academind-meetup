// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': 'error',
    'generator-star-spacing': 0,
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': true }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
