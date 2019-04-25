import { IPieChartProperties } from "../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
import { IPieChartDataItem } from "../../../Utilities/Interface/BlotterObjects/Charting/IPieChartDataItem";
import { SliceSortOption } from "../../../Utilities/ChartEnums";
export interface PieChartComponentState {
    DataSource: IPieChartDataItem[];
    IsChartSettingsVisible: boolean;
    ChartProperties: IPieChartProperties;
    IsGeneralMinimised: boolean;
    SliceBrushes: string[];
    SliceSortOption: SliceSortOption;
}
