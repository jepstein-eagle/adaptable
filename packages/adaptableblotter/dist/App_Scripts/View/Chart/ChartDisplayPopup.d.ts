import * as React from "react";
import { IChartDefinition, IChartProperties } from "../../Utilities/Interface/IAdaptableBlotterObjects";
export interface ChartDisplayPopupWizardState {
    IsChartSettingsVisible: boolean;
    EditedChartDefinition: IChartDefinition;
    ChartProperties: IChartProperties;
    IsGeneralMinimised: boolean;
    SetYAxisMinimumValue: boolean;
    SetYAxisLabelColor: boolean;
    SetYAxisTitleColor: boolean;
    IsYAxisMinimised: boolean;
    UseDefaultYAxisTitle: boolean;
    IsXAxisMinimised: boolean;
    SetXAxisLabelColor: boolean;
    SetXAxisTitleColor: boolean;
    UseDefaultXAxisTitle: boolean;
    IsMiscMinimised: boolean;
    TitleMargin: number;
    SubTitleMargin: number;
}
export declare let ChartDisplayPopup: React.ComponentClass<{}, any>;
