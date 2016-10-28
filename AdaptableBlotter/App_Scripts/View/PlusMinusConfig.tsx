/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, FormControl, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, ListGroup } from 'react-bootstrap';

import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux'
import { IStrategyViewPopupProps } from '../Core/Interface/IStrategyView'
import { IColumn } from '../Core/Interface/IAdaptableBlotter';
import { ExpressionString } from '../Core/Expression/ExpressionString';
import { Expression } from '../Core/Expression/Expression';
import { EmptyExpression } from '../Core/Expression/EmptyExpression';
import { Helper } from '../Core/Helper';
import { AdaptableWizard } from './Wizard/AdaptableWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { IPlusMinusCondition } from '../Core/Interface/IPlusMinusStrategy'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';

interface PlusMinusConfigProps extends IStrategyViewPopupProps<PlusMinusConfigComponent> {
    DefaultNudgeValue: number,
    Columns: IColumn[],
    ColumnsDefaultNudge: IPlusMinusCondition[]
    onSetDefaultNudgeValue: (value: number) => PlusMinusRedux.PlusMinusSetDefaultNudgeAction
    onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => PlusMinusRedux.PlusMinusEditColumnsDefaultNudgeAction
    onDeleteColumnDefaultNudgeValue: (Index: number) => PlusMinusRedux.PlusMinusDeleteColumnsDefaultNudgeAction
    onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => PlusMinusRedux.PlusMinusAddOrUpdateColumnsDefaultNudgeAction
}

interface PlusMinusConfigState {
    EditedColumnNudgeValue: IPlusMinusCondition
    EditedIndexColumnNudgeValue: number
}


class PlusMinusConfigComponent extends React.Component<PlusMinusConfigProps, PlusMinusConfigState> {
    constructor() {
        super();
        this.state = { EditedColumnNudgeValue: null, EditedIndexColumnNudgeValue: -1 }

    }
    render() {
        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                <Col xs={7}>Column Nudge Values</Col>
                <Col xs={5}>
                    <Button onClick={() => this.createColumnNudgeValue()} style={{ float: 'right' }}>
                        Create Column Nudge Value
                    </Button>
                </Col>
            </Row>
        </Form>;
        let columnNudgesHeader = <Panel style={panelHeaderStyle} >
            <Row >
                <Col xs={3} style={headerStyle}>Column</Col>
                <Col xs={2} style={headerStyle}>Nudge</Col>
                <Col xs={5} style={headerStyle}>Row Condition</Col>
                <Col xs={2} style={headerStyle}></Col>
            </Row>
        </Panel>

        let optionColumnsItems = this.props.ColumnsDefaultNudge.map((x, index) => {
            let optionColumns = this.props.Columns.filter(column => { return this.props.ColumnsDefaultNudge.findIndex(entry => entry.ColumnId == column.ColumnId) < 0 || column.ColumnId == x.ColumnId }).map(x => {
                return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
            })
            return <li
                className="list-group-item" key={x.ColumnId + index}>
                <Row >
                    <Col xs={3}>
                        <FormControl componentClass="select" placeholder="select" value={x.ColumnId} onChange={(x) => this.onColumnSelectChange(index, x)} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl>
                    </Col>
                    <Col xs={2}>
                        <FormControl value={x.DefaultNudge.toString()} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onColumnDefaultNudgeValueChange(index, e)} />
                    </Col>
                    <Col xs={5}>
                        {ExpressionHelper.ConvertExpressionToString(x.Expression)}
                    </Col>
                    <Col xs={2}>
                        <ButtonToolbar>
                            <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit</Tooltip>}>
                                <Button onClick={() => this.onEdit(index, x)}><Glyphicon glyph="edit" /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                <Button onClick={() => this.props.onDeleteColumnDefaultNudgeValue(index)}><Glyphicon glyph="trash" /></Button>
                            </OverlayTrigger>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </li>
        })
        return <Panel header="Plus/Minus Configuration" bsStyle="primary" style={panelStyle}>
            <Form horizontal>
                <FormGroup controlId="formInlineName">
                    <Col xs={4}>
                        <ControlLabel>Default Nudge Value for Blotter</ControlLabel>
                    </Col>
                    <Col xs={8}>
                        <FormControl style={{ width: "Auto" }} value={this.props.DefaultNudgeValue.toString()} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.handleDefaultNudgeValueChange(e)} />
                    </Col>
                </FormGroup>
            </Form>
            <Panel header={header} >
                {optionColumnsItems.length > 0 && columnNudgesHeader}
                <ListGroup style={panelColumNudge}>
                    {optionColumnsItems}
                </ListGroup>
            </Panel>
            {this.state.EditedColumnNudgeValue != null &&
                <AdaptableWizard Steps={[<PlusMinusSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                <PlusMinusExpressionWizard ColumnList={this.props.Columns} Blotter={this.props.AdaptableBlotter} />]}
                    Data={this.state.EditedColumnNudgeValue}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}
        </Panel>
    }

    createColumnNudgeValue() {
        let _editedColumnNudgeValue = {
            ColumnId: "select",
            DefaultNudge: this.props.DefaultNudgeValue,
            Expression: new ExpressionString([], "Any", "Any")
        }
        this.setState({ EditedColumnNudgeValue: _editedColumnNudgeValue, EditedIndexColumnNudgeValue: -1 });
    }
    onEdit(index: number, condition: IPlusMinusCondition) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedColumnNudgeValue: Helper.cloneObject(condition), EditedIndexColumnNudgeValue: index });
    }
    closeWizard() {
        this.setState({ EditedColumnNudgeValue: null, EditedIndexColumnNudgeValue: -1 });
    }
    WizardFinish() {
        this.props.onAddColumnDefaultNudgeValue(this.state.EditedIndexColumnNudgeValue, this.state.EditedColumnNudgeValue);
        this.setState({ EditedColumnNudgeValue: null, EditedIndexColumnNudgeValue: -1 });
    }

    private onColumnSelectChange(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: e.value, DefaultNudge: this.props.ColumnsDefaultNudge[index].DefaultNudge });
    }

    onColumnDefaultNudgeValueChange(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: this.props.ColumnsDefaultNudge[index].ColumnId, DefaultNudge: parseFloat(e.value) });
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
        onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => dispatch(PlusMinusRedux.PlusMinusAddOrUpdateColumnsDefaultNudge(Index, ColumnsDefaultNudge))
    };
}

export let PlusMinusConfig = connect(mapStateToProps, mapDispatchToProps)(PlusMinusConfigComponent);

let panelColumNudge = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}