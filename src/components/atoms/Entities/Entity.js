import { has } from '../../../utils';

export default class Entity {
  createdAt = null;

  updatedAt = null;

  fill(data = {}) {
    Object.keys(data).forEach(field => {
      if (has.call(this, field)) {
        this[field] = data[field];
      }
    });
  }

  toPlainObject(excludes = [
    'createdAt',
    'updatedAt',
  ]) {
    const object = {};
    Object.keys(this).forEach(propertyName => {
      if (
        !excludes.includes(propertyName)
        && Object.prototype.hasOwnProperty.call(this, propertyName)
      ) {
        object[propertyName] = this[propertyName];
      }
    });
    return object;
  }
}
