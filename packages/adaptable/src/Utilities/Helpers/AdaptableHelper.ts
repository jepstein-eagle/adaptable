import { cloneDeepWith, isPlainObject } from 'lodash';
import { ColumnHelper } from './ColumnHelper';
import { LoggingHelper } from './LoggingHelper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DefaultAdaptableOptions } from '../Defaults/DefaultAdaptableOptions';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { AdaptableOptions } from '../../AdaptableOptions/AdaptableOptions';
import { AdaptableEventArgs, AdaptableEventData } from '../../Api/Events/AdaptableEvents';

export function assignadaptableOptions(adaptableOptions: AdaptableOptions): AdaptableOptions {
  const returnadaptableOptions = Object.assign({}, DefaultAdaptableOptions, adaptableOptions);

  returnadaptableOptions.auditOptions = Object.assign(
    {},
    DefaultAdaptableOptions.auditOptions,
    adaptableOptions.auditOptions
  );
  returnadaptableOptions.configServerOptions = Object.assign(
    {},
    DefaultAdaptableOptions.configServerOptions,
    adaptableOptions.configServerOptions
  );
  returnadaptableOptions.layoutOptions = Object.assign(
    {},
    DefaultAdaptableOptions.layoutOptions,
    adaptableOptions.layoutOptions
  );
  returnadaptableOptions.filterOptions = Object.assign(
    {},
    DefaultAdaptableOptions.filterOptions,
    adaptableOptions.filterOptions
  );
  returnadaptableOptions.queryOptions = Object.assign(
    {},
    DefaultAdaptableOptions.queryOptions,
    adaptableOptions.queryOptions
  );
  returnadaptableOptions.editOptions = Object.assign(
    {},
    DefaultAdaptableOptions.editOptions,
    adaptableOptions.editOptions
  );
  returnadaptableOptions.containerOptions = Object.assign(
    {},
    DefaultAdaptableOptions.containerOptions,
    adaptableOptions.containerOptions
  );
  returnadaptableOptions.generalOptions = Object.assign(
    {},
    DefaultAdaptableOptions.generalOptions,
    adaptableOptions.generalOptions
  );
  returnadaptableOptions.searchOptions = Object.assign(
    {},
    DefaultAdaptableOptions.searchOptions,
    adaptableOptions.searchOptions
  );
  returnadaptableOptions.userInterfaceOptions = Object.assign(
    {},
    DefaultAdaptableOptions.userInterfaceOptions,
    adaptableOptions.userInterfaceOptions
  );
  returnadaptableOptions.chartOptions = Object.assign(
    {},
    DefaultAdaptableOptions.chartOptions,
    adaptableOptions.chartOptions
  );
  returnadaptableOptions.stateOptions = Object.assign(
    {},
    DefaultAdaptableOptions.stateOptions,
    adaptableOptions.stateOptions
  );
  returnadaptableOptions.exportOptions = Object.assign(
    {},
    DefaultAdaptableOptions.exportOptions,
    adaptableOptions.exportOptions
  );

  const { predefinedConfig } = returnadaptableOptions;
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

    returnadaptableOptions.predefinedConfig = cloneDeepWith(predefinedConfig, customizer);
  }
  return returnadaptableOptions;
}

export function isValidPrimaryKey(adaptable: IAdaptable, columns: AdaptableColumn[]): boolean {
  const pkColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
    adaptable.adaptableOptions.primaryKey,
    columns
  );

  if (pkColumn == null) {
    const errorMessage: string = `The PK Column '${adaptable.adaptableOptions.primaryKey}' does not exist.  This will affect many functions in Adaptable.`;
    if (adaptable.adaptableOptions.generalOptions!.showMissingPrimaryKeyWarning == true) {
      // show an alert if that is the option
      adaptable.api.alertApi.showAlertError('No Primary Key', errorMessage);
    } else {
      // otherwise just log it
      LoggingHelper.LogAdaptableError(errorMessage);
    }
    return false;
  }
  return true;
}

export function isConfigServerEnabled(adaptableOptions: AdaptableOptions): boolean {
  return (
    adaptableOptions.configServerOptions != null &&
    adaptableOptions.configServerOptions.enableConfigServer != null &&
    adaptableOptions.configServerOptions.enableConfigServer == true &&
    StringExtensions.IsNotNullOrEmpty(adaptableOptions.configServerOptions.configServerUrl)
  );
}

export function AdaptableObjectExistsInState(
  array: AdaptableObject[],
  itemToCheck: AdaptableObject
): boolean {
  if (array == null) {
    return false;
  }
  return array.findIndex(abObject => abObject.Uuid == itemToCheck.Uuid) > -1;
}

// perform any checks that are necessary here
// for now just adaptableId
export function CheckadaptableOptions(adaptableOptions: AdaptableOptions): void {
  if (adaptableOptions.adaptableId) {
    if (adaptableOptions.adaptableId.includes('.')) {
      LoggingHelper.LogWarning(
        "The 'adaptableId' property in adaptableOptions should not include a '.'.  We strongly recommend that you remove this."
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

export function createFDC3Message(type: string, id: any): AdaptableEventArgs {
  let eventData: AdaptableEventData = {
    name: 'Adaptable Audit Event',
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
  assignadaptableOptions,
  isValidPrimaryKey,
  isConfigServerEnabled,
  AdaptableObjectExistsInState,
  CheckadaptableOptions,
  getEntitlementAccessLevelForStrategy,
  createFDC3Message,
};
export default AdaptableHelper;
