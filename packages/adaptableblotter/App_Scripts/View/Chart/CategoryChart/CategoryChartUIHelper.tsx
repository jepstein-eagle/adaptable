import { ICategoryChartDefinition, ICategoryChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";
import {
  HorizontalAlignment, CategoryChartType, ToolTipType, CrosshairDisplayMode,
  AxisAngle, AxisScale, AxisLabelsLocation, MarkerType, CalloutsType
} from "../../../Utilities/ChartEnums";

import { EnumExtensions } from "../../../Utilities/Extensions/EnumExtensions";
import * as React from "react";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { CategoryChartComponentState } from "./CategoryChartComponentState";

/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
export module CategoryChartUIHelper {

  export function setChartDisplayPopupState(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): CategoryChartComponentState {
    let categoryChartProperties: ICategoryChartProperties = chartDefinition.ChartProperties as ICategoryChartProperties

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
      TitleMargin: (categoryChartProperties.TitleAlignment == HorizontalAlignment.Right) ? 5 : 0,
      SubTitleMargin: (categoryChartProperties.SubTitleAlignment == HorizontalAlignment.Right) ? 5 : 0

    }

  }

  function isDefaultYAxisTitle(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): boolean {
    let categoryChartProperties: ICategoryChartProperties = chartDefinition.ChartProperties as ICategoryChartProperties
    return StringExtensions.IsNullOrEmpty(categoryChartProperties.YAxisTitle) ||
      categoryChartProperties.YAxisTitle == createDefaultYAxisTitle(chartDefinition, columns);
  }

  function isDefaultXAxisTitle(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): boolean {
    let categoryChartProperties: ICategoryChartProperties = chartDefinition.ChartProperties as ICategoryChartProperties
    return StringExtensions.IsNullOrEmpty(categoryChartProperties.XAxisTitle) ||
      categoryChartProperties.XAxisTitle == createDefaultXAxisTitle(chartDefinition, columns);
  }

  export function createDefaultYAxisTitle(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): string {
    return chartDefinition.YAxisColumnIds.map(c => {
      return ColumnHelper.getFriendlyNameFromColumnId(c, columns)
    }).join(', ')
  }

  export function createDefaultXAxisTitle(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): string {
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
      UseDefaultXAxisTitle: true
    } as CategoryChartComponentState;
    return defaultState;
  }


  export function getChartTypeOptions(): JSX.Element[] {
    let optionChartTypes = EnumExtensions.getNames(CategoryChartType).map((enumName) => {
      return <option key={enumName} value={enumName}>{enumName as CategoryChartType}</option>
    })
    return optionChartTypes;
  }

  export function getToolTipOptions(): JSX.Element[] {
    let optionToolTipTypes = EnumExtensions.getNames(ToolTipType).map((enumName) => {
      return <option key={enumName} value={enumName}>{enumName as ToolTipType}</option>
    })
    return optionToolTipTypes;
  }

  export function getCrossHairModeOptions(): JSX.Element[] {
    let optionCrossHairModeTypes = EnumExtensions.getNames(CrosshairDisplayMode).map((enumName) => {
      return <option key={enumName} value={enumName}>{enumName as CrosshairDisplayMode}</option>
    })
    return optionCrossHairModeTypes;
  }

  export function getAlignmentOptions(): JSX.Element[] {
    let optionAligments = EnumExtensions.getNames(HorizontalAlignment).map((enumName) => {
      return <option key={enumName} value={enumName}>{enumName as HorizontalAlignment}</option>
    })
    return optionAligments;
  }

  export function getMarkerTypeOptions(): JSX.Element[] {
    let options = EnumExtensions.getNames(MarkerType).map((enumName) => {
      let name = enumName.toString();
      return <option key={name} value={name}>{name}</option>
    })
    return options;
  }

  export function getMarkerFromProps(chartProps: ICategoryChartProperties): string {
    let chartType = chartProps.CategoryChartType;
    let markerType = chartProps.MarkerType;
    // resolves marker for specified chart type since some chart types should hide markers by default
    if (markerType === "Default" || markerType === "Unset") {
      return chartType == CategoryChartType.Point ? "Circle" : "None";
    } else {
      return markerType // return marker that the user selected
    }
  }

  export function getYAxisLabelsLocations(): JSX.Element[] {
    let options = [
      <option key="Left" value={AxisLabelsLocation.OutsideLeft}>Left</option>,
      <option key="Right" value={AxisLabelsLocation.OutsideRight}>Right</option>,
    ]
    return options;
  }

  export function getXAxisLabelsLocations(): JSX.Element[] {
    let options = [
      <option key="Top" value={AxisLabelsLocation.OutsideTop}>Top</option>,
      <option key="Bottom" value={AxisLabelsLocation.OutsideBottom}>Bottom</option>,
    ]
    return options;
  }

  export function getAxisAngleOptions(): JSX.Element[] {
    let options = EnumExtensions.getNames(AxisAngle).map((enumName) => {
      return <option key={enumName} value={enumName}>{enumName as AxisAngle}</option>
    })
    return options;
  }

  export function getAxisLabelScales(): JSX.Element[] {
    let options = EnumExtensions.getNames(AxisScale).map((enumName) => {
      return <option key={enumName} value={enumName}>{enumName as AxisScale}</option>
    })
    return options;
  }

  export function getCalloutTypeOptions(): JSX.Element[] {
    let options = EnumExtensions.getNames(CalloutsType).map((enumName) => {
      let name = enumName.toString();
      // adding known callouts as strings because we will add non-numeric properties from data source in future
      return <option key={name} value={name}>{name}</option>
    })
    // TODO get non-numeric properties from data source and then add them to above options:
    // <option key={PropName} value={PropName}>PropName</option>,
    return options;
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
    let item = chartData[0];
    let dataProps = Object.keys(item);
    return dataProps;
  }

  // TODO ideally we should get names of numeric using IChartDefinition.YAxisColumnIds instead of:
  export function getNumericProperties(chartData: any): string[] {
    if (chartData === undefined) {
      return [];
    }
    let dataItem = chartData[0];
    let allProps = Object.keys(dataItem);
    let dataProps: string[] = [];

    allProps.forEach((name: string) => {
      let dataValue = dataItem[name];
      if (typeof (dataValue) === "number") {
        dataProps.push(name);
      }
    });
    // console.log("getNumericProperties " + dataProps);
    return dataProps;
  }

  export function getCalloutsData(chartData: any, chartProps: ICategoryChartProperties): any[] {
    // TODO ideally we should get names of numeric using IChartDefinition.YAxisColumnIds instead of this:
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

    // users can filter out callouts and thus improve chart performance using IChartProperties.CalloutsInterval
    // perhaps this should depend on IChartProperties.XAxisInterval (when added) so that callouts align with labels on XAxis
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
        CalloutsLabel: "MAX " + maxValue.toFixed(1),
        CalloutsIndex: maxIndex,
        CalloutsValue: maxValue,
        MemberPath: columnName
      });
      callouts.push({
        CalloutsLabel: "MIN " + minValue.toFixed(1),
        CalloutsIndex: minIndex,
        CalloutsValue: minValue,
        MemberPath: columnName
      });
    });

    return callouts;
  }

  export function getCalloutsDataChanges(chartData: any, numericProps: string[], showPercentages: boolean): any[] {
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
        let itemLabel = itemChange >= 0 ? "+" : "";

        if (showPercentages) {
          itemChange = itemChange / itemPrevious[column] * 100.0
          itemLabel = itemLabel + itemChange.toFixed(0) + "%";
        } else {
          itemLabel = itemLabel + itemChange.toFixed(1);
        }

        callouts.push({
          CalloutsLabel: itemLabel,
          CalloutsValue: itemCurrent[column],
          CalloutsIndex: i,
          MemberPath: column
        });
      };
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
          MemberPath: column
        });
      };
    });
    return callouts;
  }


}