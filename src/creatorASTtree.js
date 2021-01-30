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
    const keys = [..._.keys(obj)].sort();

    const toString = keys.reduce((acc, key) => {
      const newPath = [...path, key];
      const first = _.get(data1, newPath, undefined);
      const second = _.get(data2, newPath, undefined);

      if (!_.isObject(obj[key])) {
        if (_.isObject(first)) {
          const oldValue = _.isObject(first) ? createChildren(first) : first;
          return [...acc, {
            name: key,
            value: second,
            oldValue,
            status: 'updated',
          }];
        }
        if (first === second) {
          return [...acc, { name: key, value: second, status: 'outdated' }];
        }
        if (second === undefined) {
          return [...acc, { name: key, value: first, status: 'removed' }];
        }
        if (first === undefined) {
          return [...acc, { name: key, value: second, status: 'added' }];
        }
        const oldValue = _.isObject(first) ? createChildren(first) : first;
        return [...acc, {
          name: key,
          value: second,
          oldValue,
          status: 'updated',
        }];
      }
      if (_.isObject(obj[key])) {
        if (!_.isObject(first) && first !== undefined) {
          return [...acc, {
            name: key,
            value: 'nested',
            oldValue: first,
            status: 'updated',
            children: createChildren(obj[key]),
          }];
        }
        if (second === undefined) {
          return [...acc, {
            name: key,
            value: 'nested',
            status: 'removed',
            children: createChildren(obj[key]),
          }];
        }
        if (first === undefined) {
          return [...acc, {
            name: key,
            value: 'nested',
            status: 'added',
            children: createChildren(obj[key]),
          }];
        }
        return [...acc, {
          name: key,
          value: 'nested',
          status: 'outdated',
          children: createTree(obj[key], newPath),
        }];
      }
      return acc;
    }, []);

    return toString;
  };

  const result = createTree(mergeObject);
  return result;
};

export default creatorASTtree;
