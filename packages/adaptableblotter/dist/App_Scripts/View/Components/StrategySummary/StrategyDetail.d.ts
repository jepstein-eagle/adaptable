import * as React from "react";
import * as Redux from "redux";
import { IAdaptableBlotterObject } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface StrategyDetailProps extends React.ClassAttributes<StrategyDetail> {
    key: string;
    Item1: any;
    Item2: any;
    ConfigEnity: IAdaptableBlotterObject;
    EntityName: string;
    onEdit: () => void;
    onShare: () => void;
    onDelete: Redux.Action;
    showBold?: boolean;
    showEdit?: boolean;
    showShare?: boolean;
    cssClassName: string;
}
export declare class StrategyDetail extends React.Component<StrategyDetailProps, {}> {
    render(): any;
}
