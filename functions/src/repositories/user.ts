import {
  firestore,
} from 'firebase-admin';
import FirebaseConfig from '../models/firebase-config';
import StripeCustomer from '../models/stripe-customer';
import User from '../models/user';
import Gcp from '../models/gcp';
import promiseTimeout from "../utils/promise-timeout";
import Ga from '../models/ga';

export default class UserRepository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  getUserCollection(): firestore.CollectionReference {
    return this.db.collection('users');
  }

  getStripeCustomerCollection(userId: string): firestore.CollectionReference {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('stripeCustomers');
  }

  getFirebaseConfigCollection(userId: string): firestore.CollectionReference {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('firebaseConfigs');
  }

  getGaCollection(userId: string): firestore.CollectionReference {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('gas');
  }

  getGcpCollection(userId: string): firestore.CollectionReference {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('gcps');
  }

  async get(userId: string): Promise<User> {
    const doc = await this.getUserCollection()
      .doc(userId)
      .get();
    return new User(doc.data());
  }

  async getUserPaymentInfo(userId: string): Promise<StripeCustomer|null> {
    const snapshot = await this.getStripeCustomerCollection(userId)
      .where('deletedAt', '==', null)
      .where('canceledAt', '==', null)
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new StripeCustomer(snapshot.docs[0].data())
      : null;
  }

  async getGa(userId: string, id: string): Promise<Ga|null> {
    const snapshot = await this.getGaCollection(userId).doc(id).get();
    return snapshot.exists ? new Ga(snapshot.data()) : null;
  }

  async addGa(userId: string, ga: Ga): Promise<Ga> {
    return promiseTimeout(new Promise(async resolve => {
      const ref = this.getGaCollection(userId).doc();
      await ref.set({
        ...ga.toPlainObject(),
        id: ref.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      const unsubscribe = ref.onSnapshot(doc => {
        resolve(new Ga(doc.data()));
        unsubscribe();
      });
    }));
  }

  async addGcp(userId: string, gcp: Gcp): Promise<Gcp> {
    return promiseTimeout(new Promise(async resolve => {
      const ref = this.getGcpCollection(userId).doc();
      await ref.set({
        ...gcp.toPlainObject(),
        id: ref.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      const unsubscribe = ref.onSnapshot(doc => {
        resolve(new Gcp(doc.data()));
        unsubscribe();
      });
    }));
  }

  async getGcp(userId: string): Promise<Gcp|null> {
    const snapshot = await this.getGcpCollection(userId)
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new Gcp(snapshot.docs[0].data())
      : null;
  }

  async getStripeCustomerBySubscriptionId(userId: string, subscriptionId: string): Promise<StripeCustomer|null> {
    const snapshot = await this.getStripeCustomerCollection(userId)
      .where('subscriptionId', '==', subscriptionId)
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new StripeCustomer(snapshot.docs[0].data())
      : null;
  }

  async getStripeCustomer(userId: string, id: string): Promise<StripeCustomer|null> {
    const doc = await this.getStripeCustomerCollection(userId)
      .doc(id)
      .get();
    return doc.exists ? new StripeCustomer(doc.data()) : null;
  }

  async getFirebaseConfig(userId: string): Promise<FirebaseConfig|null> {
    const snapshot = await this.getFirebaseConfigCollection(userId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new FirebaseConfig(snapshot.docs[0].data())
      : null;
  }

  async updateFirebaseConfig(
    userId: string,
    firebaseConfig: FirebaseConfig,
  ): Promise<FirebaseConfig> {
    return promiseTimeout(new Promise(async resolve => {
      const ref = this.getFirebaseConfigCollection(userId)
        .doc(firebaseConfig.id);
      await ref.update({
        ...firebaseConfig.toPlainObject(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      const unsubscribe = ref.onSnapshot(doc => {
        resolve(new FirebaseConfig(doc.data()));
        unsubscribe();
      });
    }));
  }

  async updateGcp(
    userId: string,
    gcp: Gcp,
  ): Promise<Gcp> {
    return promiseTimeout(new Promise(async resolve => {
      const ref = this.getGcpCollection(userId)
        .doc(gcp.id);
      await ref.update({
        ...gcp.toPlainObject(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      const unsubscribe = ref.onSnapshot(doc => {
        resolve(new Gcp(doc.data()));
        unsubscribe();
      });
    }));
  }

  async addStripeCustomer(userId: string, stripeCustomer: StripeCustomer): Promise<StripeCustomer> {
    return promiseTimeout(new Promise(async resolve => {
      const ref = this.getStripeCustomerCollection(userId).doc();
      await ref.set({
        ...stripeCustomer.toPlainObject(),
        id: ref.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        deletedAt: null,
      });
      const unsubscribe = ref.onSnapshot(doc => {
        resolve(new StripeCustomer(doc.data()));
        unsubscribe();
      });
    }));
  }

  // async updateStripeCustomer(
  //   userId: string,
  //   stripeCustomer: StripeCustomer,
  // ): Promise<StripeCustomer> {
  //   return promiseTimeout(new Promise(async resolve => {
  //     const ref = this.getStripeCustomerCollection(userId)
  //       .doc(stripeCustomer.id);
  //     await ref.update({
  //       ...stripeCustomer.toPlainObject(),
  //       updatedAt: firestore.FieldValue.serverTimestamp(),
  //     });
  //     const unsubscribe = ref.onSnapshot(doc => {
  //       resolve(new StripeCustomer(doc.data()));
  //       unsubscribe();
  //     });
  //   }));
  // }

  async softDeleteStripeCustomer(
    userId: string,
    stripeCustomer: StripeCustomer,
  ): Promise<StripeCustomer> {
    return promiseTimeout(new Promise(async resolve => {
      const ref = this.getStripeCustomerCollection(userId)
        .doc(stripeCustomer.id);
      await ref.update({
        ...stripeCustomer.toPlainObject(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        deletedAt: firestore.FieldValue.serverTimestamp(),
      });
      const unsubscribe = ref.onSnapshot(doc => {
        resolve(new StripeCustomer(doc.data()));
        unsubscribe();
      });
    }));
  }

  async deleteStripeCustomer(customerId: string, subscriptionId: string): Promise<void> {
    const snapshot = await this.db.collectionGroup('stripeCustomers')
      .where('customerId', '==', customerId)
      .where('subscriptionId', '==', subscriptionId)
      .where('deletedAt', '==', null)
      .limit(1)
      .get();
    if (snapshot.empty) {
      throw Error('stripe customer not found.');
    }
    const doc = snapshot.docs[0];
    await doc.ref.delete();
  }
}
