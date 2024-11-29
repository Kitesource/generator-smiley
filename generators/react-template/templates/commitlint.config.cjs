module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'], // 必填项，代表此次提交的日志信息
    'scope-empty': [0], // 影响范围非必填
    'header-max-length': [0, 'always', 120], // 最大长度
    'type-empty': [2, 'never'], // 提交类型必填
    'type-case': [2, 'always', 'lowerCase'], // 提交类型总是小写
    'type-enum': [
      2, // level: 0-disable, 1-warning, 2-error
      'always', // 应用与否: always | never
      [
        'feat', // 新增功能(feature)
        'fix', // 修复(bug)
        'docs', // 文档更新
        'style', // 代码格式、风格修改(不影响代码运行的变动), 例如去掉空格、改变缩进、增删分号
        'perf', // 性能优化相关 - 更改代码以提高性能
        'test', // 测试相关
        'merge', // 合并分支
        'refactor', // 重构(即不是新增功能，也不是修改bug的代码变动)
        'config' // 配置文件修改
      ]
    ]
  }
}
