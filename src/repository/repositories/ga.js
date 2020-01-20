export default class GaRepository {
  db;

  /**
   * @param {firebase.firestore.Firestore} db
   */
  constructor(db) {
    this.db = db;
  }
}
