import {
  CategoryChartDefinition,
  CategoryChartProperties,
} from '../../../PredefinedConfig/ChartState';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import {
  HorizontalAlignment,
  CategoryChartType,
  ToolTipType,
  CrosshairDisplayMode,
  AxisAngle,
  AxisScale,
  AxisLabelsLocation,
  MarkerType,
  CalloutsType,
} from '../../../PredefinedConfig/Common/ChartEnums';

import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import * as React from 'react';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { CategoryChartComponentState } from './CategoryChartComponentState';
import { DefaultCategoryChartProperties } from '../../../Utilities/Defaults/DefaultCategoryChartProperties';

/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
 */

export function setChartDisplayPopupState(
  chartDefinition: CategoryChartDefinition,
  columns: AdaptableBlotterColumn[]
): CategoryChartComponentState {
  let categoryChartProperties: CategoryChartProperties = Object.assign(
    {},
    DefaultCategoryChartProperties,
    chartDefinition.ChartProperties
  );

  return {
    ChartProperties: categoryChartProperties,
    IsChartSettingsVisible: false,

    // General
    IsGeneralMinimised: false,

    // Y Axis
    IsYAxisMinimised: true,
    SetYAxisMinimumValue: categoryChartProperties.YAxisMinimumValue != undefined,
    SetYAxisMaximumValue: categoryChartProperties.YAxisMaximumValue != undefined,
    SetYAxisLabelColor: StringExtensions.IsNotNullOrEmpty(categoryChartProperties.YAxisLabelColor),
    SetYAxisTitleColor: StringExtensions.IsNotNullOrEmpty(categoryChartProperties.YAxisTitleColor),
    UseDefaultYAxisTitle: isDefaultYAxisTitle(chartDefinition, columns), // StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.YAxisTitle),

    // X Axis
    IsXAxisMinimised: true,
    SetXAxisLabelColor: StringExtensions.IsNotNullOrEmpty(categoryChartProperties.XAxisLabelColor),
    SetXAxisTitleColor: StringExtensions.IsNotNullOrEmpty(categoryChartProperties.XAxisTitleColor),
    UseDefaultXAxisTitle: isDefaultXAxisTitle(chartDefinition, columns), // StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.XAxisTitle),

    // Highlights
    IsHighlightsMinimised: true,

    // Misc
    IsMiscMinimised: true,
    TitleMargin: categoryChartProperties.TitleAlignment == HorizontalAlignment.Right ? 5 : 0,
    SubTitleMargin: categoryChartProperties.SubTitleAlignment == HorizontalAlignment.Right ? 5 : 0,
  };
}

function isDefaultYAxisTitle(
  chartDefinition: CategoryChartDefinition,
  columns: AdaptableBlotterColumn[]
): boolean {
  let categoryChartProperties: CategoryChartProperties = chartDefinition.ChartProperties as CategoryChartProperties;
  return (
    StringExtensions.IsNullOrEmpty(categoryChartProperties.YAxisTitle) ||
    categoryChartProperties.YAxisTitle == createDefaultYAxisTitle(chartDefinition, columns)
  );
}

function isDefaultXAxisTitle(
  chartDefinition: CategoryChartDefinition,
  columns: AdaptableBlotterColumn[]
): boolean {
  let categoryChartProperties: CategoryChartProperties = chartDefinition.ChartProperties as CategoryChartProperties;
  return (
    StringExtensions.IsNullOrEmpty(categoryChartProperties.XAxisTitle) ||
    categoryChartProperties.XAxisTitle == createDefaultXAxisTitle(chartDefinition, columns)
  );
}

export function createDefaultYAxisTitle(
  chartDefinition: CategoryChartDefinition,
  columns: AdaptableBlotterColumn[]
): string {
  return chartDefinition.YAxisColumnIds.map(c => {
    return ColumnHelper.getFriendlyNameFromColumnId(c, columns);
  }).join(', ');
}

export function createDefaultXAxisTitle(
  chartDefinition: CategoryChartDefinition,
  columns: AdaptableBlotterColumn[]
): string {
  return ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
}

export function setDefaultChartDisplayPopupState(): CategoryChartComponentState {
  let defaultState = {
    IsGeneralMinimised: false,
    IsYAxisMinimised: true,
    SetYAxisMinimumValue: false,
    SetYAxisLabelColor: false,
    SetYAxisTitleColor: false,
    IsXAxisMinimised: true,
    SetXAxisLabelColor: false,
    SetXAxisTitleColor: false,
    IsMiscMinimised: true,
    TitleMargin: 0,
    SubTitleMargin: 0,
    UseDefaultXAxisTitle: true,
  } as CategoryChartComponentState;
  return defaultState;
}

