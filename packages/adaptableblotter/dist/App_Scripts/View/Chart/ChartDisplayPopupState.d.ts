import { IChartProperties } from "../../Utilities/Interface/IChartProperties";
import { IChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
export interface ChartDisplayPopupState {
    IsChartSettingsVisible: boolean;
    EditedChartDefinition: IChartDefinition;
    ChartProperties: IChartProperties;
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
