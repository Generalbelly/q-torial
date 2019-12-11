export default class Step {

  private _type: string = 'tooltip'; // tooltip, modal

  private _trigger: Object = {
    target: 'window', // window #id, .class
    event: 'load', // load, click, focus, error, null
    waitingTime: 0,
  };

  private _highlightTarget: string|null = null; // #id, .class, modal

  private _config: Object = {};

  private _order: number = 0;

  private _pathOperator = 'EQUALS'; // ALL, EQUALS, STARTS_WITH, ENDS_WITH, CONTAINS, REGEX, NOT_EQUALS

  private _pathValue: string|null = null;

  private _parameters: Array<Object> = [];

  constructor(init?: Partial<Step>) {
    super()
    Object.assign(this, init);
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get trigger(): Object {
    return this._trigger;
  }

  set trigger(value: Object) {
    this._trigger = value;
  }

  get highlightTarget(): string | null {
    return this._highlightTarget;
  }

  set highlightTarget(value: string | null) {
    this._highlightTarget = value;
  }

  get config(): Object {
    return this._config;
  }

  set config(value: Object) {
    this._config = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
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

}
