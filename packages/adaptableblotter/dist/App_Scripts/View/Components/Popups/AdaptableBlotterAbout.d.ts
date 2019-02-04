import * as React from "react";
import { IColItem } from "../../UIInterfaces";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
interface AdaptableBlotterAboutProps extends React.ClassAttributes<AdaptableBlotterAbout> {
    AdaptableBlotter: IAdaptableBlotter;
    onClose?: Function;
    showAbout: boolean;
}
export interface AboutBlotterState {
    ShowGridProperties: boolean;
    cssClassName: string;
    IsBaseOptionsMinimised: boolean;
    IsContainerOptionsMinimised: boolean;
    IsAuditOptionsMinimised: boolean;
    IsConfigServerOptionsMinimised: boolean;
    IsQueryOptionsMinimised: boolean;
    IsLayoutOptionsMinimised: boolean;
    IsFilterOptionsMinimised: boolean;
    IsGeneralOptionsMinimised: boolean;
}
export declare class AdaptableBlotterAbout extends React.Component<AdaptableBlotterAboutProps, AboutBlotterState> {
    constructor(props: AdaptableBlotterAboutProps);
    render(): JSX.Element;
    private CreateGridInfo;
    private CreateBaseOptionsInfo;
    private CreateContainerOptionsInfo;
    private CreateAuditOptionsInfo;
    private CreateConfigServerOptionsInfo;
    private CreateQueryOptionsInfo;
    private CreateLayoutOptionsInfo;
    private CreateFilterOptionsInfo;
    private CreateGeneralOptionsInfo;
    createMaximiseButton(optionType: string, onClickFunction: any): any;
    createMinimiseButton(optionType: string, onClickFunction: any): any;
    createColItem(colItems: IColItem[], item1: any, item2: any, item3?: any): IColItem[];
    onShowGridPropertiesChanged(event: React.FormEvent<any>): void;
}
export {};
