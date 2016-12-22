/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, ColumnType, CellStyle, LeafExpressionOperator } from '../../Core/Enums';
import { Helper } from '../../Core/Helper';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { EnumExtensions } from '../../Core/Extensions';
import { IPredefinedExpressionInfo, PredefinedExpressionHelper } from '../../Core/Expression/PredefinedExpressionHelper';
import { IExpressionRange } from '../../Core/Interface/IExpression';

interface ConditionalStyleSettingsWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}

interface ConditionalStyleSettingsWizardState {
    ColumnId: string,
    CellStyle: CellStyle,
    ConditionalStyleScope: ConditionalStyleScope,
    IsPredefinedExpression: boolean,
    PredefinedExpressionInfo: IPredefinedExpressionInfo,
    Expression: Expression
}

export class ConditionalStyleSettingsWizard extends React.Component<ConditionalStyleSettingsWizardProps, ConditionalStyleSettingsWizardState> implements AdaptableWizardStep {
private predefinedExpressions: IPredefinedExpressionInfo[] = [];


constructor(props: ConditionalStyleSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            CellStyle: this.props.Data.CellStyle,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
            IsPredefinedExpression: this.props.Data.IsPredefinedExpression,
            PredefinedExpressionInfo: this.props.Data.PredefinedExpressionInfo,
            Expression: this.props.Data.Expression
        }
    }


    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })

        let optionColours = EnumExtensions.getNamesAndValues(CellStyle).map((conditionalStyleColourNameAndValue: any) => {
            return <option key={conditionalStyleColourNameAndValue.value} value={conditionalStyleColourNameAndValue.value}>{conditionalStyleColourNameAndValue.name}</option>
        })

if(this.predefinedExpressions.length==0){
        // create 2 predefined styles - do it here and not in the helper class
        this.predefinedExpressions.push({
            Id: "PositiveGreen", FriendlyName: "Positive numbers in green font", CellStyle: CellStyle.GreenFont,
            ExpressionRange: null,
            ExpressionFilter: this.props.Blotter.ExpressionService.GetFilterExpressions().find(f=>f.ExpressionName=="Positive"),
        });


        this.predefinedExpressions.push({
            Id: "NegativeRed", FriendlyName: "Negative numbers in red font", CellStyle: CellStyle.RedFont,
            ExpressionRange: null,
            ExpressionFilter: this.props.Blotter.ExpressionService.GetFilterExpressions().find(f=>f.ExpressionName=="Negative"),
        });
}

        let optionPredefinedExpressions = this.predefinedExpressions.map(pe => {
            return <option key={pe.Id} value={pe.Id}>{pe.FriendlyName}</option>
        })

        let emptyStyle: string = "Select a style"
        let currentColour = this.state.CellStyle == null ? emptyStyle : this.state.CellStyle.toString();

        let emptyPredefinedExpression: string = "Select an expression"
        let currentPredefinedExpression = (this.state.IsPredefinedExpression && this.state.PredefinedExpressionInfo != null) ?
            this.state.PredefinedExpressionInfo.Id :
            emptyPredefinedExpression;

        return <Panel header="Conditional Style Settings" bsStyle="primary">
            <Form horizontal>


                <FormGroup controlId="whereApplied">
                    <Col xs={4} componentClass={ControlLabel}>Apply To: </Col>
                    <Col xs={8}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.ConditionalStyleScope.toString()} onChange={(x) => this.onWhereAppliedSelectChange(x)} >
                            {
                                EnumExtensions.getNamesAndValues(ConditionalStyleScope).map((conditionalStyleScopeNameAndValue: any) => {
                                    return <option key={conditionalStyleScopeNameAndValue.value} value={conditionalStyleScopeNameAndValue.value}>{conditionalStyleScopeNameAndValue.name}</option>
                                })
                            })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>

                {this.state.ConditionalStyleScope == ConditionalStyleScope.Column ?

                    <FormGroup controlId="formColumn">
                        <Col componentClass={ControlLabel} xs={4}>Select Column: </Col>
                        <Col xs={8}>
                            <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                                <option value="select" key="select">Select a column</option>
                                {optionColumns}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    : null}

                <FormGroup controlId="applyTo">
                    <Col xs={4} componentClass={ControlLabel}>Expression Type: </Col>
                    <Col xs={8}>
                        <Radio value="custom" checked={this.state.IsPredefinedExpression == false}
                            onChange={(e) => this.onExpressionOptionChange(e)}>
                            Custom Expression (created in next step)
                        </Radio>
                        {this.state.ConditionalStyleScope == ConditionalStyleScope.Column ? <Radio value="predefined"
                            checked={this.state.IsPredefinedExpression == true} onChange={(e) => this.onExpressionOptionChange(e)}>
                            Existing Expression
                        </Radio> : null}
                    </Col>
                </FormGroup>


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

                    <FormGroup controlId="styleName">
                        <Col xs={4} componentClass={ControlLabel}>Select Style: </Col>
                        <Col xs={8}>
                            <FormControl componentClass="select" placeholder="select" value={currentColour} onChange={(x) => this.onColourSelectChange(x)} >
                                <option value="select" key="select">{emptyStyle}</option>
                                {optionColours}
                            </FormControl>
                        </Col>
                    </FormGroup>}


            </Form>
        </Panel>
    }

    // this enum should really be a class and then its all in there...
    private mapPredefinedExpressionToText(conditionalStylePredefinedExpression: IPredefinedExpressionInfo): string {
        return conditionalStylePredefinedExpression.FriendlyName
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
        this.setState({ PredefinedExpressionInfo: this.predefinedExpressions.find(pe => pe.Id == e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellStyle: Number.parseInt(e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
    }

    private onWhereAppliedSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let conditionalScope = Number.parseInt(e.value)
        if (conditionalScope == ConditionalStyleScope.Column) {
            this.setState({ ConditionalStyleScope: Number.parseInt(e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
        }
        else if (conditionalScope == ConditionalStyleScope.Row) {
            this.setState({ ConditionalStyleScope: Number.parseInt(e.value), IsPredefinedExpression: false } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
        }

    }

    private onCreatePredefinedExpression() {
        let testExpression: Expression = PredefinedExpressionHelper.CreatePredefinedExpression(this.state.ColumnId, this.state.PredefinedExpressionInfo, this.props.Blotter);
        //   this.setState({ Expression: testExpression } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))
        //   this.setState({ ConditionalStyleColour: conditionalStyleColour } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState(this.state.IsPredefinedExpression))  
        this.state.CellStyle = this.state.PredefinedExpressionInfo.CellStyle;
        this.state.Expression = testExpression;
    }

    public canNext(): boolean {
        if (this.state.IsPredefinedExpression) {
            if (this.state.PredefinedExpressionInfo == null) {
                return false;
            }
        } else {
            if (this.state.CellStyle == null) {
                return false;
            }
        }
        if (this.state.ConditionalStyleScope == null) {
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
        this.props.Data.CellStyle = this.state.CellStyle;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
        this.props.Data.IsPredefinedExpression = this.state.IsPredefinedExpression;
        this.props.Data.PredefinedExpressionInfo = this.state.PredefinedExpressionInfo;
        this.props.Data.Expression = this.state.Expression;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}