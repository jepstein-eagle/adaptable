import * as React from 'react';
import { GridOptions } from '@ag-grid-community/all-modules';

import { AdaptableOptions, IAdaptable } from '../types';

export type IAdaptableNoCodeWizardInitFn = ({
  gridOptions,
  adaptableOptions,
}: {
  gridOptions: GridOptions;
  adaptableOptions: AdaptableOptions;
}) => IAdaptable | void;

export interface IAdaptableNoCodeWizardOptions {
  onInit?: IAdaptableNoCodeWizardInitFn;
  fileAccept?: string;
  defaultActionMessage?: React.ReactNode;
  dragOverActionMessage?: React.ReactNode;
  fetchData?: () => Promise<any>;
  fileContentsToJSON?: (str: string) => Promise<any> | any;
  readFile?: (file: File) => Promise<any>;
  loadingMessage?: string | null;
  prepareData?: (
    data: any,
    file?: File
  ) => {
    columns: string[];
    data: any[];
    primaryKey?: string;
  };
}

/**
 * When you want to configure an Adaptable via json file D&D, use this instead of the normal Adaptable constructor
 *
 * // So instead of doing
 *
 * const adaptable = new Adaptable(adaptableOptions);
 *
 * // you have to do
 *
 * const adaptableOptions: AdaptableOptions = {
 *
 *  userName: 'Demo User',
 *  predefinedConfig: demoConfig,
 *
 *  // note we don't need any vendorGrid info, since that's set by the wizard, when
 *  // the user configured the columns
 * };
 *
 * const AdaptableNoCodeWizard = new AdaptableNoCodeWizard(adaptableOptions);
 *
 * // in the most simple case.
 *
 * After the user drops the file and configures all the columns and other options,
 * when the "FINISH" button is clicked, we call onInit (which is an optional config), to allow
 * the developer to override some configuration in case this is needed. This is how it looks like:
 *
 *
 * const AdaptableNoCodeWizard = new AdaptableNoCodeWizard(adaptableOptions, {
 *    onInit: ({ adaptableOptions, gridOptions }) => {
 *      // here you can either change some of the ab options or the gridOptions
 *      // and don't return anything
 *
 *      // OR instantiate Adaptable yourself with
 *
 *      const adaptable = new Adaptable(adaptableOptions);
 *      // in case you need a reference to it for later use (api stuff...)
 *      // and return Adaptableinstance
 *
 *      return adaptable
 *    }
 * });
 *
 * you can also have a `prepareData` config
 *
 * const AdaptableNoCodeWizard = new AdaptableNoCodeWizard(adaptableOptions, {
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
export interface IAdaptableNoCodeWizard {}
