import Model from './model';

export default class Gcp extends Model {
  email:string|null = null;

  refreshToken:string|null = null;

  functionsVersion = '';

  firestoreRulesVersion = '';

  firestoreIndexesVersion = '';

  tagVersion = '';

  constructor(init?: Partial<Gcp>) {
    super();
    Object.assign(this, init);
  }
}
