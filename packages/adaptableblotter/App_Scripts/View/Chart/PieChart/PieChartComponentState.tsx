import { IPieChartProperties, IPieChartDataItem } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { SliceSortOption } from "../../../Utilities/ChartEnums";



export interface PieChartComponentState {
    DataSource: IPieChartDataItem[];

    IsChartSettingsVisible: boolean;
    ChartProperties: IPieChartProperties;
    IsGeneralMinimised: boolean;
    SliceBrushes: string[]
    SliceSortOption: SliceSortOption;
}
