import * as React from "react";
import { PanelProps } from 'react-bootstrap';
import { ContextMenuTab } from '../../../Core/Enums';
export interface PanelWithTwoButtonsProps extends PanelProps {
    clearFilterButtonContent?: React.ReactNode;
    clearFilterButton?: React.ReactElement<any>;
    closeButtonContent?: React.ReactNode;
    closeButton?: React.ReactElement<any>;
    cssClassName: string;
    ContextMenuTab: ContextMenuTab;
    ContextMenuChanged: (e: any) => void;
    IsAlwaysFilter: boolean;
}
export declare class PanelWithTwoButtons extends React.Component<PanelWithTwoButtonsProps, {}> {
    render(): JSX.Element;
    onSelectMenu(tab: any): any;
    onSelectFilter(tab: any): any;
}
