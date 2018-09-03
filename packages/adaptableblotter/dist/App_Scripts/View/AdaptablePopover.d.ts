import * as React from "react";
import { MessageType } from '../Core/Enums';
export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
    headerText: string;
    bodyText: any[];
    MessageType: MessageType;
    cssClassName: string;
    triggerAction?: string;
    useButton?: boolean;
    tooltipText?: string;
}
export declare class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
    render(): JSX.Element;
}