export function getChartTypeOptions(): { label: CategoryChartType; value: CategoryChartType }[] {
  return EnumExtensions.getNames(CategoryChartType).map(enumName => {
    return {
      label: enumName as CategoryChartType,
      value: enumName as CategoryChartType,
    };
  });
}

export function getToolTipOptions(): { label: string; value: string }[] {
  let optionToolTipTypes = EnumExtensions.getNames(ToolTipType).map(enumName => {
    return {
      label: enumName,
      value: enumName,
    };
  });
  return optionToolTipTypes;
}

export function getCrossHairModeOptions(): { label: string; value: string }[] {
  return EnumExtensions.getNames(CrosshairDisplayMode).map(enumName => {
    return {
      label: enumName,
      value: enumName,
    };
  });
}

export function getAlignmentOptions(): { label: string; value: string }[] {
  return EnumExtensions.getNames(HorizontalAlignment).map(enumName => {
    return {
      label: enumName,
      value: enumName,
    };
  });
}

export function getMarkerTypeOptions(): { label: string; value: string }[] {
  return EnumExtensions.getNames(MarkerType).map(enumName => {
    let name = enumName.toString();
    return {
      label: name,
      value: name,
    };
  });
}

export function getMarkerFromProps(chartProps: CategoryChartProperties): string {
  let chartType = chartProps.CategoryChartType;
  let markerType = chartProps.MarkerType;
  // resolves marker for specified chart type since some chart types should hide markers by default
  if (markerType === 'Default' || markerType === 'Unset') {
    return chartType == CategoryChartType.Point ? 'Circle' : 'None';
  } else {
    return markerType; // return marker that the user selected
  }
}

export function getYAxisLabelsLocations(): { label: string; value: string }[] {
  return [
    { value: AxisLabelsLocation.OutsideLeft, label: 'Left' },
    { value: AxisLabelsLocation.OutsideRight, label: 'Right' },
  ];
}

export function getXAxisLabelsLocations(): JSX.Element[] {
  let options = [
    <option key="Top" value={AxisLabelsLocation.OutsideTop}>
      Top
    </option>,
    <option key="Bottom" value={AxisLabelsLocation.OutsideBottom}>
      Bottom
    </option>,
  ];
  return options;
}

export function getAxisAngleOptions(): { label: string; value: string }[] {
  return EnumExtensions.getNames(AxisAngle).map(enumName => {
    return { value: enumName, label: enumName };
  });
}

export function getAxisLabelScales(): { label: AxisScale; value: AxisScale }[] {
  return EnumExtensions.getNames(AxisScale).map((enumName: AxisScale) => {
    return {
      value: enumName,
      label: enumName,
    };
  });
}

export function getCalloutTypeOptions(): { label: string; value: string }[] {
  return EnumExtensions.getNames(CalloutsType).map(enumName => {
    let name = enumName.toString();
    // adding known callouts as strings because we will add non-numeric properties from data source in future
    return { label: name, value: name };
  });
}

