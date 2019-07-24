import { Validator } from 'vee-validate';
import { validateUrlPath } from './components/atoms/Entities/PathOperators';

const paramNames = ['pathOperator', 'pathValue'];
Validator.extend(
  'url-path',
  (value, { pathOperator, pathValue } = {}) => validateUrlPath(pathOperator, pathValue, value),
  {
    paramNames,
  },
);

Validator.extend(
  'domain',
  (value, args) => {
    const exceptions = args;
    if (exceptions.includes(value)) return true;
    const re = /^https?:\/\/(([A-Za-z0-9][A-Za-z0-9-]{1,61}[A-Za-z0-9]|[A-Za-z0-9]{1,63})\.)+[A-Za-z]+$/;
    return !!re.exec(value);
  },
  {},
);
