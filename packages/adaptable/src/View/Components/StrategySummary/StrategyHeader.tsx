import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ButtonNew } from '../Buttons/ButtonNew';
import { SummaryRowItem } from './SummaryRowItem';
import { StrategyProfile } from '../StrategyProfile';

import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';

export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
  key: string;
  functionName: AdaptableFunctionName;
  strategySummary: any;
  onNew: () => void;
  newButtonTooltip: string;

  newButtonDisabled?: boolean;
  accessLevel: AccessLevel;
}

export class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {
  render(): any {
    let summaryItems: any[] = [];
    let newButton = this.props.newButtonDisabled ? null : (
      <ButtonNew
        onClick={() => this.props.onNew()}
        tooltip={'Create ' + this.props.newButtonTooltip}
        accessLevel={this.props.accessLevel}
      />
    );

    summaryItems.push(<b>{<StrategyProfile FunctionName={this.props.functionName} />}</b>);
    summaryItems.push(this.props.strategySummary);
    summaryItems.push(newButton);
    return <SummaryRowItem SummaryItems={summaryItems} />;
  }
}
