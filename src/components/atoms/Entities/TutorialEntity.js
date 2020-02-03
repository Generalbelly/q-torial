import Entity from './Entity';
import PerformanceEntity from './PerformanceEntity';

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

  gaId = null;

  gaPropertyId = null;

  performances = []

  constructor(data = {}) {
    super();
    const { performances = [], ...props } = data;
    this.fill(props);
    this.performances = performances.map(p => new PerformanceEntity(p));
  }

  toPlainObject() {
    return super.toPlainObject([
      'createdAt',
      'updatedAt',
      'performances',
      'steps',
    ]);
  }
}
