import { IChartDefinition, IChartProperties, ICategoryChartProperties, IPieChartDefinition, IPieChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartOthersCategoryType } from "../../../Utilities/Enums";



export interface PieChartComponentState {
    // Global
    IsChartSettingsVisible: boolean;
    ChartProperties: IPieChartProperties;
    // General
    IsGeneralMinimised: boolean;
     // Misc
    IsMiscMinimised: boolean;
    

    SliceLegendMapping: string;

    OthersCategoryThreshold: number;
    OthersCategoryType: PieChartOthersCategoryType;

    SliceLabelsPosition: string; // should be enum in due course..
  //  SliceLabelsPosition: string;
    SliceLabelsMapping: string;
    SliceValuesMapping: string;
   // SliceSortByColumn: string;
   // SliceBrushes: string[];
}
