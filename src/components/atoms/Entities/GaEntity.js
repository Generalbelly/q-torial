import Entity from './Entity';

export default class GaEntity extends Entity {
  id = null

  email = null

  refreshToken = null

  accountId = null;

  accountName = null;

  propertyId = null;

  propertyName = null;

  viewId = null;

  viewName = null;

  // websiteUrl = null;

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
