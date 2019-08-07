import Entity from './Entity';

export default class GAEntity extends Entity {
  accessToken = null;

  idToken = null;

  expiresIn = null;

  tokenType = null;

  refreshToken = null;

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
