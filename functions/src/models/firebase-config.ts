import Model from './model';

export default class FirebaseConfig extends Model {
  id: string = '';

  apiKey: string = '';

  authDomain: string = '';

  databaseURL: string = '';

  projectId: string = '';

  storageBucket: string = '';

  messagingSenderId: string = '';

  appId: string = '';

  uid: string = '';

  locationId: string = '';

  constructor(init?: Partial<FirebaseConfig>) {
    super();
    Object.assign(this, init);
  }


}
