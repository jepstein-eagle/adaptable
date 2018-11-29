import * as React from "react";
import { IAlert } from "../../Api/Interface/IMessage";
export interface AlertsPanelProps extends React.ClassAttributes<AlertsPanel> {
    Alerts: IAlert[];
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
