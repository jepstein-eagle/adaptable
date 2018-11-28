import * as React from "react";
import { MessageType } from "../../../Core/Enums";
export interface AdaptableBlotterPopupAlertProps extends React.ClassAttributes<AdaptableBlotterPopupAlert> {
    ShowPopup: boolean;
    onClose: Function;
    Msg: string;
    Header: string;
    MessageType: MessageType;
}
export declare class AdaptableBlotterPopupAlert extends React.Component<AdaptableBlotterPopupAlertProps, {}> {
    render(): JSX.Element;
}
