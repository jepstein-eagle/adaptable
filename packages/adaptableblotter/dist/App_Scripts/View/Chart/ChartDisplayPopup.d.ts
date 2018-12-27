import * as React from "react";
import { IChartDefinition, IChartProperties } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ChartSize } from "../../Utilities/ChartEnums";
export interface ChartDisplayPopupWizardState {
    IsChartMinimised: boolean;
    IsChartSettingsVisible: boolean;
    EditedChartDefinition: IChartDefinition;
    ChartProperties: IChartProperties;
    ChartSize: ChartSize;
    IsGeneralMinimised: boolean;
    SetYAxisMinimumValue: boolean;
    SetYAxisLabelColor: boolean;
    SetYAxisTitleColor: boolean;
    IsYAxisMinimised: boolean;
    IsXAxisMinimised: boolean;
    SetXAxisLabelColor: boolean;
    SetXAxisTitleColor: boolean;
    IsMiscMinimised: boolean;
    TitleMargin: number;
    SubTitleMargin: number;
}
export declare let ChartDisplayPopup: React.ComponentClass<any, any>;
