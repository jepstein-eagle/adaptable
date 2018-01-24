import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Col, Row, Glyphicon } from 'react-bootstrap';
import { ButtonNew } from './Buttons/ButtonNew';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import * as StrategyNames from '../../Core/StrategyNames'
import { StrategyHeader } from './StrategyHeader'

export interface StrategySummaryRowProps extends React.ClassAttributes<StrategySummaryRow> {
    key: string
    StrategyId: string
    StrategySummary: any
    onNew: () => void
    NewButtonTooltip: string
}

export class StrategySummaryRow extends React.Component<StrategySummaryRowProps, {}> {

    render(): any {
        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: <b>{<StrategyHeader StrategyId={this.props.StrategyId} />}</b> })
        myCols.push({ size: 6, content: this.props.StrategySummary });
         myCols.push({ size: 3, content: <ButtonNew onClick={() => this.props.onNew()} overrideTooltip={"Create " + this.props.NewButtonTooltip} DisplayMode="Glyph" /> })
        return <ConfigEntityRow items={myCols} />
    }
}
