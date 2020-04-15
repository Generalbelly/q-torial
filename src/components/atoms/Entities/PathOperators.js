export const PATH_ALL = 'ALL';
export const PATH_EQUALS = 'EQUALS';
export const PATH_STARTS_WITH = 'STARTS_WITH';
// export const PATH_ENDS_WITH = 'ENDS_WITH'
// export const PATH_CONTAINS = 'CONTAINS'
// export const PATH_NOT_EQUALS = 'NOT_EQUALS'
export const PATH_REGEX = 'REGEX';

export default [
  {
    value: PATH_ALL,
    text: 'All the url paths',
  },
  {
    value: PATH_EQUALS,
    text: 'url paths that are equal to',
  },
  {
    value: PATH_STARTS_WITH,
    text: 'url paths that start with',
  },
  // {
  //   value: PATH_ENDS_WITH,
  //   text: 'Url paths that ends with',
  // },
  // {
  //   value: PATH_CONTAINS,
  //   text: 'Url paths that contains',
  // },
  {
    value: PATH_REGEX,
    text: 'url paths that match the following regular expression: ',
  },
  // {
  //   value: PATH_NOT_EQUALS,
  //   text: 'Path names that are not equal to',
  // },
];

export const validateUrlPath = (pathOperator, pathValue, urlPath) => {
  const evaluators = {
    [PATH_EQUALS]: (pv, up) => pv === up,
    [PATH_STARTS_WITH]: (pv, up) => up.startsWith(pv),
    // [PATH_ENDS_WITH]: (pv, up) => up.endsWith(pv),
    // [PATH_CONTAINS]: (pv, up) => up.includes(pv),
    [PATH_REGEX]: (pv, up) => new RegExp(pv).test(up),
    // [PATH_NOT_EQUALS]: (pv, up) => pv !== up,
    [PATH_ALL]: (pv, up) => true,
  };
  const valid = evaluators[pathOperator](pathValue, urlPath);
  return valid;
};
