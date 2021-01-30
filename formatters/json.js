import creatorASTtree from '../src/creatorASTtree.js';

const plain = (data1, data2) => {
  const astTree = creatorASTtree(data1, data2);

  return JSON.stringify(astTree);
};

export default plain;
