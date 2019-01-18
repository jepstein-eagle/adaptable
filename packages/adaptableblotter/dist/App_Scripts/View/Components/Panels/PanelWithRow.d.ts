import * as React from "react";
import { PanelProps } from 'react-bootstrap';
import { IColItem } from "../../UIInterfaces";
export interface PanelWithRowProps extends PanelProps {
    colItems: IColItem[];
    cssClassName: string;
}
export declare class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
    render(): JSX.Element;
}
