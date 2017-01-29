/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox } from 'react-bootstrap';
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


        return <div>
            <Panel header="Validation Settings" bsStyle="primary">

                <Form horizontal>
                    <Panel header="Validation Action" bsStyle="info" >
                        <FormGroup controlId="formAction">
                            <Col xs={3}>
                                <Radio value={CellValidationAction.Prevent.toString()} checked={this.state.CellValidationAction == CellValidationAction.Prevent} onChange={(e) => this.onCellValidationActionChanged(e)}>Prevent Edit</Radio>
                            </Col>
                            <Col xs={9}>
                                <Radio value={CellValidationAction.Warning.toString()} checked={this.state.CellValidationAction == CellValidationAction.Warning} onChange={(e) => this.onCellValidationActionChanged(e)}>Show Warning</Radio>
                            </Col>
                        </FormGroup>
                    </Panel>

                    <Panel header="Validation Column" bsStyle="info" >
                        <FormGroup controlId="formColumn">
                            <Col xs={9}>
                                <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChanged(x)} >
                                    <option value="select" key="select">Select a column</option>
                                    {optionColumns}
                                </FormControl>
                            </Col>
                        </FormGroup>
                    </Panel>

                    <Panel header="Validation Condition" bsStyle="info">
                        <FormGroup>
                            <Col xs={4}>
                                <FormControl componentClass="select" placeholder="select" value={this.state.Operator.toString()} onChange={(x) => this.onOperatorChanged(x)} >
                                    {operatorTypes}
                                </FormControl>
                            </Col>

                            { /* if  numeric then show a numeric control */}
                            {this.isNotAnyOperator() && this.state.ColumnType == ColumnType.Number &&
                                <Col xs={4}>
                                    <FormControl value={this.state.Operand1} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                            }

                            { /* if numeric and between operator then show a second numeric control */}
                            {this.isBetweenOperator() && this.state.ColumnType == ColumnType.Number &&
                                <Col xs={4}>
                                    <FormControl value={this.state.Operand2} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                </Col>
                            }

                            { /* if  date then show a date control */}
                            {this.isNotAnyOperator() && this.state.ColumnType == ColumnType.Date &&
                                <Col xs={4}>
                                    <FormControl type="date" placeholder="Enter Date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                            }

                            { /* if between operator then show a second date control */}
                            {this.isBetweenOperator() && this.state.ColumnType == ColumnType.Date &&
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }} value={this.state.Operand2} type="date" placeholder="Enter Date" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                </Col>
                            }

                            { /* if not numeric or date then show a text control for now */}
                            {this.isNotAnyOperator() && (this.state.ColumnType == ColumnType.String || this.state.ColumnType == ColumnType.Boolean) &&
                                <Col xs={4}>
                                    <FormControl value={this.state.Operand1} type="string" placeholder="Enter a Value" onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                            }
                        </FormGroup>
                    </Panel>

                    <Panel header="Validation Expression" bsStyle="info">
                        <FormGroup controlId="formOtherExpression">
                            <Col xs={12}>
                                <Checkbox onChange={(e) => this.onOtherExpressionOptionChanged(e)} checked={this.state.HasOtherExpression}>
                                Base on other cell values (you create the Expression in the next step)
                                </Checkbox>
                            </Col>
                        </FormGroup>

                    </Panel>
                </Form>
            </Panel>
        </div>

    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let columnType: ColumnType = (e.value == "select") ? ColumnType.Object : this.props.Columns.find(c => c.ColumnId == e.value).ColumnType;
        this.setState({ ColumnId: e.value, ColumnType: columnType, Operand1: "", Operand2: "", Operator: LeafExpressionOperator.All } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasOtherExpression == false))
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
        this.setState({ HasOtherExpression: e.checked } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(e.checked == false))
    }

    private isBetweenOperator(): boolean {
        return this.state.Operator == LeafExpressionOperator.Between || this.state.Operator == LeafExpressionOperator.NotBetween;
    }
    private isNotAnyOperator(): boolean {
        return this.state.Operator != LeafExpressionOperator.All;
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        if (!this.stateHasColumn()) {
            return [LeafExpressionOperator.All];
        }
        switch (this.state.ColumnType) {
            case ColumnType.String:
            case ColumnType.Boolean:
                return [LeafExpressionOperator.All, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
            case ColumnType.Date:
                return [LeafExpressionOperator.All, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween];
            case ColumnType.Number:
                return [LeafExpressionOperator.All, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.LessThan, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween, LeafExpressionOperator.ValueChange, LeafExpressionOperator.PercentChange];
        }
    }

    private getTextForCellChangeValue(leafExpressionOperator: LeafExpressionOperator): string {
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.All:
                return "All Changes"
            case LeafExpressionOperator.Equals:
                return "Equals"
            case LeafExpressionOperator.NotEquals:
                return "Not Equals"
            case LeafExpressionOperator.GreaterThan:
                if (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Date) {
                    return "After"
                } else {
                    return "Greater Than"
                }
            case LeafExpressionOperator.LessThan:
                if (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Date) {
                    return "Before"
                } else {
                    return "Less Than"
                }
            case LeafExpressionOperator.Between:
                return "Between"
            case LeafExpressionOperator.NotBetween:
                return "Not Between"
            case LeafExpressionOperator.ValueChange:
                return "Change At Least"
            case LeafExpressionOperator.PercentChange:
                return "% Change At Least"
        }
    }


    createCellValidationRuleDescription(cellValidationRule: ICellValidationRule): string {
        if (cellValidationRule.RangeExpression.Operator == LeafExpressionOperator.All) {
            return "All changes";
        }

        let valueDescription: string = "";

        switch (cellValidationRule.RangeExpression.Operator) {
            case LeafExpressionOperator.Equals:
                valueDescription = "New value = ";
                break;
            case LeafExpressionOperator.NotEquals:
                valueDescription = "New value <> ";
                break;
            case LeafExpressionOperator.GreaterThan:
                valueDescription = "New value > ";
                break;
            case LeafExpressionOperator.LessThan:
                valueDescription = "New value < ";
                break;
            case LeafExpressionOperator.ValueChange:
                valueDescription = "Change in value >= ";
                break;
            case LeafExpressionOperator.PercentChange:
                valueDescription = "% change is at least ";
                break;
            case LeafExpressionOperator.Between:
                valueDescription = "New value between ";
                break;
            case LeafExpressionOperator.NotBetween:
                valueDescription = "New value not between ";
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

    private stateHasColumn(): boolean {
        return this.state.ColumnId != 'select'
    }

    public canNext(): boolean {
        if (!this.stateHasColumn()) { return false };
        if (this.state.Operator == LeafExpressionOperator.All) {
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
    public StepName = "Create Editing Restriction"
}

