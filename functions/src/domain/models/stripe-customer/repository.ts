import StripeCustomer from './stripe-customer';

export interface IStripeCustomerRepository {
  get(id: string): Promise<StripeCustomer>;
}
