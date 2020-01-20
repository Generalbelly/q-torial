import { FieldValue, convertDocumentsToArray, convertDocToObject } from '../../firebase';
import FirebaseConfigEntity from '../../components/atoms/Entities/FirebaseConfigEntity';
import UserEntity from '../../components/atoms/Entities/UserEntity';

export default class UserRepository {
  /** @typedef {firebase.firestore.CollectionReference} userCollection */
  userCollection;

  /** @typedef {firebase.firestore.CollectionReference} stripeCustomerCollection */
  stripeCustomerCollection;

  /** @typedef {firebase.firestore.CollectionReference} firebaseConfigCollection */
  firebaseConfigCollection;

  constructor(userCollection, stripeCustomerCollection, firebaseConfigCollection) {
    this.userCollection = userCollection;
    this.stripeCustomerCollection = stripeCustomerCollection;
    this.firebaseConfigCollection = firebaseConfigCollection;
  }

  async find(userId) {
    await this.userCollection.doc(userId).get();
  }

  /** @param {string} userId */
  async get(userId) {
    const doc = await this.userCollection.doc(userId).get();
    return new UserEntity(convertDocToObject(doc));
  }

  /** @param {import('../../components/atoms/Entities/UserEntity').default} user */
  async add(user) {
    await this.userCollection.doc(user.uid).set({
      ...user.toPlainObject(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  /** @param {import('../../components/atoms/Entities/UserEntity').default} user */
  async update(user) {
    await this.userCollection.doc(user.uid).update({
      ...user.toPlainObject(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  checkUserPaymentInfo(onSnapshot) {
    this.stripeCustomerCollection
      .where('deletedAt', '==', null)
      .limit(1)
      .onSnapshot(onSnapshot);
  }

  checkFirebaseConfig(onSnapshot) {
    this.firebaseConfigCollection
      .limit(1)
      .onSnapshot(onSnapshot);
  }

  async getFirebaseConfig() {
    /** @typedef{firebase.firestore.QuerySnapshot} query */
    const snapshot = await this.firebaseConfigCollection.limit(1).get();
    if (snapshot.empty) return null;
    return new FirebaseConfigEntity(convertDocumentsToArray(snapshot)[0]);
  }

  /**
   * @param {import('../../components/atoms/Entities/FirebaseConfigEntity').default} firebaseConfig
   */
  async upsertFirebaseConfig(firebaseConfig) {
    if (firebaseConfig.id) {
      await this.firebaseConfigCollection
        .doc(firebaseConfig.id)
        .update({
          ...firebaseConfig.toPlainObject(),
          updatedAt: FieldValue.serverTimestamp(),
        });
    } else {
      /** @typedef {firebase.firestore.DocumentReference} ref */
      const ref = await this.firebaseConfigCollection.doc();
      ref.set({
        ...firebaseConfig.toPlainObject(),
        id: ref.id,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
  }
}
