import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Glyphicon } from 'react-bootstrap';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StyleConstants from '../../Core/Constants/StyleConstants';

// Simple compnent which just shows the Icon and Name for any strategy

export interface StrategyProfileProps extends React.ClassAttributes<StrategyProfile> {
    StrategyId: string
    cssClassName: string
}

export class StrategyProfile extends React.Component<StrategyProfileProps, {}> {
    render(): any {
        let cssClassName: string = this.props.cssClassName + StyleConstants.STRATEGY_PROFILE
        return <div className={cssClassName}>
            <Glyphicon glyph={StrategyIds.getGhyphiconForStrategyId(this.props.StrategyId)} />{' '}
            {StrategyIds.getNameForStrategyId(this.props.StrategyId)}
        </div>

    }
}
