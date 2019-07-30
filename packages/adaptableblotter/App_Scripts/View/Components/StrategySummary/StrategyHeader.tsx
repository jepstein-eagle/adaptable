import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ButtonNew } from '../Buttons/ButtonNew';
import { SummaryRowItem } from './SummaryRowItem';
import { StrategyProfile } from '../StrategyProfile';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';

export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
  key: string;
  StrategyId: string;
  StrategySummary: any;
  onNew: () => void;
  NewButtonTooltip: string;

  NewButtonDisabled?: boolean;
  AccessLevel: AccessLevel;
}

export class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {
  render(): any {
    let summaryItems: any[] = [];
    let newButton = this.props.NewButtonDisabled ? null : (
      <ButtonNew
        size={'xsmall'}
        onClick={() => this.props.onNew()}
        overrideTooltip={'Create ' + this.props.NewButtonTooltip}
        DisplayMode="Glyph"
        AccessLevel={this.props.AccessLevel}
      />
    );

    summaryItems.push(<b>{<StrategyProfile StrategyId={this.props.StrategyId} />}</b>);
    summaryItems.push(this.props.StrategySummary);
    summaryItems.push(newButton);
    return <SummaryRowItem SummaryItems={summaryItems} />;
  }
}
