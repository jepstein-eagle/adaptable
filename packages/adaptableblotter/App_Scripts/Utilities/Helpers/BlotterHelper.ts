import { cloneDeepWith, isPlainObject } from 'lodash';
import { AdaptableBlotterOptions } from '../../BlotterOptions/AdaptableBlotterOptions';
import { DefaultAdaptableBlotterOptions } from '../Defaults/DefaultAdaptableBlotterOptions';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ColumnHelper } from './ColumnHelper';
import { LoggingHelper } from './LoggingHelper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { AlertProperties } from '../../PredefinedConfig/RunTimeState/AlertState';

export function assignBlotterOptions(
  blotterOptions: AdaptableBlotterOptions
): AdaptableBlotterOptions {
  const returnBlotterOptions = Object.assign({}, DefaultAdaptableBlotterOptions, blotterOptions);
  returnBlotterOptions.auditOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.auditOptions,
    blotterOptions.auditOptions
  );
  returnBlotterOptions.configServerOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.configServerOptions,
    blotterOptions.configServerOptions
  );
  returnBlotterOptions.layoutOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.layoutOptions,
    blotterOptions.layoutOptions
  );
  returnBlotterOptions.filterOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.filterOptions,
    blotterOptions.filterOptions
  );
  returnBlotterOptions.queryOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.queryOptions,
    blotterOptions.queryOptions
  );
  returnBlotterOptions.containerOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.containerOptions,
    blotterOptions.containerOptions
  );
  returnBlotterOptions.generalOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.generalOptions,
    blotterOptions.generalOptions
  );
  returnBlotterOptions.chartOptions = Object.assign(
    {},
    DefaultAdaptableBlotterOptions.chartOptions,
    blotterOptions.chartOptions
  );

  const { predefinedConfig } = returnBlotterOptions;
  if (predefinedConfig) {
    // this customizer function is called by lodash.cloneDeepWith
    // to determine how to clone each property
    const customizer = (value: any) => {
      // so whenever we clone a plain object,
      // we add a Uuid property
      if (isPlainObject(value) && value != predefinedConfig) {
        value.Uuid = createUuid();
      }
    };

    returnBlotterOptions.predefinedConfig = cloneDeepWith(predefinedConfig, customizer);
  }
  return returnBlotterOptions;
}

export function isValidPrimaryKey(
  blotter: IAdaptableBlotter,
  columns: AdaptableBlotterColumn[]
): boolean {
  const pkColumn: AdaptableBlotterColumn = ColumnHelper.getColumnFromId(
    blotter.blotterOptions.primaryKey,
    columns
  );

  if (pkColumn == null) {
    const errorMessage: string = `The PK Column '${blotter.blotterOptions.primaryKey}' does not exist.  This will affect many functions in the Adaptable Blotter.`;
    if (blotter.blotterOptions.generalOptions.showMissingPrimaryKeyWarning == true) {
      // show an alert if that is the option
      blotter.api.alertApi.showAlertError('No Primary Key', errorMessage);
    } else {
      // otherwise just log it
      LoggingHelper.LogAdaptableBlotterError(errorMessage);
    }
    return false;
  }
  return true;
}

export function isConfigServerEnabled(blotterOptions: AdaptableBlotterOptions): boolean {
  return (
    blotterOptions.configServerOptions != null &&
    blotterOptions.configServerOptions.enableConfigServer != null &&
    blotterOptions.configServerOptions.enableConfigServer == true &&
    StringExtensions.IsNotNullOrEmpty(blotterOptions.configServerOptions.configServerUrl)
  );
}

export function BlotterObjectExistsInState(
  array: AdaptableBlotterObject[],
  itemToCheck: AdaptableBlotterObject
): boolean {
  if (array == null) {
    return false;
  }
  return array.findIndex(abObject => abObject.Uuid == itemToCheck.Uuid) > -1;
}

export function isDemoSite(): boolean {
  return window.location.hostname == 'demo.adaptableblotter.com';
}

// perform any checks that are necessary here
// for now just blotterId
export function CheckBlotterOptions(blotterOptions: AdaptableBlotterOptions): void {
  if (blotterOptions.blotterId) {
    if (blotterOptions.blotterId.includes('.')) {
      LoggingHelper.LogWarning(
        "The 'blotterId' property in BlotterOptions should not include a '.'.  We strongly recommend that you remove this."
      );
    }
  }
}

export const BlotterHelper = {
  isDemoSite,
  assignBlotterOptions,
  isValidPrimaryKey,
  isConfigServerEnabled,
  BlotterObjectExistsInState,
  CheckBlotterOptions,
};
export default BlotterHelper;
