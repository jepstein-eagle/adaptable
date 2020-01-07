import * as React from 'react';
import {
  SparklinesChartDefinition,
  SparklineChartProperties,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SparklinesChartComponentState } from './SparklinesChartComponentState';
import { DefaultSparklinesChartProperties } from '@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import EnumExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/EnumExtensions';

/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
 */

export function setChartDisplayPopupState(
  chartDefinition: SparklinesChartDefinition
): SparklinesChartComponentState {
  let sparklinesChartProperties: SparklineChartProperties = Object.assign(
    {},
    DefaultSparklinesChartProperties,
    chartDefinition.ChartProperties
  );

  return {
    ChartProperties: sparklinesChartProperties,
    IsChartSettingsVisible: false,
  };
}

export function getChartTypeOptions(): { label: SparklineTypeEnum; value: SparklineTypeEnum }[] {
  return EnumExtensions.getNames(SparklineTypeEnum).map(enumName => {
    return {
      label: enumName as SparklineTypeEnum,
      value: enumName as SparklineTypeEnum,
    };
  });
}

// TODO see a note in BuildChartData function
export function getDataProperties(chartData: any): string[] {
  if (chartData === undefined) {
    return [];
  }
  let dataItem = chartData[0];
  if (dataItem === undefined || dataItem === null) {
    return [];
  }
  let dataProps = Object.keys(dataItem);
  return dataProps;
}

// TODO ideally we should get names of numeric using ChartDefinition.YAxisColumnIds instead of:
export function getNumericProperties(chartData: any): string[] {
  if (chartData === undefined || chartData === null) {
    return [];
  }
  let dataItem = chartData[0];
  if (dataItem === undefined || dataItem === null) {
    return [];
  }
  let allProps = Object.keys(dataItem);
  let dataProps: string[] = [];

  allProps.forEach((name: string) => {
    let dataValue = dataItem[name];
    if (typeof dataValue === 'number') {
      dataProps.push(name);
    }
  });
  return dataProps;
}

export const SparklinesChartUIHelper = {
  setChartDisplayPopupState,
  getChartTypeOptions,
  getDataProperties,
  getNumericProperties,
};
export default SparklinesChartUIHelper;
