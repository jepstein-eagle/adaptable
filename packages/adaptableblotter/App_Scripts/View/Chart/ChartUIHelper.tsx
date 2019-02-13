import { ChartDisplayPopupState } from "./ChartDisplayPopupState";
import { IChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { HorizontalAlignment, ChartType, ToolTipType, ChartCrosshairsMode, ChartSize, AxisAngle, LabelVisibility } from "../../Utilities/ChartEnums";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import * as React from "react";
import { IChartProperties } from "../../Utilities/Interface/IChartProperties";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { IColumn } from "../../Utilities/Interface/IColumn";

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
        let optionCrossHairModeTypes = EnumExtensions.getNames(ChartCrosshairsMode).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartCrosshairsMode}</option>
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

    export function getAxisAngleOptions(): JSX.Element[] {
        let optionAxisAngles = EnumExtensions.getNames(AxisAngle).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as AxisAngle}</option>
        })
        return optionAxisAngles;
    }


    export function setChartHeight(chartProperties: IChartProperties): string {
        switch (chartProperties.ChartSize) {
            case ChartSize.XSmall:
                return '350px';
            case ChartSize.Small:
                return '450px';
            case ChartSize.Medium:
                return '600px';
            case ChartSize.Large:
                return '750px';
            case ChartSize.XLarge:
                return '850px';
        }
    }

    export function setChartWidth(chartProperties: IChartProperties, isChartSettingsVisible: boolean): string {
        let chartWidth: number;
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






}