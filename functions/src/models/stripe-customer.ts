import {
  firestore,
} from 'firebase-admin';
import Model from './model';

export default class StripeCustomer extends Model {
  customerId: string = '';

  subscriptionId: string = '';

  deletedAt: firestore.FieldValue|null = null;

  canceledAt: firestore.FieldValue|null = null;

  constructor(init?: Partial<StripeCustomer>) {
    super();
    Object.assign(this, init);
  }

  toPlainObject() {
    return super.toPlainObject([
      'createdAt',
      'updatedAt',
      'deletedAt',
      'canceledAt',
    ]);
  }
}
