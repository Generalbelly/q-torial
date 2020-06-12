import Entity from './Entity';

export default class GcpEntity extends Entity {
  id = null

  email = null

  refreshToken = null

  functionsVersion = '';

  firestoreRulesVersion = '';

  firestoreIndexesVersion = '';

  tagVersion = '';

  constructor(data = {}) {
    super();
    this.fill(data);
  }
}
