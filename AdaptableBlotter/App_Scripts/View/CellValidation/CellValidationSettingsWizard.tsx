/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { ColumnType, CellValidationAction, LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface CellValidationSettingsWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface CellValidationSettingsWizardState {
    ColumnId: string
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
    ColumnType: ColumnType;
    CellValidationAction: CellValidationAction;
    HasOtherExpression: boolean;
}

export class CellValidationSettingsWizard extends React.Component<CellValidationSettingsWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            Operator: this.props.Data.RangeExpression.Operator,
            Operand1: this.props.Data.RangeExpression.Operand1,
            Operand2: this.props.Data.RangeExpression.Operand2,
            ColumnType: this.props.Data.ColumnType,
            CellValidationAction: this.props.Data.CellValidationAction,
            HasOtherExpression: this.props.Data.HasOtherExpression
        }
    }

    public componentDidMount() {
        // would rather not but only way I can see to force page to show Finish (which is default)
        this.props.UpdateGoBackState(this.state.HasOtherExpression == false);
    }

    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{this.getTextForCellChangeValue(operator)}</option>
        })


        return <div style={smallMarginStyle}>

            <Form horizontal>
                <Panel header="Validation Settings" bsStyle="primary" >

                    <FormGroup controlId="formAction">
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Action: </Col>
                            <Col xs={3}>
                                <Radio value={CellValidationAction.Prevent.toString()} checked={this.state.CellValidationAction == CellValidationAction.Prevent} onChange={(e) => this.onCellValidationActionChanged(e)}>Prevent Edit</Radio>
                            </Col>
                            <Col xs={6}>
                                <Radio value={CellValidationAction.Warning.toString()} checked={this.state.CellValidationAction == CellValidationAction.Warning} onChange={(e) => this.onCellValidationActionChanged(e)}>Show Warning</Radio>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup controlId="formColumn">
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Column: </Col>
                            <Col xs={9}>
                                <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChanged(x)} >
                                    <option value="select" key="select">Select a column</option>
                                    {optionColumns}
                                </FormControl>
                            </Col>
                        </Row>
                    </FormGroup>
                </Panel>
                <Panel header="Validation Condition" bsStyle="primary">
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Apply: </Col>
                            <Col xs={9}>
                                <FormControl componentClass="select" placeholder="select" value={this.state.Operator.toString()} onChange={(x) => this.onOperatorChanged(x)} >
                                    {operatorTypes}
                                </FormControl>
                            </Col>
                        </Row>
                    </FormGroup>

                    { /* if  numeric then show a numeric control */}
                    {this.state.Operator != LeafExpressionOperator.Any && this.state.ColumnType == ColumnType.Number &&
                        <FormGroup>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}>{this.getTextForValueLabel()}</Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }} value={this.state.Operand1} type="number" placeholder="Enter a Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                                { /* if between operator then show a second numeric control */}
                                {(this.state.Operator == LeafExpressionOperator.Between || this.state.Operator == LeafExpressionOperator.NotBetween) &&
                                    <Col xs={4}>
                                        <FormControl style={{ width: "Auto" }} value={this.state.Operand2} type="number" placeholder="Enter a Number" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                    </Col>
                                }
                            </Row>
                        </FormGroup>
                    }

                    { /* if  date then show a date control */}
                    {this.state.Operator != LeafExpressionOperator.Any && this.state.ColumnType == ColumnType.Date &&
                        <FormGroup>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}>{this.getTextForValueLabel()}</Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }} type="date" placeholder="Enter a date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                                { /* if between operator then show a second date control */}
                                {(this.state.Operator == LeafExpressionOperator.Between || this.state.Operator == LeafExpressionOperator.NotBetween) &&
                                    <Col xs={4}>
                                        <FormControl style={{ width: "Auto" }} value={this.state.Operand2} type="date" placeholder="Enter a date" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                    </Col>
                                }
                            </Row>
                        </FormGroup>
                    }

                    { /* if not numeric or date then show a string control for now */}
                    {this.state.Operator != LeafExpressionOperator.Any && (this.state.ColumnType == ColumnType.String || this.state.ColumnType == ColumnType.Boolean) &&
                        <FormGroup>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}>Value: </Col>
                                <Col xs={9}>
                                    <FormControl style={{ width: "Auto" }} value={this.state.Operand1} type="string" placeholder="Enter a Value" onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                            </Row>
                        </FormGroup>
                    }

                    <FormGroup controlId="formOtherExpression">
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Based On: </Col>
                            <Col xs={9}>
                                <Radio value="thisColumn" checked={this.state.HasOtherExpression == false}
                                    onChange={(e) => this.onOtherExpressionOptionChanged(e)}>
                                    This Column Only
                                </Radio>
                                <Radio value="otherExpression" checked={this.state.HasOtherExpression == true}
                                    onChange={(e) => this.onOtherExpressionOptionChanged(e)}>
                                    Other Column Values
                                </Radio>
                            </Col>
                        </Row>
                    </FormGroup>

                </Panel>
            </Form>
        </div>

    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let columnType: ColumnType = (e.value == "select") ? ColumnType.Object : this.props.Columns.find(c => c.ColumnId == e.value).ColumnType;
        this.setState({ ColumnId: e.value, ColumnType: columnType, Operand1: "", Operand2: "", Operator: LeafExpressionOperator.Any } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasOtherExpression == false))
    }

    private onOperatorChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operator: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasOtherExpression == false))
    }

    private onOperand1ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand1: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasOtherExpression == false))
    }

    private onOperand2ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand2: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasOtherExpression == false))
    }

    private onCellValidationActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellValidationAction: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasOtherExpression == false))
    }

    private onOtherExpressionOptionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let result: boolean = (e.value == "otherExpression")
        this.setState({ HasOtherExpression: result } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(e.value == "thisColumn"))
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        if (!this.stateHasColumn()) {
            return [LeafExpressionOperator.Any];
        }
        switch (this.state.ColumnType) {
            case ColumnType.String:
            case ColumnType.Boolean:
                return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
            case ColumnType.Date:
                return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween];
            case ColumnType.Number:
                return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.LessThan, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween, LeafExpressionOperator.ValueChange, LeafExpressionOperator.PercentChange];
        }
    }

    private getTextForCellChangeValue(leafExpressionOperator: LeafExpressionOperator): string {
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.Any:
                return "Any Change In Value"
            case LeafExpressionOperator.Equals:
                return "New Value Equals"
            case LeafExpressionOperator.NotEquals:
                return "New Value Not Equal To"
            case LeafExpressionOperator.GreaterThan:
                if (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Date) {
                    return "New Value Is After"
                } else {
                    return "New Value Greater Than"
                }
            case LeafExpressionOperator.LessThan:
                if (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Date) {
                    return "New Value Is Before"
                } else {
                    return "New Value Less Than"
                }
            case LeafExpressionOperator.Between:
                return "New Value Is Between"
            case LeafExpressionOperator.NotBetween:
                return "New Value Is Not Between"
            case LeafExpressionOperator.ValueChange:
                return "Value Change is At Least"
            case LeafExpressionOperator.PercentChange:
                return "% Change is At Least"
        }
    }

    
    createCellValidationRuleDescription(cellValidationRule: ICellValidationRule): string {
        if (cellValidationRule.RangeExpression.Operator == LeafExpressionOperator.Any) {
            return " any change in value";
        }

        let valueDescription: string = "";

        switch (cellValidationRule.RangeExpression.Operator) {
            case LeafExpressionOperator.Equals:
                valueDescription = " new value = ";
                break;
            case LeafExpressionOperator.NotEquals:
                valueDescription = " new value <> ";
                break;
            case LeafExpressionOperator.GreaterThan:
                valueDescription = " new value > ";
                break;
            case LeafExpressionOperator.LessThan:
                valueDescription = " new value < ";
                break;
            case LeafExpressionOperator.ValueChange:
                valueDescription = " change in value >= ";
                break;
            case LeafExpressionOperator.PercentChange:
                valueDescription = " % change is at least ";
                break;
            case LeafExpressionOperator.Between:
                valueDescription = " new value between ";
                break;
            case LeafExpressionOperator.NotBetween:
                valueDescription = " new value not between ";
                break;
        }
        let operand1Text: string = (cellValidationRule.ColumnType == ColumnType.Boolean || cellValidationRule.ColumnType == ColumnType.Number) ?
            cellValidationRule.RangeExpression.Operand1 :
            "'" + cellValidationRule.RangeExpression.Operand1 + "'"

        valueDescription = valueDescription + operand1Text;

        if (cellValidationRule.RangeExpression.Operator == LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }

        if (StringExtensions.IsNotNullOrEmpty(cellValidationRule.RangeExpression.Operand2)) {
            let operand2Text: string = (cellValidationRule.ColumnType == ColumnType.Number) ?
                " and " + cellValidationRule.RangeExpression.Operand2 :
                " and '" + cellValidationRule.RangeExpression.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }

        return valueDescription;
    }

    private getTextForValueLabel(): string {
        return (this.state.Operator == LeafExpressionOperator.Between || this.state.Operator == LeafExpressionOperator.NotBetween) ? "Range: " : "Value: ";
    }

    private stateHasColumn(): boolean {
        return this.state.ColumnId != 'select'
    }

    public canNext(): boolean {
        if (!this.stateHasColumn()) { return false };
        if (this.state.Operator == LeafExpressionOperator.Any) {
            return true;
        }
        if (this.state.Operator == LeafExpressionOperator.Between || this.state.Operator == LeafExpressionOperator.NotBetween) {
            if (StringExtensions.IsNullOrEmpty(this.state.Operand2)) {
                return false;
            }
        }
        return StringExtensions.IsNotNullOrEmpty(this.state.Operand1);
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        var rangeExpression: IRangeExpression = {
            Operator: this.state.Operator,
            Operand1: this.state.Operand1,
            Operand2: this.state.Operand2
        }
        this.props.Data.RangeExpression = rangeExpression;
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.CellValidationAction = this.state.CellValidationAction;
        this.props.Data.ColumnType = this.state.ColumnType;
        this.props.Data.HasOtherExpression = this.state.HasOtherExpression;
        this.props.Data.Description = this.createCellValidationRuleDescription(this.props.Data);
    }
    public Back(): void { }
    public StepName = "Validation Setup"
}
let smallMarginStyle = {
    margin: '3px'
}
