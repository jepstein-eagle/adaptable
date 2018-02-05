import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Glyphicon } from 'react-bootstrap';
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'


export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
    StrategyId: string
}

export class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {
    render(): any {
        return <div>
            <Glyphicon glyph={StrategyGlyphs.getGhyphiconForStrategy(this.props.StrategyId)} />{' '}
            {StrategyNames.getNameForStrategy(this.props.StrategyId)}
        </div>

    }

}
