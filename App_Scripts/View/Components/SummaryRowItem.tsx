import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';


export interface SummaryRowItemProps extends React.ClassAttributes<SummaryRowItem> {
    SummaryItems: any[] // will always be 3 items and we know here it will be 3, 7, 2
}

export class SummaryRowItem extends React.Component<SummaryRowItemProps, {}> {
    render(): any {

        let colItems: IColItem[] = []
        colItems.push({ Size: 3, Content: this.props.SummaryItems[0] })
        colItems.push({ Size: 7, Content: this.props.SummaryItems[1] });
        colItems.push({ Size: 2, Content: this.props.SummaryItems[2] })
        return <ConfigEntityRowItem ColItems={colItems} />
    }
}
