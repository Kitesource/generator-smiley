'use strict'
const Generator = require('yeoman-generator').default || require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', {
      type: String,
      required: false,
      desc: '项目名称/Project Name',
    })
    // 项目根目录
    this.destinationRoot(this.options.name || '')
  }

  getTemplateData() {
    return Object.assign(this.props, {
      name: this.options.name,
    })
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the wicked ${chalk.red('generator-smiley')} generator!`))

    const prompts = [
      {
        type: 'list',
        name: 'packagesManager',
        message: '包管理器',
        default: 'yarn',
        choices: [
          {
            value: 'npm',
            name: 'NPM',
          },
          {
            value: 'yarn',
            name: 'Yarn',
          },
        ],
      },
    ]

    return this.prompt(prompts).then((props) => {
      this.props = props
    })
  }

  writing() {
    /** 全量渲染模板文件 */
    const templateData = this.getTemplateData()
    this.renderTemplate('**/*', this.destinationRoot(), templateData)
    this.renderTemplate('**/.*', this.destinationRoot(), templateData)
  }

  install() {
    try {
      switch (this.props.packagesManager) {
        case 'yarn':
          this.spawnCommandSync('yarn')
          break
        case 'npm':
          this.spawnCommandSync('npm', ['i'])
          break
        default:
          this.spawnCommandSync('yarn')
          break
      }
    } catch (e) {
      console.log('check error:', e)
    }
  }

  end() {
    const { packagesManager: manager, name } = this.props
    const runCommmand = `${manager} ${manager === 'npm' ? 'run' : ''} serve`
    this.log(
      yosay(
        `🎉 Successfully created project ${chalk.blue(name)}.
        👉  Get started with the following commands:
        ${chalk.blue(name ? `cd ${name}` : 'current directory')}
        ${chalk.blue(runCommmand)}`,
      ),
    )
  }
}
