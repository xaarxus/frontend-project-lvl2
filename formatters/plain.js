import _ from 'lodash';

const plain = (data1, data2) => {
  const mergeObject = _.merge({}, data1, data2);

  return mergeObject;
};

export default plain;
