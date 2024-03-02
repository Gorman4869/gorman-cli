const inquirer = require('inquirer');

function inquirerPrompt(argv){
    const {name} = argv;
    return new Promise((resolve,reject)=>{
        inquirer.prompt([
            {
                type:'input',
                name:'name',
                message:'模板名称',
                default:name,
                validate:function(val){
                    if (!/^[a-zA-Z]+$/.test(val)) {
                        return "模板名称只能含有英文";
                      }
                      if (!/^[A-Z]/.test(val)) {
                        return "模板名称首字母必须大写"
                      }
                      return true;
                }
            },
            {
                type: 'list',
                message: '使用什么框架开发',
                choices: ['vue2', 'vue3'],
                name: 'frame',
            },
            {
                
                type: 'confirm',
                name: 'language',
                message: '是否添加TS?',
                default: false,
            }
        ]).then(answers=>{
            const {frame} = answers;
            if(frame === 'vue2'){
                inquirer.prompt([
                    {
                        type: 'list',
                        message: '使用什么UI组件库开发',
                        choices: [
                          'Ant Design Vue',
                          'Element'
                        ],
                        name: 'library',
                    }
                ]).then(answers1 => {
                    resolve({
                      ...answers,
                      ...answers1,
                    })
                  }).catch(error => {
                    reject(error)
                  })
            }

            if (frame === 'vue3') {
                inquirer.prompt([
                  {
                    type: 'list',
                    message: '使用什么UI组件库开发',
                    choices: [ 'Ant Design Vue@4.x','Element'],
                    name: 'library',
                  }
                ]).then(answers2 => {
                  resolve({
                    ...answers,
                    ...answers2,
                  })
                }).catch(error => {
                  reject(error)
                })
              }
        }).catch(error => {
            reject(error)
          })
    })
}
exports.inquirerPrompt = inquirerPrompt;