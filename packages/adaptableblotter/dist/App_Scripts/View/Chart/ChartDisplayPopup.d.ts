import * as React from "react";
import { ChartType, ChartCrosshairsMode, ChartSize } from "../../Utilities/Enums";
export interface ChartDisplayPopupWizardState {
    ChartType: ChartType;
    ChartCrosshairsMode: ChartCrosshairsMode;
    ChartSize: ChartSize;
    SpanCrossHairsToData: boolean;
    EnableCrosshairsAnnotations: boolean;
    EnableFinalValueAnnotations: boolean;
    IsMinimised: boolean;
}
export declare let ChartDisplayPopup: React.ComponentClass<any, any>;
