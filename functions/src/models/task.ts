import Model from './model';

export default class Task extends Model {
  name: string = '';

  constructor(init?: Partial<Task>) {
    super();
    Object.assign(this, init);
  }
}
