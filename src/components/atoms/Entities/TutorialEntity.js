import Entity from './Entity';
import { validateUrlPath } from './PathOperators';

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
    return super.toPlainObject([
      'createdAtAsDateString',
      'updatedAtAsDateString',
      'createdAt',
      'updatedAt',
    ]);
  }

  couldBeShownOn(urlPath) {
    return validateUrlPath(this.pathOperator, this.pathValue, urlPath);
  }
}
