/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition, IPredefinedStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { IPredefinedExpressionInfo } from '../../Core/Interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, ColumnType, LeafExpressionOperator } from '../../Core/Enums';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterState } from '../../Redux/ActionsReducers/Interface/IState';
import { ColorPicker } from '../ColorPicker';


interface ConditionalStyleSettingsWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}

interface ConditionalStyleSettingsWizardState {
    ColumnId: string,
    BackColor: string,
    ForeColor: string,
    ConditionalStyleScope: ConditionalStyleScope,
    IsPredefinedExpression: boolean,
    PredefinedStyleCondition: IPredefinedStyleCondition,
    Expression: Expression
}

export class ConditionalStyleSettingsWizard extends React.Component<ConditionalStyleSettingsWizardProps, ConditionalStyleSettingsWizardState> implements AdaptableWizardStep {
    private predefinedExpressions: IPredefinedStyleCondition[] = [];

    constructor(props: ConditionalStyleSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            BackColor: this.props.Data.BackColor,
            ForeColor: this.props.Data.ForeColor,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
            IsPredefinedExpression: this.props.Data.IsPredefinedExpression,
            PredefinedStyleCondition: this.props.Data.PredefinedStyleCondition,
            Expression: this.props.Data.Expression
        }
    }


    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        if (this.predefinedExpressions.length == 0) {
            // create 2 predefined styles - do it here and not in the helper class
            this.predefinedExpressions.push(
                {
                    PredefinedExpressionInfo: {
                        DisplayColumnValues: null,
                        RawColumnValues: null,
                        ExpressionRange: null,
                        UserFilterUids: ["Positive"],
                    }, BackColor: 'rgba(0,0,0,0)', ForeColor: '#008000', FriendlyName: "Positive numbers in green font", Id: "PositiveGreen",

                });


            this.predefinedExpressions.push(
                {
                    PredefinedExpressionInfo: {
                        DisplayColumnValues: null,
                        RawColumnValues: null,
                        ExpressionRange: null,
                        UserFilterUids: ["Negative"],
                    }, BackColor: 'rgba(0,0,0,0)', ForeColor: '#FF0000', FriendlyName: "Negative numbers in red font", Id: "NegativeRed",

                });
        }

        let optionPredefinedExpressions = this.predefinedExpressions.map(pe => {
            return <option key={pe.Id} value={pe.Id}>{pe.FriendlyName}</option>
        })

        let emptyPredefinedExpression: string = "Select an expression"
        let currentPredefinedExpression = (this.state.IsPredefinedExpression && this.state.PredefinedStyleCondition != null) ?
            this.state.PredefinedStyleCondition.Id :
            emptyPredefinedExpression;

        return <Panel header="Conditional Style Settings" bsStyle="primary">
            <Form horizontal>

                <FormGroup controlId="whereApplied">

                    <Col componentClass={ControlLabel} xs={4}>Apply To: </Col>
                    <Col xs={2}>
                        <Radio value="Row" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Row} onChange={(e) => this.onWhereAppliedSelectChanged(e)}> Row </Radio>
                    </Col>
                    <Col xs={5}>
                        <Radio value="Column" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Column} onChange={(e) => this.onWhereAppliedSelectChanged(e)}> Column </Radio>
                    </Col>
                </FormGroup>

                {this.state.ConditionalStyleScope == ConditionalStyleScope.Column ?
                    <div>
                        <FormGroup controlId="formColumn">
                            <Col componentClass={ControlLabel} xs={4}>Select Column: </Col>
                            <Col xs={8}>
                                <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                                    <option value="select" key="select">Select a column</option>
                                    {optionColumns}
                                </FormControl>
                            </Col>
                        </FormGroup>


                        <FormGroup controlId="expressionType">
                            <Col xs={4} componentClass={ControlLabel}>Expression Type: </Col>
                            <Col xs={8}>
                                <Radio value="custom" checked={this.state.IsPredefinedExpression == false}
                                    onChange={(e) => this.onExpressionOptionChange(e)}>
                                    Custom Expression (created in next step)
                        </Radio>
                                <Radio value="predefined"
                                    checked={this.state.IsPredefinedExpression == true} onChange={(e) => this.onExpressionOptionChange(e)}>
                                    Existing Expression
                        </Radio>
                            </Col>
                        </FormGroup>
                    </div>
                    : null}

                {this.state.IsPredefinedExpression ?

                    <FormGroup controlId="styleName">
                        <Col xs={4} componentClass={ControlLabel}>Select Expression: </Col>
                        <Col xs={8}>
                            <FormControl componentClass="select" placeholder="select" value={currentPredefinedExpression} onChange={(x) => this.onPredefinedExpressionSelectChange(x)} >
                                <option value="select" key="select">{emptyPredefinedExpression}</option>
                                {optionPredefinedExpressions}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    :
                    <div>
                        <FormGroup controlId="colorBackStyle">
                            <Col xs={4} componentClass={ControlLabel}>BackColor: </Col>
                            <Col xs={8}>
                                <ColorPicker value={this.state.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="colorForeStyle">
                            <Col xs={4} componentClass={ControlLabel}>ForeColor: </Col>
                            <Col xs={8}>
                                <ColorPicker value={this.state.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                            </Col>
                        </FormGroup>
                    </div>}


            </Form>
        </Panel>
    }

    private GetUserFilterState(): UserFilterState {
        return this.props.Blotter.AdaptableBlotterStore.TheStore.getState().UserFilter;
    }


    private onExpressionOptionChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let result: boolean = (e.value == "predefined")
        this.setState({ IsPredefinedExpression: result } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onPredefinedExpressionSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ PredefinedStyleCondition: this.predefinedExpressions.find(pe => pe.Id == e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onBackColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ BackColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onForeColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ForeColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onWhereAppliedSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Column } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
        } else {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Row, IsPredefinedExpression: false } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
        }
    }

    private onCreatePredefinedExpression() {
        let predefinedExpression: Expression = ExpressionHelper.CreateExpressionFromPredefinedExpressionInfo(this.state.ColumnId, this.state.PredefinedStyleCondition.PredefinedExpressionInfo);
        this.state.BackColor = this.state.PredefinedStyleCondition.BackColor;
        this.state.ForeColor = this.state.PredefinedStyleCondition.ForeColor;
        this.state.Expression = predefinedExpression;
    }

    public canNext(): boolean {
        if (this.state.IsPredefinedExpression) {
            if (this.state.PredefinedStyleCondition == null) {
                return false;
            }
        }
        if (!this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == ConditionalStyleScope.Column && this.state.ColumnId == "select") {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        // if its predefined then we need to create the expression and the colour here based on the predefined expresssion
        if (this.state.IsPredefinedExpression) {
            this.onCreatePredefinedExpression();
        }
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.BackColor = this.state.BackColor;
        this.props.Data.ForeColor = this.state.ForeColor;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
        this.props.Data.IsPredefinedExpression = this.state.IsPredefinedExpression;
        this.props.Data.PredefinedStyleCondition = this.state.PredefinedStyleCondition;
        this.props.Data.Expression = this.state.Expression;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}