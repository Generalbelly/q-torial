import Entity from './Entity';

export default class UserEntity extends Entity {
  uid = null;

  email = null;

  displayName = null;

  emailVerified = false;

  constructor(data = {}) {
    super();
    this.fill(data);
  }
}
