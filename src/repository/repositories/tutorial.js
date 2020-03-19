import { FieldValue } from '../../firebase';
import TutorialEntity from '../../components/atoms/Entities/TutorialEntity';
import PerformanceEntity from '../../components/atoms/Entities/PerformanceEntity';

export default class TutorialRepository {
  /** @typedef {firebase.firestore.Firestore} db */
  db;

  /**
   * @param {firebase.firestore.Firestore} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * @param {string} userId
   * @return {firebase.firestore.CollectionReference}
   *
   */
  getTutorialCollection(userId) {
    return this.db
      .collection('users')
      .doc(userId)
      .collection('tutorials');
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/TutorialEntity').default} tutorial
   */
  async test(userId) {
    const docRef = this.getTutorialCollection(userId).doc();
    await docRef.set({
      id: docRef.id,
    });
  }


  async list(
    userId,
    {
      searchQuery = null,
      orderBy = ['createdAt', 'desc'],
      startAfter = null,
      source = 'default',
      limit = null,
    },
  ) {
    let query;
    if (searchQuery) {
      query = this.getTutorialCollection(userId)
        .orderBy('name')
        .startAt(searchQuery)
        .endAt(`${searchQuery}\uf8ff`);
    } else {
      query = this.getTutorialCollection(userId).orderBy(
        orderBy[0],
        orderBy[1],
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
      tutorials: snapshot.docs.map(doc => new TutorialEntity(doc.data())),
      allFetched: snapshot.empty,
      snapshot,
    };
  }

  /**
   * @param {string} userId
   * @param {string} tutorialId
   */
  async find(userId, tutorialId) {
    const query = this.getTutorialCollection(userId).doc(tutorialId);
    const snapshot = await query.get();
    return new TutorialEntity(snapshot.data());
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/TutorialEntity').default} tutorial
   */
  add(userId, tutorial) {
    return new Promise(async resolve => {
      const docRef = this.getTutorialCollection(userId).doc();
      await docRef.set({
        ...tutorial.toPlainObject(),
        id: docRef.id,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new TutorialEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/TutorialEntity').default} tutorial
   */
  update(userId, tutorial) {
    return new Promise(async resolve => {
      const docRef = this.getTutorialCollection(userId).doc(tutorial.id);
      await docRef.update({
        ...tutorial.toPlainObject(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      const unsubscribe = docRef.onSnapshot(doc => {
        if (!doc.metadata.hasPendingWrites) {
          resolve(new TutorialEntity(doc.data()));
          unsubscribe();
        }
      });
    });
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/TutorialEntity').default} tutorial
   */
  async delete(userId, tutorial) {
    await this.getTutorialCollection(userId)
      .doc(tutorial.id)
      .delete();
    return tutorial;
  }

  /**
   * @param {string} userId
   * @param {import('../../components/atoms/Entities/GaEntity').default} ga
   */
  async deleteGaId(userId, ga) {
    const tutorialRefs = await this.getTutorialCollection(userId).where('gaId', '==', ga.id).get();
    await Promise.all(tutorialRefs.docs.map(doc => doc.ref.update({
      gaId: null,
      gaPropertyId: null,
    })));
  }

  async getPerformance(
    userId,
    tutorialId,
    {
      from,
      to,
      source = 'default',
    },
  ) {
    let query = await this.getTutorialCollection(userId)
      .doc(tutorialId)
      .collection('performances');

    if (from && to) {
      query = query.where('createdAt', '>=', from);
      query = query.where('createdAt', '<=', to);
    }

    const snapshot = await query.get({
      source,
    });

    return snapshot.docs.map(doc => new PerformanceEntity(doc.data()));
  }

}
