import stylish from './stylish.js';
import plain from './plain.js';

export default (data1, data2, formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plain(data1, data2);
  }
  return stylish(data1, data2);
};
