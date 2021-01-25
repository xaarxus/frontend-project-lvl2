import { describe, test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('Test stylish', () => {
  const expectValue = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

  test('test JSON', () => {
    const filepath1 = getFixturePath('before.json');
    const filepath2 = getFixturePath('after.json');

    expect(genDiff(filepath1, filepath2, { format: 'stylish' })).toEqual(expectValue);
  });

  test('test YAML', () => {
    const filepath1 = getFixturePath('yaml-before.yml');
    const filepath2 = getFixturePath('yaml-after.yml');

    expect(genDiff(filepath1, filepath2, { format: 'stylish' })).toEqual(expectValue);
  });
});
