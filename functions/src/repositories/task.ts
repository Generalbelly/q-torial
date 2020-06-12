import {
  firestore,
} from 'firebase-admin';
import Task from '../models/task';

export default class TaskRepository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  getSetupCollection(): firestore.CollectionReference {
    return this.db.collection('tasks');
  }

  async exists(id: string): Promise<boolean> {
    const snapshot = await this.getSetupCollection().doc(id).get();
    return snapshot.exists;
  }

  async add(functionEvent: Task): Promise<void> {
    if (!functionEvent.id) {
      throw new Error('id is required');
    }
    await this.getSetupCollection().doc(functionEvent.id).set(functionEvent.toPlainObject());
  }

}
