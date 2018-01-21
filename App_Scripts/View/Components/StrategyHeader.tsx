import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { IStyle } from '../../Core/Interface/IStyle';
import { EnumExtensions } from '../../Core/Extensions';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { Col, Row, Glyphicon } from 'react-bootstrap';
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import * as StrategyNames from '../../Core/StrategyNames'


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
