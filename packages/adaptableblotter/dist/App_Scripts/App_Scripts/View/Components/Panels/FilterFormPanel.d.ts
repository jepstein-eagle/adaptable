import * as React from "react";
import { PanelProps } from 'react-bootstrap';
import { ContextMenuTab } from '../../../Core/Enums';
export interface FilterFormPanelProps extends PanelProps {
    clearFilterButton?: React.ReactElement<any>;
    saveButton?: React.ReactElement<any>;
    closeButton?: React.ReactElement<any>;
    cssClassName: string;
    ContextMenuTab: ContextMenuTab;
    ContextMenuChanged: (e: any) => void;
    IsAlwaysFilter: boolean;
    showCloseButton: boolean;
}
export declare class FilterFormPanel extends React.Component<FilterFormPanelProps, {}> {
    render(): JSX.Element;
    onSelectMenu(tab: any): any;
    onSelectFilter(tab: any): any;
}
