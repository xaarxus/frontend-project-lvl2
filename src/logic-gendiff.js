import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const genDiff = (data1, data2, formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plain(data1, data2);
  }
  return stylish(data1, data2);
};

export default genDiff;
