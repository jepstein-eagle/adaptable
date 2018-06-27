import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ButtonNew } from './../Buttons/ButtonNew';
import { SummaryRowItem } from './SummaryRowItem';
import { StrategyProfile } from './../StrategyProfile'

export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
    key: string
    StrategyId: string
    StrategySummary: any
    onNew: () => void
    NewButtonTooltip: string
    cssClassName: string
    NewButtonDisabled?: boolean
}

export class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {

    render(): any {
        let summaryItems: any[] = []
        let newButton = this.props.NewButtonDisabled ?
            null :
            <ButtonNew cssClassName={this.props.cssClassName} size={"small"} onClick={() => this.props.onNew()} overrideTooltip={"Create " + this.props.NewButtonTooltip} DisplayMode="Glyph" />

        summaryItems.push(<b>{<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={this.props.StrategyId} />}</b>)
        summaryItems.push(this.props.StrategySummary);
        summaryItems.push(newButton)
        return <SummaryRowItem cssClassName={this.props.cssClassName} SummaryItems={summaryItems} />
    }
}
    