/**
 * The Options required for when using the Glue42 plugin
 *
 * Glue42 Desktop provides a mechanism whereby AdapTable can be integreated with multiple widgets
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Glue42 Demo](https://demo.adaptabletools.com/partners/glue42demo/)
 *
 * - [Glue42 Plugin](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/glue42/README.md)
 *
 * --------------
 *
 * ### Glue42 Options Example
 *
 * ```ts
 * const adaptableOptions: AdaptableOptions = {
 *    ******
 *     plugins: [
 *       glue42({
 *          glue: glue42Desktop, // this is the glue object
 *           glue4Office: glue42office, // this is the Glue4Office object
 *           username: 'Test User',
 *           password: 'testUserPassword',
 *        },
 *      }),
 *    ],
 *   ******
 *  };
 * ```
 */
export interface Glue42PluginOptions {
  /**
   * UserName to use to login to Glue42
   *
   * Probably taken from your PC Credentials
   */
  username?: string;

  /**
   * Password to use to login to Glue42
   *
   * Probably taken from your PC Credentials
   */
  password?: string;

  /**
   * Gateway URL
   */
  gatewayURL?: string;

  /**
   * The main Glue object
   */
  glue?: any;

  /**
   * The main Glue4Office object
   */
  glue4Office?: any;
}
