import _ from 'lodash';

const plain = (data1, data2) => {
  const mergeObject = _.merge({}, data1, data2);

  const createChildren = (obj) => {
    const keys = _.keys(obj);
    return keys.map((key) => {
      if (_.isObject(obj[key])) {
        return ({
          name: key,
          value: 'nested',
          status: 'outdated',
          children: createChildren(obj[key]),
        });
      }
      return ({
        name: key,
        value: obj[key],
        status: 'outdated',
      });
    });
  };

  const searchDiffInObject = (obj, path = []) => {
    const keys = _.keys(obj).sort();

    const toString = keys.reduce((acc, key) => {
      const newPath = [...path, key];
      const first = _.get(data1, newPath, undefined);
      const second = _.get(data2, newPath, undefined);

      if (!_.isObject(obj[key])) {
        if (first === second) {
          acc.push({ name: key, value: second, status: 'outdated' });
          return acc;
        }
        if (second === undefined) {
          acc.push({ name: key, value: first, status: 'removed' });
          return acc;
        }
        if (first === undefined) {
          acc.push({ name: key, value: second, status: 'added' });
          return acc;
        }
        acc.push({
          name: key,
          value: second,
          oldValue: first,
          status: 'updated',
        });
        return acc;
      }
      if (_.isObject(obj[key])) {
        if (second === undefined) {
          acc.push({
            name: key,
            value: 'nested',
            status: 'removed',
            children: createChildren(obj[key]),
          });
          return acc;
        }
        if (first === undefined) {
          acc.push({
            name: key,
            value: 'nested',
            status: 'added',
            children: createChildren(obj[key]),
          });
          return acc;
        }
        acc.push({
          name: key,
          value: 'nested',
          status: 'outdated',
          children: searchDiffInObject(obj[key], newPath),
        });
        return acc;
      }
      return acc;
    }, []);

    return toString;
  };

  const result = searchDiffInObject(mergeObject);
  return JSON.stringify(result);
};

export default plain;
