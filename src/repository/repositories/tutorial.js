import { convertDocToObject, convertDocumentsToArray, FieldValue } from '../../firebase';

export default class TutorialRepository {
  /** @typedef {firebase.firestore.CollectionReference} tutorialCollection */
  tutorialCollection;

  /** @typedef {firebase.firestore.WriteBatch} batch */
  batch;

  constructor(tutorialCollection, batch) {
    this.tutorialCollection = tutorialCollection;
    this.batch = batch;
  }

  async list(userId, {
    searchQuery = null,
    orderBy = ['createdAt', 'desc'],
    startAfter = null,
    source = 'default',
    limit = null,
  }) {
    let query;
    if (searchQuery) {
      query = this.tutorialCollection
        .orderBy('name')
        .startAt(searchQuery)
        .endAt(`${searchQuery}\uf8ff`);
    } else {
      query = this.tutorialCollection.orderBy(orderBy[0], orderBy[1]);
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
      tutorials: convertDocumentsToArray(snapshot),
      allFetched: snapshot.empty,
      snapshot,
    };
  }

  async find(userId, { id, source = 'default' }) {
    const query = this.tutorialCollection.doc(id);

    const snapshot = await query.get({
      source
    });
    return convertDocToObject(snapshot);
  }

  async add(userId, { id, steps, ...fields }) {
    const tutorialRef = await this.tutorialCollection.doc();
    this.batch.set(tutorialRef, {
      ...fields,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const savedSteps = [];
    steps.forEach(({ id = null, ...stepFields }, index) => {
      const orderAttachedStep = {
        ...stepFields,
        order: index,
      };
      const stepRef = tutorialRef.collection('steps').doc();
      this.batch.set(stepRef, {
        ...orderAttachedStep,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      savedSteps.push({
        ...orderAttachedStep,
        id: stepRef.id,
      });
    });
    await this.batch.commit();
    return {
      ...fields,
      id: tutorialRef.id,
      steps: savedSteps,
    };
  }

  async update(userId, {
    id,
    steps = [],
    performances = [],
    ...fields
  }) {
    const tutorialRef = await this.tutorialCollection
      .doc(id);

    this.batch.update(tutorialRef, {
      ...fields,
      updatedAt: FieldValue.serverTimestamp(),
    });
    await this.batch.commit();
    return {
      ...fields,
      id,
      steps,
    };
  }

  async delete(userId, { id, ...fields }) {
    await this.tutorialCollection.doc(id).delete();
    return {
      id,
      ...fields,
    };
  }

  async getPerformance(userId, {
    id, from, to, source = 'default',
  }) {
    let query = await this.tutorialCollection.doc(id).collection('performances');

    if (from && to) {
      query = query.where('createdAt', '>=', from);
      query = query.where('createdAt', '<=', to);
    }

    const snapshot = await query.get({
      source,
    });
    const performances = [];
    snapshot.docs.forEach((doc) => {
      performances.push(convertDocToObject(doc));
    });
    return {
      id,
      performances,
    };
  }
}
