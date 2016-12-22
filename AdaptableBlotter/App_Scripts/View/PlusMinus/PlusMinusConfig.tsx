/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormGroup, Panel, ControlLabel, FormControl, Row, Col, ButtonToolbar, OverlayTrigger, Tooltip, Glyphicon, ListGroup } from 'react-bootstrap';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Expression } from '../../Core/Expression/Expression';
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { IPlusMinusCondition } from '../../Core/Interface/IPlusMinusStrategy'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';

interface PlusMinusConfigProps extends IStrategyViewPopupProps<PlusMinusConfigComponent> {
    DefaultNudgeValue: number,
    Columns: IColumn[],
    PlusMinusConditions: IPlusMinusCondition[]
    onSetDefaultNudgeValue: (value: number) => PlusMinusRedux.PlusMinusSetDefaultNudgeAction
    onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => PlusMinusRedux.PlusMinusEditColumnsDefaultNudgeAction
    onDeleteColumnDefaultNudgeValue: (Index: number) => PlusMinusRedux.PlusMinusDeleteColumnsDefaultNudgeAction
    onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusCondition) => PlusMinusRedux.PlusMinusAddOrUpdateColumnsDefaultNudgeAction
}

interface PlusMinusConfigState {
    EditedPlusMinusCondition: IPlusMinusCondition
    EditedIndexColumnNudgeValue: number
}


class PlusMinusConfigComponent extends React.Component<PlusMinusConfigProps, PlusMinusConfigState> {
    constructor() {
        super();
        this.state = { EditedPlusMinusCondition: null, EditedIndexColumnNudgeValue: -1 }

    }
    render() {
        let columnNudgesHeader = <Panel style={panelHeaderStyle} >
            <Row >
                <Col xs={3} style={headerStyle}>Column</Col>
                <Col xs={2} style={headerStyle}>Nudge</Col>
                <Col xs={5} style={headerStyle}>Row Condition</Col>
                <Col xs={2} style={headerStyle}></Col>
            </Row>
        </Panel>

        let optionColumnsItems = this.props.PlusMinusConditions.map((x, index) => {
            let optionColumns = this.props.Columns.filter(column => { return this.props.PlusMinusConditions.findIndex(entry => entry.ColumnId == column.ColumnId) < 0 || column.ColumnId == x.ColumnId }).map(x => {
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
                        {ExpressionHelper.ConvertExpressionToString(x.Expression, this.props.Columns)}
                    </Col>
                    <Col xs={2}>
                        <EntityListActionButtons
                            deleteClick={() => this.props.onDeleteColumnDefaultNudgeValue(index)}
                            editClick={() => this.onEdit(index, x)}>
                        </EntityListActionButtons>
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
            <PanelWithButton headerText="Column Nudge Values"
                buttonContent={"Create Column Nudge Value"}
                buttonClick={() => this.createColumnNudgeValue()}  >
                {optionColumnsItems.length > 0 && columnNudgesHeader}
                <ListGroup style={panelColumNudge}>
                    {optionColumnsItems}
                </ListGroup>
            </PanelWithButton>
            {this.state.EditedPlusMinusCondition != null &&
                <AdaptableWizard Steps={[<PlusMinusSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                <PlusMinusExpressionWizard ColumnList={this.props.Columns} Blotter={this.props.AdaptableBlotter} SelectedColumnId={null} />]}
                    Data={this.state.EditedPlusMinusCondition}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}
        </Panel>
    }

    createColumnNudgeValue() {
        let _editedColumnNudgeValue = {
            ColumnId: "select",
            DefaultNudge: this.props.DefaultNudgeValue,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
        this.setState({ EditedPlusMinusCondition: _editedColumnNudgeValue, EditedIndexColumnNudgeValue: -1 });
    }
    onEdit(index: number, condition: IPlusMinusCondition) {
        //we clone the condition as we do not want to mutate the redux state here....
        // but this causes an issue as filters dont clone because they have a function...
         let clonedObject: IPlusMinusCondition = Helper.cloneObject(condition);
        clonedObject.Expression.FiltersExpression = condition.Expression.FiltersExpression;
        this.setState({ EditedPlusMinusCondition: clonedObject, EditedIndexColumnNudgeValue: index });
    }
    closeWizard() {
        this.setState({ EditedPlusMinusCondition: null, EditedIndexColumnNudgeValue: -1 });
    }
    WizardFinish() {
        this.props.onAddColumnDefaultNudgeValue(this.state.EditedIndexColumnNudgeValue, this.state.EditedPlusMinusCondition);
        this.setState({ EditedPlusMinusCondition: null, EditedIndexColumnNudgeValue: -1 });
    }

    private onColumnSelectChange(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: e.value, DefaultNudge: this.props.PlusMinusConditions[index].DefaultNudge });
    }

    onColumnDefaultNudgeValueChange(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: this.props.PlusMinusConditions[index].ColumnId, DefaultNudge: parseFloat(e.value) });
    }

    handleDefaultNudgeValueChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetDefaultNudgeValue(parseFloat(e.value));
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DefaultNudgeValue: state.PlusMinus.DefaultNudge,
        PlusMinusConditions: state.PlusMinus.PlusMinusConditions,
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