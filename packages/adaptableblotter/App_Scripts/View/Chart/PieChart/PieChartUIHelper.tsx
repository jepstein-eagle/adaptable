import { IPieChartDefinition, IPieChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartComponentState } from "./PieChartComponentState";
import { PieChartOthersCategoryType } from "../../../Utilities/Enums";
import { EnumExtensions } from "../../../Utilities/Extensions/EnumExtensions";
import { PieChartLabelPositions } from "../../../Utilities/ChartEnums";
import React from "react";


/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
export module PieChartUIHelper {

  export function setChartDisplayPopupState(chartDefinition: IPieChartDefinition): PieChartComponentState {
    let categoryChartProperties: IPieChartProperties = chartDefinition.ChartProperties as IPieChartProperties

    return {
      ChartProperties: categoryChartProperties,
      IsChartSettingsVisible: true,

      SliceLegendMapping: "ValueAndName",
      IsGeneralMinimised: false,
      IsMiscMinimised: true,
      OthersCategoryThreshold: 0,
      OthersCategoryType: PieChartOthersCategoryType.Number,
      SliceLabelsPosition: "OutsideEnd",

      SliceValuesMapping: "Value",
      SliceLabelsMapping: "Name",
      //     SliceLegendMapping: "ValueAndName",
      //    SliceSortByColumn: "Value Descending",
    }

  }

  export function setDefaultChartDisplayPopupState(): PieChartComponentState {
    let defaultState = {
      IsChartSettingsVisible: true,

      SliceLegendMapping: "ValueAndName",
      IsGeneralMinimised: false,
      IsMiscMinimised: true,
      OthersCategoryThreshold: 0,
      OthersCategoryType: PieChartOthersCategoryType.Number,
      SliceLabelsPosition: "OutsideEnd",

      SliceValuesMapping: "Value",
      SliceLabelsMapping: "Name",

    } as PieChartComponentState;
    return defaultState;
  }


  export function getOptionsForLabelsPosition(): JSX.Element[] {
    let optionElements = EnumExtensions.getNames(PieChartLabelPositions).map((v) => {
      return <option key={v} value={v}>{v as PieChartLabelPositions}</option>
    })
    return optionElements;
  }

}
