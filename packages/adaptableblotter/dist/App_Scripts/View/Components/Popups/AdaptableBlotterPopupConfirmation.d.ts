import * as React from "react";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { MessageType } from "../../../Utilities/Enums";
/**
 * Used when giving the user 2 choices with the option of adding text also
 */
export interface AdaptableBlotterPopupConfirmationProps extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
    ShowPopup: boolean;
    onConfirm: (comment: string) => void;
    onCancel: Function;
    Header: string;
    Msg: string;
    ConfirmButtonText: string;
    CancelButtonText: string;
    ShowInputBox: boolean;
    MessageType: MessageType;
    AdaptableBlotter: IAdaptableBlotter;
}
export interface AdaptableBlotterPopupConfirmationState {
    PromptText: string;
}
export declare class AdaptableBlotterPopupConfirmation extends React.Component<AdaptableBlotterPopupConfirmationProps, AdaptableBlotterPopupConfirmationState> {
    constructor(props: AdaptableBlotterPopupConfirmationProps);
    render(): JSX.Element;
    onCancelForm(): void;
    onConfirmmForm(): void;
    changeContent: (e: any) => void;
    canConfirm(): boolean;
}
