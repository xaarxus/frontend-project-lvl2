import { describe, test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('simple tests', () => {
  const expectValue = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

  test('simple test genDiff with JSON files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(genDiff(filepath1, filepath2)).toEqual(expectValue);
  });

  test('simple test genDiff with YAML files', () => {
    const filepath1 = getFixturePath('yaml-file1.yml');
    const filepath2 = getFixturePath('yaml-file2.yml');

    expect(genDiff(filepath1, filepath2)).toEqual(expectValue);
  });

  test('simple test genDiff between JSON and YAML', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('yaml-file2.yml');

    expect(genDiff(filepath1, filepath2)).toEqual(expectValue);
  });
});
