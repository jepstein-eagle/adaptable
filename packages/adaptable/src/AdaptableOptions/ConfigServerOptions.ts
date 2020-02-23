/**
 * Options for managing Config Server.
 *
 * ConfigServer enables you to save user state **remotely** (the default is to save state in local storage).
 *
 * Note that AdapTable also provides **[state lifecycle management functions](_adaptableoptions_stateoptions_.stateoptions.html)** which provides a superior and more flexible alternative to Config Server.  These allow you full control over managing state hydration, rehydration and persisttence and are now generally preferred by advanced users.
 *
 * To use ConfigServer you need to set the ​​`enableConfigServer​` property to ​true​ and also provide a value for the ​`configServerUrl`​ property (where your config will be stored).
 *
 *  ### Config Server example
 *
 * ```ts
 * configServerOptions = {
 *  enableConfigServer: true,
 *  configServerUrl: '/myServer/myFile',
 *};
 * ```
 *
 * ConfigServer works via a typical POST / GET requests mechanism.  This enables you to decide how to respond to the requests as per your own requirements and system set up.
 *
 * #### POST Request
 *
 * AdapTable will send a POST request to the ​​configServerUrl​​ to persist the state with the follower parameters:
 *
 * - **​​Headers​​**: This takes the form of { ab_username: string, ab_id: string }
 *
 * ​​- **Body**​​: This is the actual User State "stringified".
 *
 * Note:  Each ​​*ab_username​* and *​ab_id​​* combination is unique, so your server should persist the user state and use that combination as a key.
 *
 * #### GET Request
 *
 * AdapTable will send a GET request to the ​​configServerUrl​​ to retrieve the persisted state with the following parameter:
 *
 * -​​ Headers​​: This takes the form of { ab_username: string, ab_id: string }
 *
 * On receiving this request, your server should return the user state related to the given ​​*ab_username*​ and *​ab_id*​​ combination as a JSON object.
 *
 */
export interface ConfigServerOptions {
  /**
   * Whether to enable Config Server.
   *
   * If true, config is stored at server location of your choice.
   *
   * If false, state is stored in the local storage.
   */
  enableConfigServer?: boolean;

  /**
   * Config server that will persist the user state and give it back on demand.
   *
   * Only used if enableConfigServer is true.
   *
   * Adaptable will send a POST request to this URL to persist the state with the follower parameters:
   *
   * Headers: { ab_username: string, ab_id: string }
   *
   * Body: Stringified user state
   *
   * Each ab_username & ab_id combination is unique, so your server should persist the state and use that combination as a key.
   *
   * Adaptable will send a GET request to this URL to get the persisted state with the follower parameters:
   *
   * Headers: { ab_username: string, ab_id: string }
   *
   * Your server should return the user state related to the given ab_username and ab_id combination as a JSON object.
   */
  configServerUrl?: string;
}
