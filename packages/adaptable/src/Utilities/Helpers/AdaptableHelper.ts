import { cloneDeepWith, isPlainObject } from 'lodash';
import { LoggingHelper } from './LoggingHelper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DefaultAdaptableOptions } from '../Defaults/DefaultAdaptableOptions';
import { AdaptableOptions } from '../../AdaptableOptions/AdaptableOptions';
import { AdaptableEventArgs, AdaptableEventData } from '../../Api/Events/AdaptableEvents';
import { AdaptableComparerFunction } from '../../PredefinedConfig/Common/AdaptableComparerFunction';
import { CellValueType } from '../../PredefinedConfig/Common/Enums';

export function assignadaptableOptions(adaptableOptions: AdaptableOptions): AdaptableOptions {
  const returnadaptableOptions = Object.assign({}, DefaultAdaptableOptions, adaptableOptions);

  returnadaptableOptions.auditOptions = Object.assign(
    {},
    DefaultAdaptableOptions.auditOptions,
    adaptableOptions.auditOptions
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
  returnadaptableOptions.teamSharingOptions = Object.assign(
    {},
    DefaultAdaptableOptions.teamSharingOptions,
    adaptableOptions.teamSharingOptions
  );

  const { predefinedConfig } = returnadaptableOptions;
  if (predefinedConfig) {
    // this customizer function is called by lodash.cloneDeepWith
    // to determine how to clone each property
    const customizer = (value: any) => {
      // so whenever we clone a plain object,
      // we add a Uuid property
      // jw added 9/8/20: unless there is on there already
      if (isPlainObject(value) && value != predefinedConfig) {
        if (value.Uuid == null || value.Uuid == undefined) {
          value.Uuid = createUuid();
        }
      }
    };

    returnadaptableOptions.predefinedConfig = cloneDeepWith(predefinedConfig, customizer);
  }
  return returnadaptableOptions;
}

export function isValidPrimaryKey(adaptable: IAdaptable): boolean {
  const pkColumn: AdaptableColumn = adaptable.api.columnApi.getColumnFromId(
    adaptable.adaptableOptions.primaryKey
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

export function createFDC3Message(type: string, id: any): AdaptableEventArgs {
  let eventData: AdaptableEventData = {
    name: 'Adaptable Event',
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

export function runAdaptableComparerFunction(
  columnId: string,
  columnValues: any[],
  adaptable: IAdaptable
): AdaptableComparerFunction {
  return function compareItemsOfCustomSort(
    valueA: any,
    valueB: any,
    nodeA?: any,
    nodeB?: any
  ): number {
    let firstElementValueString = nodeA
      ? adaptable.getValueFromRowNode(nodeA, columnId, CellValueType.DisplayValue)
      : valueA;

    let secondElementValueString = nodeB
      ? adaptable.getValueFromRowNode(nodeB, columnId, CellValueType.DisplayValue)
      : valueB;

    let indexFirstElement = columnValues.indexOf(firstElementValueString);
    let containsFirstElement = indexFirstElement >= 0;
    let indexSecondElement = columnValues.indexOf(secondElementValueString);
    let containsSecondElement = indexSecondElement >= 0;
    //if none of the element are in the list we jsut return normal compare
    if (!containsFirstElement && !containsSecondElement) {
      if (valueA == valueB) {
        return 0;
      }
      return valueA < valueB ? -1 : 1;
    }
    //if first item not in the list make sure we put it after the second item
    if (!containsFirstElement) {
      return 1;
    }
    //if second item not in the list make sure we put it after the first item
    if (!containsSecondElement) {
      return -1;
    }

    //return the comparison from the list if the two items are in the list
    return indexFirstElement - indexSecondElement;
  };
}

/*
Not a very nice function but it does the trick for Custom Reports
It takes a column id and returns an AdaptableColumn - this is needed for elsewhere in reporting but its a bit hacky
*/
export function createAdaptableColumnFromColumnId(columnId: string): AdaptableColumn {
  return {
    ColumnId: columnId,
    FriendlyName: columnId,
    Filterable: false,
    DataType: 'String',
    ReadOnly: true,
    Sortable: false,
    Visible: false,
    Groupable: false,
    Pivotable: false,
    Aggregatable: false,
    Moveable: true,
    Hideable: true,
    IsSpecialColumn: false,
    IsExcludedFromQuickSearch: false,
    IsSparkline: false,
    IsGrouped: false,
    IsFixed: false,
  };
}

export const AdaptableHelper = {
  assignadaptableOptions,
  isValidPrimaryKey,
  AdaptableObjectExistsInState,
  CheckadaptableOptions,
  createFDC3Message,
  runAdaptableComparerFunction,
  createAdaptableColumnFromColumnId,
};
export default AdaptableHelper;
