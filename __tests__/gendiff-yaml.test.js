import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('simple test genDiff with YAML files', () => {
  const filepath1 = getFixturePath('yaml-file1.yml');
  const filepath2 = getFixturePath('yaml-file2.yml');
  const expectValue = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

  expect(genDiff(filepath1, filepath2)).toEqual(expectValue);
});
