import * as React from 'react';
/// <reference path="../../typings/.d.ts" />

import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { Icon } from '../../components/icons';

// Simple compnent which just shows the Icon and Name for any strategy

export interface StrategyProfileProps extends React.ClassAttributes<StrategyProfile> {
  StrategyId: string;
  cssClassName: string;
}

export class StrategyProfile extends React.Component<StrategyProfileProps, {}> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + StyleConstants.STRATEGY_PROFILE;
    return (
      <div className={cssClassName}>
        <Icon name={StrategyConstants.getGhyphiconForStrategyId(this.props.StrategyId)} />{' '}
        {StrategyConstants.getNameForStrategyId(this.props.StrategyId)}
      </div>
    );
  }
}
