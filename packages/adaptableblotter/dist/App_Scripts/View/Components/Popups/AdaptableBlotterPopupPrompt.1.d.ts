import * as React from "react";
export interface AdaptableBlotterPopupPromptPropsOld extends React.ClassAttributes<AdaptableBlotterPopupPromptOld> {
    ShowPopup: boolean;
    Title: string;
    Msg: string;
    onClose: Function;
    onConfirm: Function;
}
export declare class AdaptableBlotterPopupPromptOld extends React.Component<AdaptableBlotterPopupPromptPropsOld, {}> {
    render(): JSX.Element;
}
