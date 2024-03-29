const path = require('path');
const { exec } = require('child_process');
const ora = require("ora");
const LibraryMap = {
  'Ant Design': 'antd',
  'iView': 'view-ui-plus',
  'Ant Design Vue@4.x': 'ant-design-vue@4.x',
  'Ant Design Vue': 'ant-design-vue',
  'Element': 'element-plus',
}
const FrameMap = {
    'vue2': 'vue@2',
    'vue3': 'vue@next',
}

function install(cmdPath, options) {
  const { frame, library,language } = options;
  let command = `pnpm add ${FrameMap[frame]} && pnpm add ${LibraryMap[library]}`
  if(language){
    command += ` && pnpm add typescript @vue/cli-plugin-typescript`
  }
  return new Promise(function (resolve, reject) {
    const spinner = ora();
    spinner.start(
      `正在安装依赖，请稍等`
    );
    exec(
      command,
      {
        cwd: path.resolve(cmdPath),
      },
      function (error, stdout, stderr) {
        console.log('error', error);
        console.log('stdout', stdout);
        console.log('stderr', stderr)
        if (error) {
            reject();
            spinner.fail(`依赖安装失败`);
            return;
          }
          spinner.succeed(`依赖安装成功`);
          resolve()
      }
    )
  })
}

exports.install = install;
