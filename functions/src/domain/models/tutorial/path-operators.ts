export const PATH_ALL: string = 'ALL';
export const PATH_EQUALS: string = 'EQUALS';
export const PATH_STARTS_WITH: string = 'STARTS_WITH';
export const PATH_REGEX: string = 'REGEX';

export const pathOperators = [
  {
    value: PATH_ALL,
    text: 'All the url path',
    pathPriority: 0,
  },
  {
    value: PATH_EQUALS,
    text: 'url paths that equal to',
    pathPriority: 1,
  },
  {
    value: PATH_STARTS_WITH,
    text: 'url paths that start with',
    pathPriority: 3,
  },
  {
    value: PATH_REGEX,
    text: 'url paths that match the following regular expression: ',
    pathPriority: 2,
  },
];

export const validateUrlPath = (pathOperator: string, pathValue: string, urlPath: string) => {
  const evaluators = {
    [PATH_EQUALS]: (pv: string, up: string) => pv === up,
    [PATH_STARTS_WITH]: (pv: string, up: string) => up.startsWith(pv),
    [PATH_REGEX]: (pv: string, up: string) => new RegExp(pv).test(up),
    [PATH_ALL]: (pv: string, up: string) => true,
  };
  return evaluators[pathOperator](pathValue, urlPath);
};

export class PathOperator {

  private _pathPriority;

  constructor(operator: string) {
    const op = pathOperators.find(p => p.value === operator);
    if (op) {
      this.pathPriority = op.pathPriority;
    }
  }

  get pathPriority() {
    return this._pathPriority;
  }

  set pathPriority(value) {
    this._pathPriority = value;
  }

}
