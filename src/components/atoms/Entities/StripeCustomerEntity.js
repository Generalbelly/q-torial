import Entity from './Entity';

export default class StripeCustomerEntity extends Entity {
  id = null

  customerId = null

  subscriptionId = null

  deletedAt = null

  canceledAt = null

  constructor(data = {}) {
    super();
    this.fill(data);
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
