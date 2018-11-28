import * as React from "react";
import { IColItem } from "../UIInterfaces";
export interface AdaptableObjectCollectionProps extends React.ClassAttributes<AdaptableObjectCollection> {
    colItems: IColItem[];
    items: any[];
    bsStyle?: string;
    reducedPanel?: boolean;
    allowOverflow?: boolean;
    cssClassName: string;
    bsSize?: string;
}
export declare class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
    render(): any;
}
