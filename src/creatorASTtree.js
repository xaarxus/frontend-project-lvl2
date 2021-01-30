import _ from 'lodash';

const creatorASTtree = (data1, data2) => {
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

  const createTree = (obj, path = []) => {
    const keys = _.keys(obj).sort();

    const toString = keys.reduce((acc, key) => {
      const newPath = [...path, key];
      const first = _.get(data1, newPath, undefined);
      const second = _.get(data2, newPath, undefined);

      if (!_.isObject(obj[key])) {
        if (_.isObject(first)) {
          const oldValue = _.isObject(first) ? createChildren(first) : first;
          acc.push({
            name: key,
            value: second,
            oldValue,
            status: 'updated',
          });
          return acc;
        }
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
        const oldValue = _.isObject(first) ? createChildren(first) : first;
        acc.push({
          name: key,
          value: second,
          oldValue,
          status: 'updated',
        });
        return acc;
      }
      if (_.isObject(obj[key])) {
        if (!_.isObject(first) && first !== undefined) {
          acc.push({
            name: key,
            value: 'nested',
            oldValue: first,
            status: 'updated',
            children: createChildren(obj[key]),
          });
          return acc;
        }
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
          children: createTree(obj[key], newPath),
        });
        return acc;
      }
      return acc;
    }, []);

    return toString;
  };

  const result = createTree(mergeObject);
  return result;
};

export default creatorASTtree;
