import * as path from 'path';
import * as fs from 'fs';
import * as process from 'process';
import yaml from 'js-yaml';

const parseFile = (filepath, format) => {
  const normalizePath = path.resolve(process.cwd(), filepath);
  if (format === '.json') {
    const data = JSON.parse(fs.readFileSync(normalizePath, 'utf-8'));
    return data;
  }
  const data = yaml.load(fs.readFileSync(normalizePath, 'utf-8'));
  return data;
};

export default parseFile;