export function getAngleFromEnum(axisAngle: AxisAngle): number {
  switch (axisAngle) {
    case AxisAngle.Horizontal:
      return 0;
    case AxisAngle.Diagonal:
      return 45;
    case AxisAngle.Vertical:
      return 90;
  }
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

export function getCalloutsData(chartData: any, chartProps: CategoryChartProperties): any[] {
  // TODO ideally we should get names of numeric using ChartDefinition.YAxisColumnIds instead of this:
  let numericProps = getNumericProperties(chartData);

  let callouts: any[] = [];
  if (chartProps.CalloutsType == CalloutsType.DataRanges) {
    // skipping filtering of callouts for DataRanges because there are only 2 callouts for each Y-column
    return getCalloutsDataRanges(chartData, numericProps);
  } else if (chartProps.CalloutsType == CalloutsType.DataChangesInValues) {
    callouts = getCalloutsDataChanges(chartData, numericProps, false);
  } else if (chartProps.CalloutsType == CalloutsType.DataChangesInPercentage) {
    callouts = getCalloutsDataChanges(chartData, numericProps, true);
  } else if (chartProps.CalloutsType == CalloutsType.DataPoints) {
    callouts = getCalloutsDataPoints(chartData, numericProps);
  } else if (chartProps.CalloutsType == CalloutsType.None) {
    return [];
  } else {
    // TODO implement a function for getting values a column named dataColumn from chartData
  }

  // users can filter out callouts and thus improve chart performance using ChartProperties.CalloutsInterval
  // perhaps this should depend on ChartProperties.XAxisInterval (when added) so that callouts align with labels on XAxis
  let filtered: any[] = [];
  for (let i = 0; i < callouts.length; i++) {
    if (i % chartProps.CalloutsInterval == 0) {
      filtered.push(callouts[i]);
    }
  }
  return filtered;
}

export function getCalloutsDataRanges(chartData: any, numericProps: string[]): any[] {
  let callouts: any[] = [];

  numericProps.forEach((columnName: string) => {
    // setting initial values that will catch first values of an item
    let minValue: number = Number.MAX_VALUE;
    let maxValue: number = Number.MIN_VALUE;
    let minIndex: number = 0;
    let maxIndex: number = 0;

    // find index and MIN/MAX values of each data column
    for (let i = 0; i < chartData.length; i++) {
      const item = chartData[i];
      let itemValue = item[columnName];
      if (minValue > itemValue) {
        minValue = itemValue;
        minIndex = i;
      }
      if (maxValue < itemValue) {
        maxValue = itemValue;
        maxIndex = i;
      }
    }
    // add callouts for MIN/MAX values of each data column
    callouts.push({
      CalloutsLabel: 'MAX ' + maxValue.toFixed(1),
      CalloutsIndex: maxIndex,
      CalloutsValue: maxValue,
      MemberPath: columnName,
    });
    callouts.push({
      CalloutsLabel: 'MIN ' + minValue.toFixed(1),
      CalloutsIndex: minIndex,
      CalloutsValue: minValue,
      MemberPath: columnName,
    });
  });

  return callouts;
}

export function getCalloutsDataChanges(
  chartData: any,
  numericProps: string[],
  showPercentages: boolean
): any[] {
  let callouts: any[] = [];
  if (chartData.length < 2) {
    return callouts;
  }

  numericProps.forEach((column: string) => {
    // calculate changes between consecutive items for each data column
    for (let i = 1; i < chartData.length; i++) {
      const itemCurrent = chartData[i];
      const itemPrevious = chartData[i - 1];
      let itemChange = itemCurrent[column] - itemPrevious[column];
      let itemLabel = itemChange >= 0 ? '+' : '';

      if (showPercentages) {
        itemChange = (itemChange / itemPrevious[column]) * 100.0;
        itemLabel = itemLabel + itemChange.toFixed(0) + '%';
      } else {
        itemLabel = itemLabel + itemChange.toFixed(1);
      }

      callouts.push({
        CalloutsLabel: itemLabel,
        CalloutsValue: itemCurrent[column],
        CalloutsIndex: i,
        MemberPath: column,
      });
    }
  });
  return callouts;
}

export function getCalloutsDataPoints(chartData: any, numericProps: string[]): any[] {
  let callouts: any[] = [];
  numericProps.forEach((column: string) => {
    // get values of consecutive items for each data column
    for (let i = 0; i < chartData.length; i++) {
      const itemCurrent = chartData[i];
      callouts.push({
        CalloutsLabel: itemCurrent[column].toFixed(1),
        CalloutsValue: itemCurrent[column],
        CalloutsIndex: i,
        MemberPath: column,
      });
    }
  });
  return callouts;
}

export const CategoryChartUIHelper = {
  setChartDisplayPopupState,
  createDefaultYAxisTitle,
  createDefaultXAxisTitle,
  setDefaultChartDisplayPopupState,
  getChartTypeOptions,
  getToolTipOptions,
  getCrossHairModeOptions,
  getAlignmentOptions,
  getMarkerTypeOptions,
  getMarkerFromProps,
  getYAxisLabelsLocations,
  getXAxisLabelsLocations,
  getAxisAngleOptions,
  getAxisLabelScales,
  getCalloutTypeOptions,
  getAngleFromEnum,
  getDataProperties,
  getNumericProperties,
  getCalloutsData,
  getCalloutsDataRanges,
  getCalloutsDataChanges,
  getCalloutsDataPoints,
};
export default CategoryChartUIHelper;
