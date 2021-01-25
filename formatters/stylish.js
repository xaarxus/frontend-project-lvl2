import _ from 'lodash';

const stylish = (data1, data2) => {
  const mergeObject = _.merge({}, data1, data2);

  const ObjToString = (object, deepObj) => {
    const keys = _.keys(object);
    const result = keys.reduce((acc, key) => {
      if (_.isObject(object[key])) {
        return `${acc}\n${'  '.repeat(deepObj)}  ${key}: ${ObjToString(object[key], deepObj + 2)}`;
      }
      const str = `\n${'  '.repeat(deepObj)}  ${key}: ${object[key]}`;
      return acc + str;
    }, '');

    return `{${result}\n${'  '.repeat(deepObj - 1)}}`;
  };

  const searchDiffInObject = (obj, path = [], deep = 1) => {
    const keys = _.keys(obj).sort();
    const toString = keys.reduce((acc, key) => {
      const newPath = [...path, key];
      const first = _.get(data1, newPath, undefined);
      const second = _.get(data2, newPath, undefined);

      if (_.isObject(obj[key])) {
        if (second === undefined) {
          const str = `\n${'  '.repeat(deep)}- ${key}: ${ObjToString(obj[key], deep + 2)}`;
          return acc + str;
        }
        if (first === undefined) {
          return `${acc}\n${'  '.repeat(deep)}+ ${key}: ${ObjToString(obj[key], deep + 2)}`;
        }
        const str = `\n${'  '.repeat(deep)}  ${key}: ${searchDiffInObject(obj[key], newPath, deep + 2)}`;
        return acc + str;
      }

      if (first !== undefined && second !== undefined) {
        if (first === second) {
          const str = `\n${'  '.repeat(deep)}  ${key}: ${second}`;
          return acc + str;
        }
        if (_.isObject(first)) {
          const str1 = `\n${'  '.repeat(deep)}- ${key}: ${ObjToString(first, deep + 2)}`;
          const str2 = `\n${'  '.repeat(deep)}+ ${key}: ${second}`;
          return acc + str1 + str2;
        }
        if (_.isObject(second)) {
          const str1 = `\n${'  '.repeat(deep)}- ${key}: ${first}`;
          const str2 = `\n${'  '.repeat(deep)}+ ${key}: ${ObjToString(second, deep + 2)}`;
          return acc + str1 + str2;
        }
        const str1 = `\n${'  '.repeat(deep)}- ${key}: ${first}`;
        const str2 = `\n${'  '.repeat(deep)}+ ${key}: ${second}`;
        return acc + str1 + str2;
      }
      if (second === undefined) {
        const str = `\n${'  '.repeat(deep)}- ${key}: ${first}`;
        return acc + str;
      }
      if (first === undefined) {
        const str = `\n${'  '.repeat(deep)}+ ${key}: ${second}`;
        return acc + str;
      }
      return acc;
    }, '');

    return `{${toString}\n${'  '.repeat(deep - 1)}}`;
  };

  const result = searchDiffInObject(mergeObject);
  return result;
};

export default stylish;
