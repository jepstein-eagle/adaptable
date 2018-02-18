import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ConfigEntityRowItem } from '../../Components/ConfigEntityRowItem';
import { IColItem } from "../../Interfaces";

// Very simple wrapper around a ConfigEntityRowItem which knows that it will always receive items and will always want
// to make them size of 3, 6, 3 respectively.

export interface SummaryRowItemProps extends React.ClassAttributes<SummaryRowItem> {
    SummaryItems: any[]  
}

export class SummaryRowItem extends React.Component<SummaryRowItemProps, {}> {
    render(): any {

        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: this.props.SummaryItems[0] })
        colItems.push({ Size: 6, Content: this.props.SummaryItems[1] });
        colItems.push({ Size: 3, Content: this.props.SummaryItems[2] })
        return <ConfigEntityRowItem ColItems={colItems} />
    }
}
