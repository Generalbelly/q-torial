import Step from './step';

export default class Tutorial {

  private _id: string|null = null;

  private _name: string|null = null;

  private _description: string|null = null;

  private _domain: string|null = null;

  private _pathOperator: string = 'EQUALS';

  private _pathValue: string|null = null;

  private _parameters: Array<Object> = [];

  private _settings: Object = {
    once: true,
  };

  private _buildUrl: string|null = null;

  private _isActive: boolean = false;

  private _steps: Array<Step> = [];

  private _gaId: string|null = null;

  constructor(init?: Partial<Tutorial>) {
    Object.assign(this, init);
  }

  get id(): string | null {
    return this._id;
  }

  set id(value: string | null) {
    this._id = value;
  }
  get name(): string | null {
    return this._name;
  }

  set name(value: string | null) {
    this._name = value;
  }
  get description(): string | null {
    return this._description;
  }

  set description(value: string | null) {
    this._description = value;
  }

  get domain(): string | null {
    return this._domain;
  }

  set domain(value: string | null) {
    this._domain = value;
  }

  get pathOperator(): string {
    return this._pathOperator;
  }

  set pathOperator(value: string) {
    this._pathOperator = value;
  }

  get pathValue(): string | null {
    return this._pathValue;
  }

  set pathValue(value: string | null) {
    this._pathValue = value;
  }

  get parameters(): Array<Object> {
    return this._parameters;
  }

  set parameters(value: Array<Object>) {
    this._parameters = value;
  }

  get settings(): Object {
    return this._settings;
  }

  set settings(value: Object) {
    this._settings = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get buildUrl(): string | null {
    return this._buildUrl;
  }

  set buildUrl(value: string | null) {
    this._buildUrl = value;
  }

  get steps(): Array<Step> {
    return this._steps;
  }

  set steps(value: Array<Step>) {
    this._steps = value;
  }

  get gaId(): string | null {
    return this._gaId;
  }

  set gaId(value: string | null) {
    this._gaId = value;
  }

}
