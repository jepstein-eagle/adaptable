import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { Glyphicon } from 'react-bootstrap';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';

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
        <Glyphicon glyph={StrategyConstants.getGhyphiconForStrategyId(this.props.StrategyId)} />{' '}
        {StrategyConstants.getNameForStrategyId(this.props.StrategyId)}
      </div>
    );
  }
}
