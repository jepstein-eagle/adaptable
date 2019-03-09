import * as React from "react";
export declare enum DashboardConfigView {
    General = "General",
    Buttons = "Buttons",
    Toolbars = "Toolbars"
}
export interface DashboardPopupState {
    DashboardConfigView: DashboardConfigView;
    EditedZoomFactor: Number;
}
export declare let DashboardPopup: React.ComponentClass<any, any>;
