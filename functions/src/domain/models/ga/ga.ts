import Entity from './entity'

export default class Ga extends Entity {
  email:string|null = null;

  refreshToken:string|null = null;

  accountId:string|null = null;

  accountName:string|null = null;

  propertyId:string|null = null;

  propertyName:string|null = null;

  viewId:string|null = null;

  viewName:string|null = null;

  constructor(init?: Partial<Ga>) {
    super()
    Object.assign(this, init);
  }
}
