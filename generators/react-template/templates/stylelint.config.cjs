module.exports = {
  extends: ['stylelint-config-prettier', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  // 对特定的文件做一些不同配置
  overrides: [
    // 项目中存在scss和css文件，添加以下配置, 否则会报错误
    {
      files: ['**/*.scss', '**/*.css'],
      extends: ['stylelint-config-standard-scss'],
    },
  ],
  // 覆盖配置（优先级大）值为null  => 关闭该规则
  rules: {
    // 解决不能引入.scss后缀文件https://github.com/stylelint-scss/stylelint-config-recommended-scss/blob/master/index.js
    'scss/at-import-partial-extension': null,
    // 禁止未知的@规则
    'scss/at-rule-no-unknown': null,
    // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
    'rule-empty-line-before': 'never',
  },
};
