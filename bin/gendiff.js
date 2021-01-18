#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/logic-gendiff.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .parse(process.argc);
