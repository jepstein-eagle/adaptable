import * as React from "react";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
export interface AdaptableBlotterPopupPromptProps extends React.ClassAttributes<AdaptableBlotterPopupPrompt> {
    ShowPopup: boolean;
    Header: string;
    Msg: string;
    onClose: Function;
    onConfirm: Function;
    AdaptableBlotter: IAdaptableBlotter;
}
export interface AdaptableBlotterPopupPromptState {
    PromptText: string;
}
export declare class AdaptableBlotterPopupPrompt extends React.Component<AdaptableBlotterPopupPromptProps, AdaptableBlotterPopupPromptState> {
    constructor(props: AdaptableBlotterPopupPromptProps);
    render(): JSX.Element;
    onCloseForm(): void;
    onConfirmmForm(): void;
    changeContent: (e: any) => void;
}
