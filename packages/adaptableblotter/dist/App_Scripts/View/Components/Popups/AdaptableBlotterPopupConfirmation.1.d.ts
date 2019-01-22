import * as React from "react";
export interface AdaptableBlotterPopupConfirmationPropsOld extends React.ClassAttributes<AdaptableBlotterPopupConfirmationOld> {
    ShowPopup: boolean;
    onConfirm: (comment: string) => void;
    onCancel: Function;
    Title: string;
    Msg: string;
    ConfirmText: string;
    CancelText: string;
    ShowCommentBox: boolean;
}
export declare class AdaptableBlotterPopupConfirmationOld extends React.Component<AdaptableBlotterPopupConfirmationPropsOld, {}> {
    constructor(props: AdaptableBlotterPopupConfirmationPropsOld);
    render(): JSX.Element;
}
