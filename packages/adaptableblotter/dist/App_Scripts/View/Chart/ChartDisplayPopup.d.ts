import * as React from "react";
import { IChartDefinition } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ChartType, ChartCrosshairsMode, ChartSize } from "../../Utilities/Enums";
export interface ChartDisplayPopupWizardState {
    IsChartMinimised: boolean;
    IsChartSettingsVisible: boolean;
    EditedChartDefinition: IChartDefinition;
    ChartProperties: IChartProperties;
    ChartSize: ChartSize;
    SpanCrossHairsToData: boolean;
    EnableCrosshairsAnnotations: boolean;
    EnableFinalValueAnnotations: boolean;
    IsMinimised: boolean;
    EditedChartDefinition: IChartDefinition;
}
export declare let ChartDisplayPopup: React.ComponentClass<{}, any>;
