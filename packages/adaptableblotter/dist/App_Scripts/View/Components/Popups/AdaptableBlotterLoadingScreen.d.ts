import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';
import * as React from "react";
export interface IAdaptableBlotterLoadingScreenProps extends React.ClassAttributes<AdaptableBlotterLoadingScreen> {
    showLoadingScreen: boolean;
    onClose?: Function;
    AdaptableBlotter: IAdaptableBlotter;
}
export declare class AdaptableBlotterLoadingScreen extends React.Component<IAdaptableBlotterLoadingScreenProps, {}> {
    render(): JSX.Element;
}
