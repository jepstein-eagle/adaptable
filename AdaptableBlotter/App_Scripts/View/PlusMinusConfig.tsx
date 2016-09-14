/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {  Button, Form, FormGroup, Panel, ControlLabel, FormControl, Row, Col} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux'
import {IStrategyViewPopupProps} from '../Core/Interface/IStrategyView'
import {IColumn} from '../Core/Interface/IAdaptableBlotter';


interface PlusMinusConfigProps extends IStrategyViewPopupProps<PlusMinusConfigComponent> {
    DefaultNudgeValue: number,
    Columns: IColumn[],
    ColumnsDefaultNudge: { ColumnId: string, DefaultNudge: number }[]
    onSetDefaultNudgeValue: (value: number) => PlusMinusRedux.PlusMinusSetDefaultNudgeAction
    onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => PlusMinusRedux.PlusMinusEditColumnsDefaultNudgeAction
    onDeleteColumnDefaultNudgeValue: (Index: number) => PlusMinusRedux.PlusMinusDeleteColumnsDefaultNudgeAction
    onAddColumnDefaultNudgeValue: () => PlusMinusRedux.PlusMinusAddColumnsDefaultNudgeAction
}


class PlusMinusConfigComponent extends React.Component<PlusMinusConfigProps, {}> {

    render() {
        let header = <Form horizontal>
            <Row>
                <Col xs={7}>Column Nudge Values</Col>
                <Col xs={5}>
                    <Button onClick={() => this.props.onAddColumnDefaultNudgeValue() } disabled={this.props.ColumnsDefaultNudge.findIndex(x => x.ColumnId == "select") >= 0}>
                        Add Column Nudge Value
                    </Button>
                </Col>
            </Row>
        </Form>;

        let optionColumnsItems = this.props.ColumnsDefaultNudge.map((x, index) => {
            let optionColumns = this.props.Columns.filter(column => { return this.props.ColumnsDefaultNudge.findIndex(entry => entry.ColumnId == column.ColumnId) < 0 || column.ColumnId == x.ColumnId }).map(x => {
                return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
            })
            return <Form inline key={x.ColumnId}>
                <FormGroup controlId={x.ColumnId}>
                    <FormControl componentClass="select" placeholder="select" value={x.ColumnId} onChange={(x) => this.onColumnSelectChange(index, x) } >
                        <option value="select" key="select">Select a column</option>
                        {optionColumns}
                    </FormControl>
                    {' '}
                    <FormControl value={x.DefaultNudge} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onColumnDefaultNudgeValueChange(index, e) }/>
                    {' '}
                    <Button onClick={() => this.props.onDeleteColumnDefaultNudgeValue(index) } >Delete</Button>
                </FormGroup>
            </Form>
        })
        return <Panel header="Plus/Minus Configuration" bsStyle="primary">
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Default Nudge Value for Blotter</ControlLabel>
                    {' '}
                    <FormControl value={this.props.DefaultNudgeValue} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.handleDefaultNudgeValueChange(e) }/>
                </FormGroup>
            </Form>
            <p/>
            <Panel header={header} >
                <div style={panelColumNudge}>
                    {optionColumnsItems}
                </div>
            </Panel>
        </Panel>
    }

    private onColumnSelectChange(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, {ColumnId: e.value, DefaultNudge: this.props.ColumnsDefaultNudge[index].DefaultNudge} );
    }

    onColumnDefaultNudgeValueChange(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, {ColumnId: this.props.ColumnsDefaultNudge[index].ColumnId, DefaultNudge: parseFloat(e.value) });
    }

    handleDefaultNudgeValueChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetDefaultNudgeValue(parseFloat(e.value));
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DefaultNudgeValue: state.PlusMinus.DefaultNudge,
        ColumnsDefaultNudge: state.PlusMinus.ColumnsDefaultNudge,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetDefaultNudgeValue: (value: number) => dispatch(PlusMinusRedux.PlusMinusSetDefaultNudge(value)),
        onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => dispatch(PlusMinusRedux.PlusMinusEditColumnsDefaultNudge(Index, ColumnDefaultNudge)),
        onDeleteColumnDefaultNudgeValue: (Index: number) => dispatch(PlusMinusRedux.PlusMinusDeleteColumnsDefaultNudge(Index)),
        onAddColumnDefaultNudgeValue: () => dispatch(PlusMinusRedux.PlusMinusAddColumnsDefaultNudge())
    };
}

export let PlusMinusConfig = connect(mapStateToProps, mapDispatchToProps)(PlusMinusConfigComponent);

let panelColumNudge = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};