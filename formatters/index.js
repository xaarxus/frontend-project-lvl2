import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (data1, data2, formatName) => {
  if (formatName === 'plain') {
    return plain(data1, data2);
  }
  if (formatName === 'json') {
    return json(data1, data2);
  }
  return stylish(data1, data2);
};
