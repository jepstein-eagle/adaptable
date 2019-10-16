/**
 * When you want to configure an Adaptable Blotter via json file D&D, use this instead of the AdaptableBlotter constructor
 *
 * // So instead of doing
 *
 * const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
 *
 * // you have to do
 *
 * const adaptableBlotterOptions: AdaptableBlotterOptions = {
 *
 *  userName: 'Demo User',
 *  predefinedConfig: demoConfig,
 *
 *  // note we don't need any vendorGrid info, since that's set by the wizard, when
 *  // the user configured the columns
 * };
 *
 * const adaptableblotterWizard = new AdaptableBlotterWizard(adaptableBlotterOptions);
 *
 * // in the most simple case.
 *
 * After the user drops the file and configures all the columns and other options,
 * when the "FINISH" button is clicked, we call onInit (which is an optional config), to allow
 * the developer to override some configuration in case this is needed. This is how it looks like:
 *
 *
 * const adaptableblotterWizard = new AdaptableBlotterWizard(adaptableBlotterOptions, {
 *    onInit: ({ adaptableBlotterOptions, gridOptions }) => {
 *      // here you can either change some of the ab options or the gridOptions
 *      // and don't return anything
 *
 *      // OR instantiate the AdaptableBlotter yourself with
 *
 *      const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
 *      // in case you need a reference to it for later use (api stuff...)
 *      // and return the blotter instance
 *
 *      return adaptableBlotter
 *    }
 * });
 *
 * you can also have a `prepareData` config
 *
 * const adaptableblotterWizard = new AdaptableBlotterWizard(adaptableBlotterOptions, {
 *   prepareData: (dataFromFile) => {
 *     return {
 *       columns: ['name','value']
 *       data: dataFromFile.countries.people || [
 *          { name: 'john', value: 5},
 *          { name: 'marry', value: 15},
 *       ],
 *       primaryKey?: 'optional'
 *     }
 *   }
 * })
 *
 * You can use the prepareData function when you know the json doesn't contain an array of objects, but rather another
 * structure - eg: a single object, a data array nested deeper down in the json file, etc
 *
 * So the function needs to return an array of columns (strings) and an array of data to be used in the grid
 *
 *
 *
 */
export interface IAdaptableBlotterWizard {}
