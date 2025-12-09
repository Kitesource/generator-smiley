module.exports = {
  printWidth: 120,
  tabWidth: 2,
  semi: false, // 不加分号,
  singleQuote: true, // 使用单引号
  trailingComma: 'all', // 多行时，最后一行加逗号
  proseWrap: 'never', // 不折行
  endOfLine: 'auto', // 自动换行
  overrides: [
    {
      files: '.*rc',
      options: {
        parser: 'json',
      },
    },
  ],
}
