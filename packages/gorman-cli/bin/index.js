#!/usr/bin/env node

// console.log('hello gorman')

const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');
const path = require('path');
const { copyDir, checkMkdirExists,copyTemplate} = require('./copy');
const { install } = require('./manage')

yargs.command(
    ['create','c'],
    '新建vue3模板',
    function(yargs){
        return yargs.option('name',{
            alias:'n',
            demand:true,
            describe:'模板名称',
            type:'string'
        })
    },
    function(argv){
        inquirerPrompt(argv).then(answers =>{
            console.log(answers)
            const {name, type} = answers;
            const isMkdirExists = checkMkdirExists(
                // path.resolve(process.cwd(),`./src/pages/${name}`)
                path.resolve(process.cwd(),`./src/pages/${name}/index.js`)
            );
            
            if(isMkdirExists){
                // console.log(`${name}文件夹已存在`)
                console.log(`${name}文件已存在`)
                install(process.cwd(), answers);
            }else{
                // copyDir(
                //     path.resolve(__dirname,`./template`),
                //     path.resolve(process.cwd(),`./src/pages/${name}`)
                // )
                copyTemplate(
                    path.resolve(__dirname, `./template/index.tpl`),
                    path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
                    {
                      name,
                    }
                )
                install(process.cwd(), answers);
            }
        })
    }
).argv;