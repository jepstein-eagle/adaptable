import * as React from "react";
import { IColItem } from "../../UIInterfaces";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
interface AdaptableBlotterAboutProps extends React.ClassAttributes<AdaptableBlotterAbout> {
    AdaptableBlotter: IAdaptableBlotter;
    onClose?: Function;
    showAbout: boolean;
}
export declare class AdaptableBlotterAbout extends React.Component<AdaptableBlotterAboutProps, {}> {
    render(): JSX.Element;
    CreateAboutInfo(colItems: IColItem[]): IColItem[][];
    createColItem(colItems: IColItem[], item1: any, item2: any): IColItem[];
}
export {};
