/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {  Button, Form, FormGroup, Panel, ControlLabel, FormControl} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux'
import {IStrategyViewPopupProps} from '../Core/Interface/IStrategyView'
import {IColumn} from '../Core/Interface/IAdaptableBlotter';


interface PlusMinusConfigProps extends IStrategyViewPopupProps<PlusMinusConfigComponent> {
    DefaultNudgeValue: number,
    onSetDefaultNudgeValue: (value: number) => PlusMinusRedux.PlusMinusSetDefaultNudgeAction
}


class PlusMinusConfigComponent extends React.Component<PlusMinusConfigProps, {}> {
    render() {
        return <Panel header="Plus/Minus Configuration" bsStyle="primary">
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Default Nudge Value</ControlLabel>
                    {' '}
                    <FormControl value={this.props.DefaultNudgeValue} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.handleDefaultNudgeValueChange(e) }/>
                </FormGroup>
            </Form>
        </Panel>
    }

    handleDefaultNudgeValueChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onSetDefaultNudgeValue(parseFloat(e.value));
    }
}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DefaultNudgeValue: state.PlusMinus.DefaultNudge
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetDefaultNudgeValue: (value: number) => dispatch(PlusMinusRedux.PlusMinusSetDefaultNudge(value))
    };
}

export let PlusMinusConfig = connect(mapStateToProps, mapDispatchToProps)(PlusMinusConfigComponent);

