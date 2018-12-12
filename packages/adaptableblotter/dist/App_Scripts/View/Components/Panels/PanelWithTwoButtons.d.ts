import * as React from "react";
import { PanelProps } from 'react-bootstrap';
import { ContextMenuTab } from '../../../Utilities/Enums';
export interface PanelWithTwoButtonsProps extends PanelProps {
    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;
    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;
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
