import * as React from "react";
import { MessageType } from "../../../Utilities/Enums";
export interface AdaptableBlotterPopupAlertPropsold extends React.ClassAttributes<AdaptableBlotterPopupAlertold> {
    ShowPopup: boolean;
    onClose: Function;
    Msg: string;
    Header: string;
    MessageType: MessageType;
}
export declare class AdaptableBlotterPopupAlertold extends React.Component<AdaptableBlotterPopupAlertPropsold, {}> {
    render(): JSX.Element;
}
