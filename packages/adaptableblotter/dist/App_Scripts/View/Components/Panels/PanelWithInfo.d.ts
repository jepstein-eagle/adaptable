import * as React from "react";
import { PanelProps } from 'react-bootstrap';
export interface PanelWithInfoProps extends PanelProps {
    infoBody: any[];
    cssClassName: string;
}
export declare class PanelWithInfo extends React.Component<PanelWithInfoProps, {}> {
    render(): JSX.Element;
}
