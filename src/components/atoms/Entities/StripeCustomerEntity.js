import Entity from './Entity';

export default class StripeCustomerEntity extends Entity {
  id = null

  customerId = null

  subscriptionId = null

  deletedAt = null

  constructor(data = {}) {
    super();
    this.fill(data);
  }

}
