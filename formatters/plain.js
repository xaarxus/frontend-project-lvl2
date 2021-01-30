import creatorASTtree from '../src/creatorASTtree.js';

const plain = (data1, data2) => {
  const astTree = creatorASTtree(data1, data2);

  const isObject = (obj) => typeof obj === 'object' && obj !== null;

  const normalizeValur = (value) => {
    if (value === 'nested') {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const toString = (arr, path = []) => arr.reduce((acc, item) => {
    const {
      name,
      value,
      status,
      children = undefined,
      oldValue = undefined,
    } = item;
    if (status === 'outdated') {
      if (children !== undefined) {
        return [...acc, toString(children, [...path, name])];
      }
      return acc;
    }
    if (status === 'added') {
      const newValue = normalizeValur(value);
      const str = `Property '${[...path, name].join('.')}' was added with value: ${newValue}`;
      acc.push(str);
      return acc;
    }
    if (status === 'updated') {
      const newValue = normalizeValur(value);
      const previousValue = isObject(oldValue) ? '[complex value]' : normalizeValur(oldValue);
      const str = `Property '${[...path, name].join('.')}' was updated. From ${previousValue} to ${newValue}`;
      acc.push(str);
      return acc;
    }
    const str = `Property '${[...path, name].join('.')}' was removed`;
    acc.push(str);
    return acc;
  }, []).flat();

  const result = toString(astTree).join('\n');
  return result;
};

export default plain;
