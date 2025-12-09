'use strict'
const Generator = require('yeoman-generator').default || require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // 接收项目名称参数
    this.argument('name', {
      type: String,
      required: false,
      desc: '项目名称',
    })
  }

  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'projectType',
        message: '请选择项目模版:',
        choices: [
          { name: 'React Template', value: 'react-template' },
          { name: 'Vue 2 Template', value: 'vue2-template' },
          { name: 'Vue 3 Template', value: 'vue3-template' },
          { name: 'Vue 3 Admin Template', value: 'vue3-admin-template' },
          { name: 'Vue 3 H5 Template', value: 'vue3-h5-template' },
        ],
      },
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称:',
        default: 'my-project',
        when: () => !this.options.name, // 只有命令行未提供name时才询问
        validate: (input) => {
          if (!input || input.trim() === '') {
            return '项目名称不能为空'
          }

          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return '项目名称只能包含字母、数字、横线和下划线'
          }

          return true
        },
      },
    ]

    return this.prompt(prompts).then((props) => {
      this.props = props
    })
  }

  default() {
    // 根据用户选择组合相应的子生成器
    const { projectType, projectName } = this.props
    // 优先使用命令行参数，其次使用用户输入
    const name = this.options.name || projectName

    // 传递项目名称参数给子生成器
    const opts = name ? { name } : {}

    this.composeWith(
      {
        Generator: require(`./${projectType}`),
        path: require.resolve(`./${projectType}`),
      },
      opts,
    )
  }
}
