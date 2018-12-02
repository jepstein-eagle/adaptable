import * as React from "react";
import { PanelProps } from 'react-bootstrap';
export interface PanelDashboardProps extends PanelProps {
    headerText: string;
    glyphicon: string;
    onClose: () => void;
    onConfigure: () => void;
    onMinimise?: () => void;
    panelStyle?: string;
    showCloseButton?: boolean;
    showConfigureButton?: boolean;
    showMinimiseButton?: boolean;
    showGlyphIcon?: boolean;
    cssClassName: string;
}
export declare class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    static defaultProps: PanelDashboardProps;
    render(): JSX.Element;
}
