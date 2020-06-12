import { FieldValue } from '../../firebase';
import FirebaseConfigEntity from '../../components/atoms/Entities/FirebaseConfigEntity';
import GcpEntity from '../../components/atoms/Entities/GcpEntity';
import UserEntity from '../../components/atoms/Entities/UserEntity';
import StripeCustomerEntity from '../../components/atoms/Entities/StripeCustomerEntity';

export default class UserRepository {
  /** @typedef {firebase.firestore.Firestore} db */
  db;

  /** @param {firebase.firestore.Firestore} db */
  constructor(db) {
    this.db = db;
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getUserCollection() {
    return this.db.collection('users');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getStripeCustomerCollection(userId) {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('stripeCustomers');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getFirebaseConfigCollection(userId) {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('firebaseConfigs');
  }

  /**
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getGcpCollection(userId) {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('gcps');
  }

  async find(userId) {
    await this.getUserCollection()
      .doc(userId)
      .get();
  }

  /** @param {string} userId */
  async get(userId) {
    const doc = await this.getUserCollection()
      .doc(userId)
      .get();
    return new UserEntity(doc.data());
  }

  /** @param {import('../../components/atoms/Entities/UserEntity').default} user */
  async add(user) {
    return new Promise(async resolve => {
      const docRef = this.getUserCollection().doc(user.uid);
      await docRef.set({
        ...user.toPlainObject(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new UserEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /** @param {import('../../components/atoms/Entities/UserEntity').default} user */
  async update(user) {
    return new Promise(async resolve => {
      const docRef = this.getUserCollection().doc(user.uid);
      await docRef.update({
        ...user.toPlainObject(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new UserEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  checkUserPaymentInfo(userId, handler) {
    return this.getStripeCustomerCollection(userId)
      .where('deletedAt', '==', null)
      .limit(1)
      .onSnapshot(snapshot => {
        let stripeCustomer = null;
        if (snapshot.docs.length > 0) {
          stripeCustomer = snapshot.docs.map(
            doc => new StripeCustomerEntity(doc.data()),
          )[0];
        }
        handler(stripeCustomer);
      });
  }

  /** @param {string} userId */
  async getUserPaymentInfo(userId) {
    const snapshot = await this.getStripeCustomerCollection(userId)
      .where('deletedAt', '==', null)
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new StripeCustomerEntity(snapshot.docs[0].data())
      : null;
  }

  /** @param {string} userId */
  async getFirebaseConfig(userId) {
    const snapshot = await this.getFirebaseConfigCollection(userId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new FirebaseConfigEntity(snapshot.docs[0].data())
      : null;
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/FirebaseConfigEntity').default} firebaseConfig
   * @return {Promise<import('../../components/atoms/Entities/FirebaseConfigEntity').default>}
   */
  async addFirebaseConfig(userId, firebaseConfig) {
    return new Promise(async resolve => {
      /** @typedef {firebase.firestore.DocumentReference} docRef */
      const docRef = this.getFirebaseConfigCollection(userId).doc();
      await docRef.set({
        ...firebaseConfig.toPlainObject(),
        id: docRef.id,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new FirebaseConfigEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/FirebaseConfigEntity').default} firebaseConfig
   * @return {Promise<import('../../components/atoms/Entities/FirebaseConfigEntity').default>}
   */
  async updateFirebaseConfig(userId, firebaseConfig) {
    return new Promise(async resolve => {
      const docRef = this.getFirebaseConfigCollection(userId).doc(
        firebaseConfig.id,
      );
      await this.getFirebaseConfigCollection(userId)
        .doc(firebaseConfig.id)
        .update({
          ...firebaseConfig.toPlainObject(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new FirebaseConfigEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /**
   * @param {string} userId
   * @return {import('../../components/atoms/Entities/GcpEntity').default|null}
   */
  async getGcp(userId) {
    const snapshot = await this.getGcpCollection(userId)
      .limit(1)
      .get();
    return snapshot.docs.length > 0
      ? new GcpEntity(snapshot.docs[0].data())
      : null;
  }
}
