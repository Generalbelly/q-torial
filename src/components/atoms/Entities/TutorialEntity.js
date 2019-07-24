import Entity from './Entity';
import { validateUrlPath } from './PathOperators';
import { has } from '../../../utils';

export default class TutorialEntity extends Entity {
  name = null

  description = null

  domain = null

  pathOperator = 'EQUALS'

  pathValue = null

  parameters = []

  settings = {
    once: true,
  }

  buildUrl = null

  isActive = false

  constructor(data = {}) {
    super();
    this.fill(data);
  }

  toPlainObject() {
    const privateProperty = [
      'createdAtAsDateString',
      'updatedAtAsDateString',
      'createdAt',
      'updatedAt',
    ];
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

  couldBeShownOn(urlPath) {
    return validateUrlPath(this.pathOperator, this.pathValue, urlPath);
  }
}
