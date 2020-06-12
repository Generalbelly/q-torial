import Model from './model';
import StripeCustomer from "./stripe-customer";
import FirebaseConfig from "./firebase-config";
import Gcp from "./gcp";

export default class User extends Model {
  uid: string = '';

  email: string = '';

  displayName: string = '';

  emailVerified: boolean = false;

  stripeCustomer: StripeCustomer|null = null;

  firebaseConfig: FirebaseConfig|null = null;

  setupComplete: boolean = false;

  tosAgreed: boolean = false;

  privacyPolicyAgreed: boolean = false;

  gcp: Gcp|null = null;

  constructor(init?: Partial<User>) {
    super();
    Object.assign(this, init);
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
