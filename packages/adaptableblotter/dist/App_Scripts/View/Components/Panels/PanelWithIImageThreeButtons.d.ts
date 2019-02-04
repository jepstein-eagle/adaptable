import * as React from "react";
import { PanelProps } from 'react-bootstrap';
export interface PanelWithImageThreeButtonsProps extends PanelProps {
    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;
    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;
    thirdButtonContent?: React.ReactNode;
    thirdButton?: React.ReactElement<any>;
    glyphicon?: string;
    infoBody?: any[];
    cssClassName: string;
}
export declare class PanelWithImageThreeButtons extends React.Component<PanelWithImageThreeButtonsProps, {}> {
    render(): JSX.Element;
}
