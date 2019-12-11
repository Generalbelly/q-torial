import ITutorialRepository from '../../../domain/models/tutorial/repository';
import admin from '../admin';
import Tutorial from '../../../domain/models/tutorial/tutorial';
import { TutorialRecord } from './record';

export default class TutorialFirestoreRepository implements ITutorialRepository {

  private firestore = null;

  constructor(firestore: admin.firestore.CollectionReference) {
    this.firestore = firestore
  }

  public async store(tutorial: Tutorial): Promise<void> {
    const doc = this.firestore.doc();
    const record: TutorialRecord = {
      name: tutorial.name,
      description: tutorial.description,
      buildUrl: tutorial.buildUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      domain: tutorial.domain,
      gaId: tutorial.gaId,
      isActive: tutorial.isActive,
      parameters: tutorial.parameters,
      pathOperator: tutorial.pathOperator,
      pathValue: tutorial.pathValue,
      settings: tutorial.settings,
    };
    await doc.set(record);
  }

  public async update(tutorial: Tutorial): Promise<void> {
    const doc = this.firestore.doc(tutorial.id!);
    const record: TutorialRecord = {
      name: tutorial.name,
      description: tutorial.description,
      buildUrl: tutorial.buildUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      domain: tutorial.domain,
      gaId: tutorial.gaId,
      isActive: tutorial.isActive,
      parameters: tutorial.parameters,
      pathOperator: tutorial.pathOperator,
      pathValue: tutorial.pathValue,
      settings: tutorial.settings,
    };
    await doc.update(record);
  }

  get(id: string): Promise<Tutorial> {
    return new Promise<Tutorial>(async (resolve, reject) => {
      const doc = await this.firestore.doc(id).get();
      const tutorial = doc.data()
      return new Tutorial({
        name: tutorial.name,
        description: tutorial.description,
        buildUrl: tutorial.buildUrl,
        domain: tutorial.domain,
        gaId: tutorial.gaId,
        isActive: tutorial.isActive,
        parameters: tutorial.parameters,
        pathOperator: tutorial.pathOperator,
        pathValue: tutorial.pathValue,
        settings: tutorial.settings,
      })
    })
  }

  list(userId: string): Promise<Tutorial[]> {
    throw new Error("Method not implemented.");
  }
}
