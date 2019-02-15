import * as React from "react";
import { IAdaptableAlert } from "../../Utilities/Interface/IMessage";
export interface AlertsPanelProps extends React.ClassAttributes<AlertsPanel> {
    Alerts: IAdaptableAlert[];
    ShowPanel: boolean;
    cssClassName: string;
    ShowHeader: boolean;
    onClearAlert: (index: number) => void;
    onClearAllAlerts: () => void;
    onRender: () => void;
}
export declare class AlertsPanel extends React.Component<AlertsPanelProps, {}> {
    componentWillUnmount(): void;
    render(): any;
}
