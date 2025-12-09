"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // 接收项目名称参数
    this.argument("name", {
      type: String,
      required: false,
      desc: "项目名称"
    });
  }

  prompting() {
    const prompts = [
      {
        type: "list",
        name: "projectType",
        message: "请选择项目模版:",
        choices: [
          { name: "React Template", value: "react-template" },
          { name: "Vue 2 Template", value: "vue2-template" },
          { name: "Vue 3 Template", value: "vue3-template" },
          { name: "Vue 3 Admin Template", value: "vue3-admin-template" },
          { name: "Vue 3 H5 Template", value: "vue3-h5-template" }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    // 根据用户选择组合相应的子生成器
    const { projectType } = this.props;
    const name = this.options.name;

    // 传递项目名称参数给子生成器
    const opts = name ? { name } : {};

    this.composeWith(
      {
        Generator: require(`./${projectType}`),
        path: require.resolve(`./${projectType}`)
      },
      opts
    );
  }
};
