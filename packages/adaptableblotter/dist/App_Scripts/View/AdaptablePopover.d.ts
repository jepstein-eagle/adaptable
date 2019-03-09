/// <reference types="react-bootstrap" />
import * as React from "react";
import { MessageType } from '../Utilities/Enums';
export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
    headerText: string;
    bodyText: any[];
    MessageType?: MessageType;
    cssClassName: string;
    triggerAction?: string;
    useButton?: boolean;
    tooltipText?: string;
    popoverMinWidth?: number;
    size?: ReactBootstrap.Sizes;
    showDefaultStyle?: boolean;
}
export declare class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
    render(): JSX.Element;
}
