import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Col, Row, Glyphicon } from 'react-bootstrap';
import { ButtonNew } from './Buttons/ButtonNew';
import { SummaryRowItem } from '../Components/SummaryRowItem';
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
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
        let summaryItems: any[] = []
        summaryItems.push(<b>{<StrategyHeader StrategyId={this.props.StrategyId} />}</b> )
        summaryItems.push(this.props.StrategySummary );
        summaryItems.push(<ButtonNew size={"small"} onClick={() => this.props.onNew()} overrideTooltip={"Create " + this.props.NewButtonTooltip} DisplayMode="Glyph" /> )
        return <SummaryRowItem SummaryItems={summaryItems} />
    }
}
