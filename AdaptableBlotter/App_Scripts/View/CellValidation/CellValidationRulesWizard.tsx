/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { ColumnType, CellValidationAction, LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions';

interface CellValidationRulesWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface CellValidationSettingsWizardState {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
    HasExpression: boolean;
    CellValidationAction: CellValidationAction;
}

export class CellValidationRulesWizard extends React.Component<CellValidationRulesWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationRulesWizardProps) {
        super(props)
        this.state = {
            Operator: this.props.Data.RangeExpression.Operator,
            Operand1: this.props.Data.RangeExpression.Operand1,
            Operand2: this.props.Data.RangeExpression.Operand2,
            HasExpression: this.props.Data.HasExpression,
            CellValidationAction: this.props.Data.CellValidationAction,
        }
    }

    public componentDidMount() {
        // would rather not but only way I can see to force page to show Finish (which is default)
        this.props.UpdateGoBackState(this.state.HasExpression == false);
    }

    render(): any {

        let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{this.getTextForLeafOperator(operator)}</option>
        })

        let columnFriendlyName: string = this.props.Columns.find(c => c.ColumnId == this.props.Data.ColumnId).FriendlyName;

        let validationRuleHeader: string = "Validation Rule for Column: " + columnFriendlyName;

        return <div>
            <Panel header="Cell Validation Settings" bsStyle="primary">

                <Panel header="Action To Take When Validation Fails" bsStyle="info"  >
                    <Form inline>
                        <Col xs={12} style={divStyle}>
                            <Radio inline value={CellValidationAction.Prevent.toString()} checked={this.state.CellValidationAction == CellValidationAction.Prevent} onChange={(e) => this.onCellValidationActionChanged(e)}>Prevent the cell edit in all circumstances</Radio>
                        </Col>
                        <Col xs={12} style={divStyle}>
                            <Radio inline value={CellValidationAction.Warning.toString()} checked={this.state.CellValidationAction == CellValidationAction.Warning} onChange={(e) => this.onCellValidationActionChanged(e)}>Display a warning - with options to allow or disallow the edit</Radio>
                        </Col>
                    </Form>
                </Panel>


                <Panel header={validationRuleHeader} bsStyle="info">
                    <Form >
                        <Col xs={12} style={divStyle}>
                            <Radio inline value="None" checked={this.state.Operator == LeafExpressionOperator.None} onChange={(e) => this.onDisallowEditChanged(e)}>Disallow ALL edits</Radio>
                        </Col>
                        <Col xs={12} style={divStyle}>
                            <Radio inline value="others" checked={this.state.Operator != LeafExpressionOperator.None} onChange={(e) => this.onDisallowEditChanged(e)}>Only allow edits where the new cell value matches rule:</Radio>
                        </Col>
                    </Form>

                    { /* if not None operator then show operator dropdown */}               
                          <FormGroup style={divStyle}>
                            <Col xs={1}></Col>
                              <Col xs={6}>
                                <FormControl disabled={this.checkOperator(LeafExpressionOperator.None)} componentClass="select" placeholder="select" value={this.state.Operator.toString()} onChange={(x) => this.onOperatorChanged(x)} >
                                    {operatorTypes}
                                </FormControl>
                            </Col>

                            { /* if  numeric then show a numeric control */}
                            {!this.checkOperator(LeafExpressionOperator.None)&& !this.checkOperator(LeafExpressionOperator.Unknown) && !this.checkOperator(LeafExpressionOperator.IsPositive) && !this.checkOperator(LeafExpressionOperator.IsNegative) && this.getColumnTypeFromState() == ColumnType.Number &&
                                <Col xs={5}>
                                    <FormControl value={this.state.Operand1} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                                    {this.isBetweenOperator() &&
                                        <FormControl value={this.state.Operand2} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                    }
                                </Col>
                            }

                            { /* if  date then show a date control */}
                            {!this.checkOperator(LeafExpressionOperator.None)&&!this.checkOperator(LeafExpressionOperator.Unknown) && this.getColumnTypeFromState() == ColumnType.Date &&
                                <Col xs={5}>
                                    <FormControl type="date" placeholder="Enter Date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                                    {this.isBetweenOperator() &&
                                        <FormControl value={this.state.Operand2} type="date" placeholder="Enter Date" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                    }
                                </Col>
                            }

                            { /* if string then show a text control  */}
                            {!this.checkOperator(LeafExpressionOperator.None)&&!this.checkOperator(LeafExpressionOperator.Unknown) && this.getColumnTypeFromState() == ColumnType.String &&
                                <Col xs={5}>
                                    <FormControl value={this.state.Operand1} type="string" placeholder="Enter a Value" onChange={(x) => this.onOperand1ValueChanged(x)} />
                                </Col>
                            }
                        </FormGroup>
                    
                </Panel>

                <Panel header="Expression" bsStyle="info">
                    <Form inline >
                        <Col xs={12}> <HelpBlock>An Expression is used if the rule is dependent on other values in the row.<br />The rule will only be activated and checked if the Expression passes.</HelpBlock>
                        </Col>
                        <Col xs={12}>
                            <Checkbox inline onChange={(e) => this.onOtherExpressionOptionChanged(e)} checked={this.state.HasExpression}>Create Expression (created in next step)</Checkbox>
                        </Col>
                    </Form>

                </Panel>
            </Panel>
        </div>

    }


    private onCellValidationActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellValidationAction: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onOperatorChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operator: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOperand1ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand1: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOperand2ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand2: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onDisallowEditChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let operator: LeafExpressionOperator = (e.value == "None") ? LeafExpressionOperator.None : LeafExpressionOperator.Unknown;
        this.setState({ Operator: operator } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOtherExpressionOptionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ HasExpression: e.checked } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState(e.checked == false))
    }

    private getColumnTypeFromState(): ColumnType {
        return this.props.Columns.find(c => c.ColumnId == this.props.Data.ColumnId).ColumnType;
    }

    private checkOperator(operator: LeafExpressionOperator): boolean {
        return this.state.Operator == operator;
    }

    private isBetweenOperator(): boolean {
        return this.checkOperator(LeafExpressionOperator.Between) || this.checkOperator(LeafExpressionOperator.NotBetween);
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        switch (this.getColumnTypeFromState()) {
            case ColumnType.Boolean:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.IsTrue, LeafExpressionOperator.IsFalse];
            case ColumnType.String:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
            case ColumnType.Date:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween];
            case ColumnType.Number:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.LessThan, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween, LeafExpressionOperator.IsPositive, LeafExpressionOperator.IsNegative, LeafExpressionOperator.ValueChange, LeafExpressionOperator.PercentChange];
        }
    }

    private getTextForLeafOperator(leafExpressionOperator: LeafExpressionOperator): string {
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.None:
                return "No Changes Allowed"
            case LeafExpressionOperator.Unknown:
                return "Select Rule Operator"
            case LeafExpressionOperator.Equals:
                return "Equals "
            case LeafExpressionOperator.NotEquals:
                return "Not Equals "
            case LeafExpressionOperator.GreaterThan:
                if (this.getColumnTypeFromState() == ColumnType.Date) {
                    return "After "
                } else {
                    return "Greater Than "
                }
            case LeafExpressionOperator.LessThan:
                if (this.getColumnTypeFromState() == ColumnType.Date) {
                    return "Before "
                } else {
                    return "Less Than "
                }
            case LeafExpressionOperator.Between:
                return " Between "
            case LeafExpressionOperator.NotBetween:
                return "Not Between "
            case LeafExpressionOperator.IsPositive:
                return "Is Positive ";
            case LeafExpressionOperator.IsNegative:
                return "Is Negative ";
            case LeafExpressionOperator.ValueChange:
                return "Change In Value Less Than "
            case LeafExpressionOperator.PercentChange:
                return "% Change Is Less Than "
            case LeafExpressionOperator.IsTrue:
                return "Is True "
            case LeafExpressionOperator.IsFalse:
                return "Is False "
        }
    }

    createCellValidationDescription(CellValidation: ICellValidationRule): string {

        let valueDescription: string = this.getTextForLeafOperator(CellValidation.RangeExpression.Operator);

        if (!this.operatorRequiresValue(CellValidation.RangeExpression.Operator)) {
            return valueDescription;
        }
        let columnType: ColumnType = this.props.Columns.find(c => c.ColumnId == CellValidation.ColumnId).ColumnType;
        let operand1Text: string = (columnType == ColumnType.Boolean || columnType == ColumnType.Number) ?
            CellValidation.RangeExpression.Operand1 :
            "'" + CellValidation.RangeExpression.Operand1 + "'"

        valueDescription = valueDescription + operand1Text;

        if (CellValidation.RangeExpression.Operator == LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }

        if (StringExtensions.IsNotNullOrEmpty(CellValidation.RangeExpression.Operand2)) {
            let operand2Text: string = (columnType == ColumnType.Number) ?
                " and " + CellValidation.RangeExpression.Operand2 :
                " and '" + CellValidation.RangeExpression.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    }

    private operatorRequiresValue(operator: LeafExpressionOperator): boolean {
        return operator != LeafExpressionOperator.None && operator != LeafExpressionOperator.IsPositive && operator != LeafExpressionOperator.IsNegative && operator != LeafExpressionOperator.IsTrue && operator != LeafExpressionOperator.IsFalse;
    }

    public canNext(): boolean {
        if (!this.operatorRequiresValue(this.state.Operator)) {
            return true;
        }

        if (this.checkOperator(LeafExpressionOperator.Unknown)) {
            return false;
        }

        if (this.isBetweenOperator() && StringExtensions.IsNullOrEmpty(this.state.Operand2)) {
            return false;
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
        this.props.Data.HasExpression = this.state.HasExpression;
        this.props.Data.Description = this.createCellValidationDescription(this.props.Data);
        this.props.Data.CellValidationAction = this.state.CellValidationAction;

    }

    public Back(): void { }
    public StepName = "Cell Validation Rule"
}


let divStyle = {
    margin: '10px'
}

