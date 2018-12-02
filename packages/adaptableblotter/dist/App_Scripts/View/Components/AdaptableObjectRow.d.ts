import * as React from "react";
import { IColItem } from "../UIInterfaces";
export interface AdaptableObjectRowProps extends React.ClassAttributes<AdaptableObjectRow> {
    colItems: IColItem[];
    cssClassName: string;
    fontSize?: string;
}
export declare class AdaptableObjectRow extends React.Component<AdaptableObjectRowProps, {}> {
    render(): any;
}
