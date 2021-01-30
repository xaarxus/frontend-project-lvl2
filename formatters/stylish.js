import creatorASTtree from '../src/creatorASTtree.js';

const stylish = (data1, data2) => {
  const astTree = creatorASTtree(data1, data2);

  const isObject = (obj) => typeof obj === 'object';

  const difference = (tree, deep = 1) => {
    const dif = tree.reduce((acc, item) => {
      const {
        name,
        value,
        status,
        children = undefined,
        oldValue = undefined,
      } = item;

      if (status === 'updated') {
        if (isObject(children) && isObject(oldValue)) {
          const str1 = `${'  '.repeat(deep)}- ${name}: ${difference(oldValue, deep + 2)}\n`;
          const str2 = `${'  '.repeat(deep)}+ ${name}: ${difference(children, deep + 2)}\n`;
          return acc + str1 + str2;
        }
        if (!isObject(oldValue) && isObject(children)) {
          const str1 = `${'  '.repeat(deep)}- ${name}: ${oldValue}\n`;
          const str2 = `${'  '.repeat(deep)}+ ${name}: ${difference(children, deep + 2)}\n`;
          return acc + str1 + str2;
        }
        if (isObject(oldValue) && !isObject(children)) {
          const str1 = `${'  '.repeat(deep)}- ${name}: ${difference(oldValue, deep + 2)}\n`;
          const str2 = `${'  '.repeat(deep)}+ ${name}: ${value}\n`;
          return acc + str1 + str2;
        }
        const str1 = `${'  '.repeat(deep)}- ${name}: ${oldValue}\n`;
        const str2 = `${'  '.repeat(deep)}+ ${name}: ${value}\n`;
        return acc + str1 + str2;
      }

      if (status === 'added') {
        if (children) {
          const str = `${'  '.repeat(deep)}+ ${name}: ${difference(children, deep + 2)}\n`;
          return acc + str;
        }
        const str = `${'  '.repeat(deep)}+ ${name}: ${value}\n`;
        return acc + str;
      }

      if (status === 'removed') {
        if (children) {
          const str = `${'  '.repeat(deep)}- ${name}: ${difference(children, deep + 2)}\n`;
          return acc + str;
        }
        const str = `${'  '.repeat(deep)}- ${name}: ${value}\n`;
        return acc + str;
      }

      if (children) {
        const str = `${'  '.repeat(deep)}  ${name}: ${difference(children, deep + 2)}\n`;
        return acc + str;
      }
      const str = `${'  '.repeat(deep)}  ${name}: ${value}\n`;
      return acc + str;
    }, '');
    return `{\n${dif}${'  '.repeat(deep - 1)}}`;
  };

  return difference(astTree);
};

export default stylish;
