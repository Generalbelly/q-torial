import admin from '../admin';
import Model from './model';

export default class StripeCustomer extends Model {
  customerId: string = '';

  subscriptionId: string = '';

  deletedAt: admin.firestore.FieldValue|null = null;

  constructor(init?: Partial<StripeCustomer>) {
    super();
    Object.assign(this, init);
  }
}
