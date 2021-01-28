import * as path from 'path';
import parseFile from './src/parsers.js';
import fabricFotmatters from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  const file1 = parseFile(filepath1, format1);
  const file2 = parseFile(filepath2, format2);

  return fabricFotmatters(file1, file2, format);
};
