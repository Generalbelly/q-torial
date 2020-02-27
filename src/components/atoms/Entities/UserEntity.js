import Entity from './Entity';

export default class UserEntity extends Entity {
  uid = null;

  email = null;

  displayName = null;

  emailVerified = false;

  stripeCustomer = null;

  firebaseConfig = null;

  setupComplete = false;

  tosAgreed = false;

  privacyPolicyAgreed = false;

  constructor(data = {}) {
    super();
    this.fill(data);
  }

  toPlainObject() {
    return super.toPlainObject([
      'createdAt',
      'updatedAt',
      'stripeCustomer',
      'firebaseConfig',
      'emailVerified',
      'displayName',
      'email',
    ]);
  }
}
