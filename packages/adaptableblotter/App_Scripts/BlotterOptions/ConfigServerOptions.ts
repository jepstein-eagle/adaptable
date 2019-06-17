export interface ConfigServerOptions {
  /**
   * If true, config is stored at server location of your choice
   * Otherwise it is stored in the local cache
   */
  enableConfigServer?: boolean;
  /**
   * Config server that will persist the user state and give it back on demand.
   * Only used if enableConfigServer is true.
   *
   * AdaptableBlotter will send a POST request to this URL to persist the state with the follower parameters:
   * Headers: { ab_username: string, ab_id: string }
   * Body: Stringified user state
   *
   * Each ab_username & ab_id combination is unique, so your server should persist the state and use that combination as a key.
   *
   * AdaptableBlotter will send a GET request to this URL to get the persisted state with the follower parameters:
   * Headers: { ab_username: string, ab_id: string }
   *
   * Your server should return the user state related to the given ab_username and ab_id combination as a JSON object.
   */
  configServerUrl?: string;
}
