import { cloneDeepWith, isPlainObject } from 'lodash';
import { ColumnHelper } from './ColumnHelper';
import { LoggingHelper } from './LoggingHelper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IAdaptable } from '../../BlotterInterfaces/IAdaptable';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { AdaptableBlotterEventData, BlotterEventArgs } from '../../Api/Events/BlotterEvents';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DefaultAdaptableOptions } from '../Defaults/DefaultAdaptableOptions';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { AdaptableOptions } from '../../BlotterOptions/AdaptableOptions';

export function assignBlotterOptions(blotterOptions: AdaptableOptions): AdaptableOptions {
  const returnBlotterOptions = Object.assign({}, DefaultAdaptableOptions, blotterOptions);
  returnBlotterOptions.auditOptions = Object.assign(
    {},
    DefaultAdaptableOptions.auditOptions,
    blotterOptions.auditOptions
  );
  returnBlotterOptions.configServerOptions = Object.assign(
    {},
    DefaultAdaptableOptions.configServerOptions,
    blotterOptions.configServerOptions
  );
  returnBlotterOptions.layoutOptions = Object.assign(
    {},
    DefaultAdaptableOptions.layoutOptions,
    blotterOptions.layoutOptions
  );
  returnBlotterOptions.filterOptions = Object.assign(
    {},
    DefaultAdaptableOptions.filterOptions,
    blotterOptions.filterOptions
  );
  returnBlotterOptions.queryOptions = Object.assign(
    {},
    DefaultAdaptableOptions.queryOptions,
    blotterOptions.queryOptions
  );
  returnBlotterOptions.editOptions = Object.assign(
    {},
    DefaultAdaptableOptions.editOptions,
    blotterOptions.editOptions
  );
  returnBlotterOptions.containerOptions = Object.assign(
    {},
    DefaultAdaptableOptions.containerOptions,
    blotterOptions.containerOptions
  );
  returnBlotterOptions.generalOptions = Object.assign(
    {},
    DefaultAdaptableOptions.generalOptions,
    blotterOptions.generalOptions
  );
  returnBlotterOptions.userInterfaceOptions = Object.assign(
    {},
    DefaultAdaptableOptions.userInterfaceOptions,
    blotterOptions.userInterfaceOptions
  );
  returnBlotterOptions.chartOptions = Object.assign(
    {},
    DefaultAdaptableOptions.chartOptions,
    blotterOptions.chartOptions
  );
  returnBlotterOptions.stateOptions = Object.assign(
    {},
    DefaultAdaptableOptions.stateOptions,
    blotterOptions.stateOptions
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

export function isValidPrimaryKey(blotter: IAdaptable, columns: AdaptableColumn[]): boolean {
  const pkColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
    blotter.blotterOptions.primaryKey,
    columns
  );

  if (pkColumn == null) {
    const errorMessage: string = `The PK Column '${blotter.blotterOptions.primaryKey}' does not exist.  This will affect many functions in the Adaptable Blotter.`;
    if (blotter.blotterOptions.generalOptions!.showMissingPrimaryKeyWarning == true) {
      // show an alert if that is the option
      blotter.api.alertApi.showAlertError('No Primary Key', errorMessage);
    } else {
      // otherwise just log it
      LoggingHelper.LogAdaptableError(errorMessage);
    }
    return false;
  }
  return true;
}

export function isConfigServerEnabled(blotterOptions: AdaptableOptions): boolean {
  return (
    blotterOptions.configServerOptions != null &&
    blotterOptions.configServerOptions.enableConfigServer != null &&
    blotterOptions.configServerOptions.enableConfigServer == true &&
    StringExtensions.IsNotNullOrEmpty(blotterOptions.configServerOptions.configServerUrl)
  );
}

export function BlotterObjectExistsInState(
  array: AdaptableObject[],
  itemToCheck: AdaptableObject
): boolean {
  if (array == null) {
    return false;
  }
  return array.findIndex(abObject => abObject.Uuid == itemToCheck.Uuid) > -1;
}

// perform any checks that are necessary here
// for now just blotterId
export function CheckBlotterOptions(blotterOptions: AdaptableOptions): void {
  if (blotterOptions.blotterId) {
    if (blotterOptions.blotterId.includes('.')) {
      LoggingHelper.LogWarning(
        "The 'blotterId' property in BlotterOptions should not include a '.'.  We strongly recommend that you remove this."
      );
    }
  }
}

export function getEntitlementAccessLevelForStrategy(
  entitlements: Entitlement[],
  functionName: AdaptableFunctionName
): AccessLevel {
  if (ArrayExtensions.IsNotNullOrEmpty(entitlements)) {
    let entitlement: Entitlement | undefined = entitlements.find(
      e => e.FunctionName == functionName
    );
    if (entitlement) {
      return entitlement.AccessLevel as AccessLevel;
    }
  }
  return AccessLevel.Full;
}

export function createFDC3Message(type: string, id: any): BlotterEventArgs {
  let eventData: AdaptableBlotterEventData = {
    name: 'Adaptable Blotter',
    type: type,
    id: id,
  };

  return {
    object: 'fdc3-context',
    definition: 'https://fdc3.org/context/1.0.0/',
    version: '1.0.0',
    data: [eventData],
  };
}

export const AdaptableHelper = {
  assignBlotterOptions,
  isValidPrimaryKey,
  isConfigServerEnabled,
  BlotterObjectExistsInState,
  CheckBlotterOptions,
  getEntitlementAccessLevelForStrategy,
  createFDC3Message,
};
export default AdaptableHelper;
