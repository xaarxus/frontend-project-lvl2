import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import _ from 'lodash';

const findingDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const arr = keys1.reduce((acc, key) => {
    if (_.has(data2, key)) {
      if (data2[key] === data1[key]) {
        return `${acc}\n    ${key}: ${data1[key]}`;
      }
      const str1 = `\n  - ${key}: ${data1[key]}`;
      const str2 = `\n  + ${key}: ${data2[key]}`;
      return acc + str1 + str2;
    }
    return `${acc}\n  - ${key}: ${data1[key]}`;
  }, '');

  const result = keys2.reduce((acc, key) => {
    if (_.has(data1, key)) {
      return acc;
    }
    return `${acc}\n  + ${key}: ${data2[key]}`;
  }, arr);

  return result;
};

const genDiff = (filepath1, filepath2) => {
  const normalizePath1 = path.resolve(process.cwd(), filepath1);
  const normalizePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = JSON.parse(fs.readFileSync(normalizePath1));
  const data2 = JSON.parse(fs.readFileSync(normalizePath2));

  const result = findingDifference(data1, data2);

  return `{${result}\n}`;
};

export default genDiff;
