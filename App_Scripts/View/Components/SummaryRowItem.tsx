import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { IStyle } from '../../Core/Interface/IStyle';
import { EnumExtensions } from '../../Core/Extensions';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';

export interface SummaryRowItemProps extends React.ClassAttributes<SummaryRowItem> {
    SummaryItems: any[] // will always be 3
}

export class SummaryRowItem extends React.Component<SummaryRowItemProps, {}> {
    render(): any {

        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: this.props.SummaryItems[0] })
        myCols.push({ size: 7, content: this.props.SummaryItems[1] });
        myCols.push({ size: 2, content: this.props.SummaryItems[2] })
        return <ConfigEntityRowItem items={myCols} />
    }
}
