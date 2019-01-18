import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from "react";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
export interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
    showModal: boolean;
    ComponentName: string;
    ComponentStrategy: string;
    onHide?: Function;
    Blotter: IAdaptableBlotter;
    PopupParams: string;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
}
export declare class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
    render(): JSX.Element;
}
