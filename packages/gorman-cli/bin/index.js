#!/usr/bin/env node

// console.log('hello gorman')

const yargs = require('yargs');
const { inquirerPrompt } = require('./inquirer');

// console.log('name', yargs.argv.name);

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
        })
    }
).argv;