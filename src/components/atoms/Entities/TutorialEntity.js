import Entity from './Entity';
import { validateUrlPath } from './PathOperators';
import GaEntity from './GaEntity';

export default class TutorialEntity extends Entity {
  id = null

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

  ga = new GaEntity();

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
