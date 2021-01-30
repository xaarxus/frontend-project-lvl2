import { describe, test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('Stylish formater', () => {
  const expectValue = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

  test('Stylish .json', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectValue);
  });

  test('Stylish .yaml', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectValue);
  });
});

describe('Plain formater', () => {
  const expectValue = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');

  test('Plain .json', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectValue);
  });

  test('Plain .yaml', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectValue);
  });
});

describe('Json formater', () => {
  const expectValue = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');

  test('Json .json', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectValue);
  });

  test('Json .yaml', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectValue);
  });
});
