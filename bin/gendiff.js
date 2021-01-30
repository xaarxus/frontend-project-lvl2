#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

const program = new commander.Command();

const slyles = (str) => {
  if (str === 'plain') {
    return 'plain';
  }
  if (str === 'json') {
    return 'json';
  }
  return 'stylish';
};

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format [stylish, plain, json]', slyles, 'stylish')
  .action((filepath1, filepath2, { format } = 'stylish') => {
    console.log(genDiff(filepath1, filepath2, format));
  })
  .parse(process.argc);
