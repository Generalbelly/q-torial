import Entity from './Entity';

export default class FirebaseConfigEntity extends Entity {
  id = null

  apiKey = null

  authDomain = null

  databaseURL = null

  projectId = null

  storageBucket = null

  messagingSenderId = null

  appId = null

  uid = null

  locationId = null

  constructor(data = {}) {
    super();
    this.fill(data);
  }
}
