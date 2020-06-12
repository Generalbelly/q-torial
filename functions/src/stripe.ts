import functions from './functions';
import StripeCustomer from './models/stripe-customer';
import UserRepository from "./repositories/user";

const stripe = require('stripe')(functions.config().stripe.token);

const endpointSecret = functions.config().stripe.ending_secret;

export const stripeWebhook = (userRepository: UserRepository) => {
  functions.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    if (request.method === 'OPTIONS') {
      response.set('Access-Control-Allow-Methods', 'POST');
      response.set('Access-Control-Allow-Headers', 'Content-Type');
      response.set('Access-Control-Max-Age', '3600');
      return response.status(204).send('');
    } if (request.method === 'POST') {
      let event: any;
      try {
        const sig = request.headers['stripe-signature'];
        // Verify the request against our endpointSecret
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
      } catch (e) {
        console.error(e);
        return response.status(400).send(`Webhook Error: ${e.message}`);
      }
      try {
        if (event.type === 'checkout.session.completed') {
          const userKey = event.data.object.client_reference_id;
          const customerId = event.data.object.customer;
          const subscriptionId = event.data.object.subscription;
          const stripeCustomer = await userRepository.getStripeCustomerBySubscriptionId(
            userKey,
            subscriptionId,
          );
          if (!stripeCustomer) {
            await userRepository.addStripeCustomer(userKey, new StripeCustomer({
              customerId,
              subscriptionId,
            }));
          }
        } else if (event.type === 'customer.subscription.deleted' && !event.request) {
          const customerId = event.data.object.customer;
          const subscriptionId = event.data.object.id;
          await userRepository.deleteStripeCustomer(customerId, subscriptionId);
        }
      } catch (e) {
        console.error(e);
        return response.sendStatus(500);
      }
      return response.sendStatus(200);
    }
    return response.status(405).send('Method Not Allowed');
  });
};

export const cancelSubscription = (userRepository: UserRepository) => {
  return functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
    const { auth } = context;
    if (!auth) {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    const { id } = data;
    const stripeCustomer = await userRepository.getStripeCustomer(auth.uid, id);
    if (!stripeCustomer) {
      throw Error(`stripe customer(id: ${id}) not found`);
    }
    await stripe.subscriptions.update(
      stripeCustomer.subscriptionId,
      { cancel_at_period_end: true },
    );
    // stripe.subscriptions.del(stripeCustomer.subscriptionId);
    await userRepository.softDeleteStripeCustomer(auth.uid, id);
  });
};
