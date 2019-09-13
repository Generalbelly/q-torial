import Entity from './Entity';

export default class GoogleAnalyticsProfile extends Entity {
    id = null

    name = null

    constructor(data = {}) {
      super();
      this.fill(data);
    }
}
