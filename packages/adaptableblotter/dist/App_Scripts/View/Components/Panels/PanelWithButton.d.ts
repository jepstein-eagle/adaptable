import * as React from "react";
import { PanelProps } from 'react-bootstrap';
export interface PanelWithButtonProps extends PanelProps {
    buttonContent?: React.ReactNode;
    buttonClick?: () => void;
    button?: React.ReactElement<any>;
    headerText: string;
    glyphicon?: string;
    buttonDisabled?: boolean;
    buttonStyle?: string;
    infoBody?: any[];
    cssClassName: string;
}
export declare class PanelWithButton extends React.Component<PanelWithButtonProps, {}> {
    render(): JSX.Element;
}
