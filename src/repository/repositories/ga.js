import { FieldValue } from '../../firebase';
import GaEntity from '../../components/atoms/Entities/GaEntity';

export default class GaRepository {
  /** @typedef {firebase.firestore.Firestore} db */
  db;

  /** @typedef {firebase.functions.Functions} functions */
  functions;

  /**
   * @param {firebase.firestore.Firestore} db
   * @param {firebase.functions.Functions} functions
   */
  constructor(db, functions) {
    this.db = db;
    this.functions = functions;
  }

  queryAccounts(gaId) {
    return new Promise(async resolve => {
      let accounts = []
      try {
        const queryAccounts = this.functions.httpsCallable('queryAccounts');
        const response = await queryAccounts({
          id: gaId,
        });
        accounts = response.data;
      } catch (e) {
        console.error(e);
      }
      resolve(accounts);
    });
  }

  /**
   * @param {string} userId
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getGaCollection(userId) {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('gas');
  }

  async list(
    userId,
    {
      searchQuery = null,
      orderBy = ['createdAt', 'desc'],
      startAfter = null,
      source = 'default',
      limit = null,
    }
  ) {
    let query;
    if (searchQuery) {
      query = this.getGaCollection(userId)
        .orderBy('name')
        .startAt(searchQuery)
        .endAt(`${searchQuery}\uf8ff`);
    } else {
      query = this.getGaCollection(userId).orderBy(
        orderBy[0],
        orderBy[1]
      );
    }

    if (startAfter) {
      query = query.startAfter(startAfter);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const snapshot = await query.get({
      source,
    });
    return {
      gas: snapshot.docs.map(doc => doc.data()),
      allFetched: snapshot.empty,
      snapshot,
    };
  }

  /**
   * @param {string} userId
   * @param {string} gaId
   */
  async find(userId, gaId) {
    const query = this.getGaCollection(userId).doc(gaId);
    const snapshot = await query.get();
    return new GaEntity(snapshot.data());
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/GaEntity').default} ga
   */
  add(userId, ga) {
    return new Promise(async resolve => {
      const docRef = this.getGaCollection(userId).doc();
      await docRef.set({
        ...ga.toPlainObject(),
        id: docRef.id,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new GaEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/GaEntity').default} ga
   */
  update(userId, ga) {
    return new Promise(async resolve => {
      const docRef = this.getGaCollection(userId).doc(ga.id);
      await docRef.update({
        ...ga.toPlainObject(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new GaEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/GaEntity').default} ga
   */
  async delete(userId, ga) {
    await this.getGaCollection(userId)
      .doc(ga.id)
      .delete();
    return ga;
  }
}
