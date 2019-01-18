import * as React from "react";
export interface AdaptableBlotterPopupPromptProps extends React.ClassAttributes<AdaptableBlotterPopupPrompt> {
    ShowPopup: boolean;
    Title: string;
    Msg: string;
    onClose: Function;
    onConfirm: Function;
}
export declare class AdaptableBlotterPopupPrompt extends React.Component<AdaptableBlotterPopupPromptProps, {}> {
    render(): JSX.Element;
}
