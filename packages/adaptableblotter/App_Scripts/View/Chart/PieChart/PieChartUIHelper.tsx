import { IPieChartDefinition, IPieChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartComponentState } from "./PieChartComponentState";


/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
export module PieChartUIHelper {

  export function setChartDisplayPopupState(chartDefinition: IPieChartDefinition): PieChartComponentState {
    let categoryChartProperties: IPieChartProperties = chartDefinition.ChartProperties as IPieChartProperties

    return {
      ChartProperties: categoryChartProperties,
      IsChartSettingsVisible: false,

      // General
      IsGeneralMinimised: false,


      // Misc
      IsMiscMinimised: true,

    }

  }

  export function setDefaultChartDisplayPopupState(): PieChartComponentState {
    let defaultState = {
      IsGeneralMinimised: false,
      IsMiscMinimised: true,
    } as PieChartComponentState;
    return defaultState;
  }


}
