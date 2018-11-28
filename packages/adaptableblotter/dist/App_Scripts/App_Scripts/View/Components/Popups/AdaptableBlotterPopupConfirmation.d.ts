import * as React from "react";
export interface AdaptableBlotterPopupConfirmationProps extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
    ShowPopup: boolean;
    onConfirm: (comment: string) => void;
    onCancel: Function;
    Title: string;
    Msg: string;
    ConfirmText: string;
    CancelText: string;
    ShowCommentBox: boolean;
}
export declare class AdaptableBlotterPopupConfirmation extends React.Component<AdaptableBlotterPopupConfirmationProps, {}> {
    constructor(props: AdaptableBlotterPopupConfirmationProps);
    render(): JSX.Element;
}
