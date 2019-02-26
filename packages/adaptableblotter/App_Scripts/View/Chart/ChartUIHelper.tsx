import { ChartDisplayPopupState } from "./ChartDisplayPopupState";
import { IChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { HorizontalAlignment, ChartType, ToolTipType, CrosshairDisplayMode, ChartSize,
  AxisAngle, AxisScale, AxisLabelsLocation,
  LabelVisibility, MarkerType } from "../../Utilities/ChartEnums";

import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import * as React from "react";
import { IChartProperties } from "../../Utilities/Interface/IChartProperties";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { IColumn } from "../../Utilities/Interface/IColumn";

/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
export module ChartUIHelper {

    export function setChartDisplayPopupState(chartDefinition: IChartDefinition, columns: IColumn[]): ChartDisplayPopupState {
        return {
            ChartProperties: chartDefinition.ChartProperties,
            EditedChartDefinition: null,
            IsChartSettingsVisible: false,

            // General
            IsGeneralMinimised: false,

            // Y Axis
            IsYAxisMinimised: true,
            SetYAxisMinimumValue: chartDefinition.ChartProperties.YAxisMinimumValue != undefined,
            SetYAxisMaximumValue: chartDefinition.ChartProperties.YAxisMaximumValue != undefined,
            SetYAxisLabelColor: StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.YAxisLabelColor),
            SetYAxisTitleColor: StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.YAxisTitleColor),
            UseDefaultYAxisTitle: isDefaultYAxisTitle(chartDefinition, columns), // StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.YAxisTitle),

            // X Axis
            IsXAxisMinimised: true,
            SetXAxisLabelColor: StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.XAxisLabelColor),
            SetXAxisTitleColor: StringExtensions.IsNotNullOrEmpty(chartDefinition.ChartProperties.XAxisTitleColor),
            UseDefaultXAxisTitle: isDefaultXAxisTitle(chartDefinition, columns), // StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.XAxisTitle),

            // Highlights
            IsHighlightsMinimised: true,

            // Misc
            IsMiscMinimised: true,
            TitleMargin: (chartDefinition.ChartProperties.TitleAlignment == HorizontalAlignment.Right) ? 5 : 0,
            SubTitleMargin: (chartDefinition.ChartProperties.SubTitleAlignment == HorizontalAlignment.Right) ? 5 : 0

        }

    }

    function isDefaultYAxisTitle(chartDefinition: IChartDefinition, columns: IColumn[]): boolean {
        return StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.YAxisTitle) ||
            chartDefinition.ChartProperties.YAxisTitle == createDefaultYAxisTitle(chartDefinition, columns);
    }

    function isDefaultXAxisTitle(chartDefinition: IChartDefinition, columns: IColumn[]): boolean {
        return StringExtensions.IsNullOrEmpty(chartDefinition.ChartProperties.XAxisTitle) ||
            chartDefinition.ChartProperties.XAxisTitle == createDefaultXAxisTitle(chartDefinition, columns);
    }

  export  function createDefaultYAxisTitle(chartDefinition: IChartDefinition, columns: IColumn[]): string {
        return chartDefinition.YAxisColumnIds.map(c => {
            return ColumnHelper.getFriendlyNameFromColumnId(c, columns)
        }).join(', ')
    }

  export  function createDefaultXAxisTitle(chartDefinition: IChartDefinition, columns: IColumn[]): string {
        let returnString: string = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
        if (StringExtensions.IsNotNullOrEmpty(chartDefinition.XSegmentColumnId)) {
            returnString = returnString + " (by " + ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XSegmentColumnId, columns) + ")"
        }
        return returnString;
    }

    export function setDefaultChartDisplayPopupState(): ChartDisplayPopupState {
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
        } as ChartDisplayPopupState;
        return defaultState;
    }


    export function getChartTypeOptions(): JSX.Element[] {
        let optionChartTypes = EnumExtensions.getNames(ChartType).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartType}</option>
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

    export function getChartSizeOptions(): JSX.Element[] {
        let optionChartSizes = EnumExtensions.getNames(ChartSize).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartSize}</option>
        })
        return optionChartSizes;
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

    export function getMarkerFromProps(chartProps: IChartProperties): string {
      let chartType = chartProps.ChartType;
      let markerType = chartProps.MarkerType;
      return getMarkerFor(chartType, markerType);
    }

    export function getMarkerFor(charType: ChartType, markerType: string): string {
      // resolves marker for specified chart type since some charts have markers hidden by default
      if (markerType === "Default" || markerType === "Unset") {
        markerType = charType == ChartType.Point ? "Automatic" : "None";
      } else {
        // markerType is unchanged and we show markers that the user wants
      }
      return markerType;
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

    export function setChartHeight(chartProperties: IChartProperties): string {
      return '450px';
        // switch (chartProperties.ChartSize) {
        //     case ChartSize.XSmall:
        //         return '350px';
        //     case ChartSize.Small:
        //         return '450px';
        //     case ChartSize.Medium:
        //         return '600px';
        //     case ChartSize.Large:
        //         return '750px';
        //     case ChartSize.XLarge:
        //         return '850px';
        // }
    }

    export function setChartWidth(chartProperties: IChartProperties, isChartSettingsVisible: boolean): string {
        let chartWidth: number;
        // chartWidth = (isChartSettingsVisible) ? 1050 : 1350;
        switch (chartProperties.ChartSize) {
            case ChartSize.XSmall:
                chartWidth = (isChartSettingsVisible) ? 375 : 600
                break;
            case ChartSize.Small:
                chartWidth = (isChartSettingsVisible) ? 525 : 850
                break;
            case ChartSize.Medium:
                chartWidth = (isChartSettingsVisible) ? 750 : 1100
                break;
            case ChartSize.Large:
                chartWidth = (isChartSettingsVisible) ? 1050 : 1350
                break;
            case ChartSize.XLarge:
                chartWidth = (isChartSettingsVisible) ? 1200 : 1600
                break;
        }
        chartWidth = (chartProperties.XAxisLabelVisibility == LabelVisibility.Visible) ? chartWidth : chartWidth - 10;
        return chartWidth + 'px'
    }

    export function setPanelWidth(chartProperties: IChartProperties): string {
        switch (chartProperties.ChartSize) {
            case ChartSize.XSmall:
                return '650px';
            case ChartSize.Small:
                return '900px';
            case ChartSize.Medium:
                return '1150px';
            case ChartSize.Large:
                return '1400px';
            case ChartSize.XLarge:
                return '1650px';
        }
    }

    export function setChartColumnSize(chartProperties: IChartProperties): number {
        switch (chartProperties.ChartSize) {
            case ChartSize.XSmall:
            case ChartSize.Small:
                return 7;
            case ChartSize.Medium:
                return 8;
            case ChartSize.Large:
            case ChartSize.XLarge:
                return 9;
        }
    }

    export function setLegendColumnSize(chartProperties: IChartProperties): number {
        switch (chartProperties.ChartSize) {
            case ChartSize.XSmall:
            case ChartSize.Small:
                return 5;
            case ChartSize.Medium:
                return 4;
            case ChartSize.Large:
            case ChartSize.XLarge:
                return 3;
        }
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

    export function getDataProperties(chartData: any): string[] {
      if (chartData === undefined){
        return [];
      }
      let item = chartData[0];
      let allProps = Object.keys(item);
      let dataProps: string[] = [];
      allProps.forEach((name: string) => {
        // excluding Callouts properties, e.g. CalloutsIndex
        if (!name.startsWith("Callouts")){
          dataProps.push(name);
        }
      });
      console.log("getDataProperties " + dataProps);
      return dataProps; //["CalloutsIndex"];
    }

    export function getNumericProperties(chartData: any): string[] {
      if (chartData === undefined){
        return [];
      }
      let dataItem = chartData[0];
      let allProps = Object.keys(dataItem);
      let dataProps: string[] = [];

      // console.log("getNumericProperties " + isNaN("2").tostring);

      allProps.forEach((name: string) => {
        // excluding Callouts properties, e.g. CalloutsIndex
        let dataValue = dataItem[name];
        if (typeof(dataValue) === "number"){
          dataProps.push(name);
        }
      });
      console.log("getNumericProperties " + dataProps);
      return dataProps;
    }


    export function getDataCallouts(chartData: any): any[] {
      if (chartData === undefined){
        return undefined;
      }

      let callouts: any[] = [];

      let numericProps = getNumericProperties(chartData);
      numericProps.forEach((name: string) => {
        let prevValue: number = 0;
        let gainValue: number = Number.MIN_VALUE;
        let gainChange: number = Number.MIN_VALUE;
        let gainIndex: number = 0;
        let dropChange: number = Number.MAX_VALUE;
        let dropValue: number = Number.MAX_VALUE;
        let dropIndex: number = 0;

        let minValue: number = Number.MAX_VALUE;
        let minIndex: number = 0;
        let maxValue: number = Number.MIN_VALUE;
        let maxIndex: number = 0;
        let itemIndex = 0;

        chartData.forEach((item: any) => {
          let itemValue = item[name];
          let itemChange = item[name] - prevValue;

          let info = (itemIndex + 1) + ", v=" + itemValue.toFixed(2)+ ", d=" + itemChange.toFixed(2);

          if (itemIndex > 0 &&
              gainChange < itemChange) {
              gainChange = itemChange;
              gainValue = itemValue;
              gainIndex = itemIndex;
          }

          if (itemIndex > 0 &&
              dropChange > itemChange) {
              dropChange = itemChange;
              dropValue = itemValue;
              dropIndex = itemIndex;
              console.log("d " + info + " changed to " + dropChange.toFixed(2));
          } else {
              console.log("d " + info);
          }

          if (minValue > itemValue) {
              minValue = itemValue;
              minIndex = itemIndex;
          }
          if (maxValue < itemValue) {
              maxValue = itemValue;
              maxIndex = itemIndex;
          }

            callouts.push({
                ItemLabel: itemValue.toFixed(1),
                ItemIndex: itemIndex,
                ItemValue: itemValue,
                MemberPath: name
            });

            prevValue = itemValue;
            itemIndex++;
        });

        callouts.push({
            CalloutsLabel: "BIGGEST GAIN",
            CalloutsIndex: gainIndex,
            CalloutsValue: gainValue,
            MemberPath: name
        });
        callouts.push({
            CalloutsLabel: "BIGGEST DROP",
            CalloutsIndex: dropIndex,
            CalloutsValue: dropValue,
            MemberPath: name
        });

        callouts.push({
          CalloutsLabel: "MAX",
          CalloutsIndex: maxIndex,
          CalloutsValue: maxValue,
          MemberPath: name
        });
        callouts.push({
            CalloutsLabel: "MIN",
            CalloutsIndex: minIndex,
            CalloutsValue: minValue,
            MemberPath: name
        });

      });

      console.log("getCalloutData " + callouts.length);
      return callouts;
    }




}
