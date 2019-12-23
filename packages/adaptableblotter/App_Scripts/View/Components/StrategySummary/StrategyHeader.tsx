import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ButtonNew } from '../Buttons/ButtonNew';
import { SummaryRowItem } from './SummaryRowItem';
import { StrategyProfile } from '../StrategyProfile';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';

export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
  key: string;
  FunctionName: AdaptableFunctionName;
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
        onClick={() => this.props.onNew()}
        tooltip={'Create ' + this.props.NewButtonTooltip}
        AccessLevel={this.props.AccessLevel}
      />
    );

    summaryItems.push(<b>{<StrategyProfile FunctionName={this.props.FunctionName} />}</b>);
    summaryItems.push(this.props.StrategySummary);
    summaryItems.push(newButton);
    return <SummaryRowItem SummaryItems={summaryItems} />;
  }
}
