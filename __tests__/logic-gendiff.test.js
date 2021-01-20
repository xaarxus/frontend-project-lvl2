import { test, expect } from '@jest/globals';
import genDiff from '../src/logic-gendiff.js';

test('simple test genDiff', () => {
  const filepath1 = '__tests__/__fixtures__/file1.json';
  const filepath2 = '__tests__/__fixtures__/file2.json';
  const expectValue = '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

  expect(genDiff(filepath1, filepath2)).toEqual(expectValue);
});
