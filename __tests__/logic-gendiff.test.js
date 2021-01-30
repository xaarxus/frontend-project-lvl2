import { describe, test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('Simple test', () => {
  const expectValue = fs.readFileSync(getFixturePath('result-simple.txt'), 'utf-8');

  test('test simple JSON', () => {
    const filepath1 = getFixturePath('before-simple.json');
    const filepath2 = getFixturePath('after-simple.json');

    expect(genDiff(filepath1, filepath2, { format: 'stylish' })).toEqual(expectValue);
  });
});

describe('Test Stylish', () => {
  const expectValue = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

  test('test Stylish JSON', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectValue);
  });

  test('test Stylish YAML', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectValue);
  });
});

describe('Test Plain', () => {
  const expectValue = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');

  test('test Plain JSON', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectValue);
  });

  test('test Plain YAML', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectValue);
  });
});

describe('Test Json', () => {
  const expectValue = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');

  test('test Json JSON', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectValue);
  });

  test('test Json YAML', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectValue);
  });
});
