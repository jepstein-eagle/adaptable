import * as React from "react";
import { PanelProps } from 'react-bootstrap';
export interface PanelWithImageTwoButtonsProps extends PanelProps {
    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;
    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;
    glyphicon?: string;
    infoBody?: any[];
    cssClassName: string;
}
export declare class PanelWithImageTwoButtons extends React.Component<PanelWithImageTwoButtonsProps, {}> {
    render(): JSX.Element;
}
