import _ from 'lodash';

const plain = (data1, data2) => {
  const mergeObject = _.merge({}, data1, data2);

  const searchDiffInObject = (obj, path = []) => {
    const keys = _.keys(obj).sort();

    const toString = keys.reduce((acc, key) => {
      const newPath = [...path, key];
      const first = _.get(data1, newPath, undefined);
      const second = _.get(data2, newPath, undefined);

      if (second === undefined) {
        const str = `Property '${newPath.join('.')}' was removed`;
        const newAcc = [...acc, str];
        return newAcc;
      }
      if (first === undefined) {
        if (_.isObject(second)) {
          const str = `Property '${newPath.join('.')}' was added with value: [complex value]`;
          const newAcc = [...acc, str];
          return newAcc;
        }
        const value = typeof second === 'string' ? `'${second}'` : `${second}`;
        const str = `Property '${newPath.join('.')}' was added with value: ${value}`;
        const newAcc = [...acc, str];
        return newAcc;
      }
      if (_.isObject(obj[key])) {
        const str = searchDiffInObject(obj[key], newPath);
        const newAcc = [...acc, ...str];
        return newAcc;
      }
      if (second !== undefined && first !== undefined) {
        if (first === second) {
          return acc;
        }
        if (_.isObject(second)) {
          const value = typeof first === 'string' ? `'${first}'` : `${first}`;
          const str = `Property '${newPath.join('.')}' was updated. From ${value} to [complex value]`;
          const newAcc = [...acc, str];
          return newAcc;
        }
        if (_.isObject(first)) {
          const value = typeof second === 'string' ? `'${second}'` : `${second}`;
          const str = `Property '${newPath.join('.')}' was updated. From [complex value] to ${value}`;
          const newAcc = [...acc, str];
          return newAcc;
        }
        const value1 = typeof first === 'string' ? `'${first}'` : `${first}`;
        const value2 = typeof second === 'string' ? `'${second}'` : `${second}`;
        const str = `Property '${newPath.join('.')}' was updated. From ${value1} to ${value2}`;
        const newAcc = [...acc, str];
        return newAcc;
      }
      return acc;
    }, []);

    return toString;
  };

  const result = searchDiffInObject(mergeObject).join('\n');
  return result;
};

export default plain;
