import Entity from './Entity';

export default class OauthEntity extends Entity {
  service = null

  email = null

  refreshToken = null

  accessToken = null

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
