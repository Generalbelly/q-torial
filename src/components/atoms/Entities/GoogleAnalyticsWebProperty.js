import Entity from './Entity';
import GoogleAnalyticsProfile from './GoogleAnalyticsProfile';

export default class GoogleAnalyticsWebProperty extends Entity {
  id = null

  name = null

  websiteUrl = null

  profiles = null

    constructor(data = {}) {
    super();
    const { profiles = [], ...props } = data;
    this.fill(props);
    this.profiles = profiles.map(profile => new GoogleAnalyticsProfile(profile));
  }
}
