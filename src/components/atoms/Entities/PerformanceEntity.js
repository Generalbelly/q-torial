import Entity from './Entity';

export default class PerformanceEntity extends Entity {
  id = null

  allSteps = 0

  complete = false

  completeSteps = 0

  elapsedTime = 0

  euId = null

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
}