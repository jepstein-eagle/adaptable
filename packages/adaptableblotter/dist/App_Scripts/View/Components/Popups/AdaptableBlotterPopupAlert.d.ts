import * as React from "react";
import { MessageType } from "../../../Utilities/Enums";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
export interface AdaptableBlotterPopupAlertProps extends React.ClassAttributes<AdaptableBlotterPopupAlert> {
    ShowPopup: boolean;
    onClose: Function;
    Msg: string;
    Header: string;
    MessageType: MessageType;
    AdaptableBlotter: IAdaptableBlotter;
}
export declare class AdaptableBlotterPopupAlert extends React.Component<AdaptableBlotterPopupAlertProps, {}> {
    render(): JSX.Element;
}
