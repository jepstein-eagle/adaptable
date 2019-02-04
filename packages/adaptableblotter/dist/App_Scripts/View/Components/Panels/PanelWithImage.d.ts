import * as React from "react";
import { PanelProps } from 'react-bootstrap';
export interface PanelWithImageProps extends PanelProps {
    glyphicon?: string;
    infoBody?: any[];
    cssClassName: string;
    button?: React.ReactElement<any>;
}
export declare class PanelWithImage extends React.Component<PanelWithImageProps, {}> {
    render(): JSX.Element;
}
