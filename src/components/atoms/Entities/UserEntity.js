import Entity, { toPlainObject } from './Entity';

export default class UserEntity extends Entity {
  uid = null;

  email = null;

  displayName = null;

  emailVerified = false;

  stripeCustomer = null;

  firebaseConfig = null;

  setupComplete = false;

  constructor(data = {}) {
    super();
    this.fill(data);
  }

  /**
   * @param {firebase.User} auth
   * @param {UserEntity|null} user
   */

  static createFromAuth(auth, user) {
    if (user) {
      const { setupComplete } = user;
      return new UserEntity({
        ...auth,
        setupComplete,
      });
    }
    return new UserEntity(auth);
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
