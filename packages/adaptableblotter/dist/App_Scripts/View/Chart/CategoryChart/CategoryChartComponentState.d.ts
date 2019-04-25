import { ICategoryChartProperties } from "../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
export interface CategoryChartComponentState {
    IsChartSettingsVisible: boolean;
    ChartProperties: ICategoryChartProperties;
    IsGeneralMinimised: boolean;
    SetYAxisMinimumValue: boolean;
    SetYAxisMaximumValue: boolean;
    SetYAxisLabelColor: boolean;
    SetYAxisTitleColor: boolean;
    IsYAxisMinimised: boolean;
    UseDefaultYAxisTitle: boolean;
    IsXAxisMinimised: boolean;
    SetXAxisLabelColor: boolean;
    SetXAxisTitleColor: boolean;
    UseDefaultXAxisTitle: boolean;
    IsHighlightsMinimised: boolean;
    IsMiscMinimised: boolean;
    TitleMargin: number;
    SubTitleMargin: number;
}
