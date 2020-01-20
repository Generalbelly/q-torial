import { has } from '../../../utils';

export const toPlainObject = (instance, excludes = []) => {
  const object = {};
  Object.keys(instance).forEach((propertyName) => {
    if (
      !excludes.includes(propertyName)
      && Object.prototype.hasOwnProperty.call(instance, propertyName)
    ) {
      object[propertyName] = instance[propertyName];
    }
  });
  return object;
};

export default class Entity {
  createdAt = null;

  updatedAt = null;

  fill(data = {}) {
    Object.keys(data).forEach((field) => {
      if (has.call(this, field)) {
        this[field] = data[field];
      }
    });
  }

  toPlainObject() {
    return toPlainObject(this, [
      'createdAt',
      'updatedAt',
    ]);
  }
}
