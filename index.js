import * as path from 'path';

import gendiffJSON from './src/logic-gendiff';
import parseFile from './src/parseFile.js';

export default (filepath1, filepath2) => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  const file1 = parseFile(filepath1, format1);
  const file2 = parseFile(filepath2, format2);

  return gendiffJSON(file1, file2);
};
