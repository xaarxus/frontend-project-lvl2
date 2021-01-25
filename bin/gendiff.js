#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

const program = new commander.Command();

const slyles = (str) => {
  if (str === 'plain') {
    return 'plain';
  }
  return 'stylish';
};

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format [stylish, plain]', slyles, 'stylish')
  .action((filepath1, filepath2, formatName) => {
    console.log(genDiff(filepath1, filepath2, formatName));
  })
  .parse(process.argc);
