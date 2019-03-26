import { IChartDefinition, IChartProperties, ICategoryChartProperties, IPieChartDefinition, IPieChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";



export interface PieChartComponentState {
    // Global
    IsChartSettingsVisible: boolean;
    ChartProperties: IPieChartProperties;
    // General
    IsGeneralMinimised: boolean;
     // Misc
    IsMiscMinimised: boolean;
    
}
