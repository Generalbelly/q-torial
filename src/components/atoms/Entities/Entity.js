import { has } from '../../../utils';

export default class Entity {
  id = null

  createdAt = null

  createdAtAsDateString = null

  updatedAt = null

  updatedAtAsDateString = null

  // deletedAt = null
  //
  // deletedAtAsDateString = null

  fill(data = {}) {
    Object.keys(data).forEach((field) => {
      console.log(field)
      if (has.call(this, field)) {
        if (field === 'createdAt') {
          this.createdAtAsDateString = data.createdAt.toDate().toLocaleString();
        } else if (field === 'updatedAt') {
          this.updatedAtAsDateString = data.updatedAt.toDate().toLocaleString();
        } else {
          this[field] = data[field];
        }
      }
    });
  }

  toPlainObject(privateProperty = []) {
    const object = {};
    Object.keys(this).forEach((propertyName) => {
      if (
        !privateProperty.includes(propertyName)
        && has.call(this, propertyName)
      ) {
        object[propertyName] = this[propertyName];
      }
    });
    return object;
  }
}
