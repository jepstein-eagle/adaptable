import * as React from 'react';
/// <reference path="../../typings/.d.ts" />

import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { Icon } from '../../components/icons';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

// Simple compnent which just shows the Icon and Name for any strategy

export interface StrategyProfileProps extends React.ClassAttributes<StrategyProfile> {
  StrategyId: AdaptableFunctionName;
}

export class StrategyProfile extends React.Component<StrategyProfileProps, {}> {
  render(): any {
    return (
      <div>
        <Icon
          name={StrategyConstants.getGhyphiconForStrategyId(this.props.StrategyId)}
          style={{
            fill: 'var(--ab-color-text-on-primary)',
          }}
        />{' '}
        {StrategyConstants.getNameForStrategyId(this.props.StrategyId)}
      </div>
    );
  }
}
