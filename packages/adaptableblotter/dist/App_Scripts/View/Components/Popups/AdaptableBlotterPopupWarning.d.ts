import * as React from "react";
export interface AdaptableBlotterPopupWarningProps extends React.ClassAttributes<AdaptableBlotterPopupWarning> {
    ShowPopup: boolean;
    onClose: Function;
    Msg: string;
    Header: string;
}
export declare class AdaptableBlotterPopupWarning extends React.Component<AdaptableBlotterPopupWarningProps, {}> {
    render(): JSX.Element;
}
