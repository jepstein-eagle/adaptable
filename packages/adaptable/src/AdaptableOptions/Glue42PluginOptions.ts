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
  username?: string;
  password?: string;
  gatewayURL?: string;
  glue?: any; // this is the glue object
  glue4Office?: any; // this is the Glue4Office object
  throttleTime?: number;
}
