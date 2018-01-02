import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { DataType, CellValidationMode, LeafExpressionOperator, PopoverType } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';

export interface CellValidationRulesWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>
}
export interface CellValidationSettingsWizardState {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}

export class CellValidationRulesWizard extends React.Component<CellValidationRulesWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationRulesWizardProps) {
        super(props)
        this.state = {
            Operator: this.props.Data.RangeExpression.Operator,
            Operand1: this.props.Data.RangeExpression.Operand1,
            Operand2: this.props.Data.RangeExpression.Operand2,
        }
    }

    render(): any {

        let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{this.getTextForLeafOperator(operator)}</option>
        })

        let columnFriendlyName: string = this.props.Columns.find(c => c.ColumnId == this.props.Data.ColumnId).FriendlyName;

        let validationRuleHeader: string = "Validation Rule for Column: " + columnFriendlyName;
       
        let helpText : string = "Decide whether to prevent all edits for this column, or whether to allow those which match a rule (to be set by you).";

        return <div>
            <Panel header={validationRuleHeader} bsStyle="primary">

                <AdaptableBlotterForm >
                    <Col xs={12}>
                        <HelpBlock>{helpText}</HelpBlock>
                    </Col>
                    <Col xs={12} style={divStyle}>
                        <Radio inline value="None" checked={this.state.Operator == LeafExpressionOperator.None} onChange={(e) => this.onDisallowEditChanged(e)}>Disallow ALL edits</Radio>
                        {' '}<AdaptablePopover headerText={"Validation Rule: No Edits Allowed"} bodyText={["Any edit is invalid - effectively makes the column read-only."]} popoverType={PopoverType.Info} />
                    </Col>
                    <Col xs={12} style={divStyle}>
                        <Radio inline value="others" checked={this.state.Operator != LeafExpressionOperator.None} onChange={(e) => this.onDisallowEditChanged(e)}>Only allow edits where the new cell value matches rule:</Radio>
                        {' '}<AdaptablePopover headerText={"Validation Rule: Custom"} bodyText={["Only edits that match the rule defined in the dropdown below are valid."]} popoverType={PopoverType.Info} />
                    </Col>
                </AdaptableBlotterForm>

                { /* if not None operator then show operator dropdown */}
                <FormGroup style={divStyle}>
                    <Col xs={1}></Col>
                    <Col xs={6}>
                        <FormControl disabled={this.checkOperator(LeafExpressionOperator.None)} componentClass="select" placeholder="select" value={this.state.Operator.toString()} onChange={(x) => this.onOperatorChanged(x)} >
                            {operatorTypes}
                        </FormControl>
                    </Col>

                    { /* if  numeric then show a numeric control */}
                    {!this.checkOperator(LeafExpressionOperator.None) && !this.checkOperator(LeafExpressionOperator.Unknown) && !this.checkOperator(LeafExpressionOperator.IsPositive) && !this.checkOperator(LeafExpressionOperator.IsNegative) && this.getColumnDataTypeFromState() == DataType.Number &&
                        <Col xs={5}>
                            <FormControl value={this.state.Operand1} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                            {this.isBetweenOperator() &&
                                <FormControl value={this.state.Operand2} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand2ValueChanged(x)} />
                            }
                        </Col>
                    }

                    { /* if  date then show a date control */}
                    {!this.checkOperator(LeafExpressionOperator.None) && !this.checkOperator(LeafExpressionOperator.Unknown) && this.getColumnDataTypeFromState() == DataType.Date &&
                        <Col xs={5}>
                            <FormControl type="date" placeholder="Enter Date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                            {this.isBetweenOperator() &&
                                <FormControl value={this.state.Operand2} type="date" placeholder="Enter Date" onChange={(x) => this.onOperand2ValueChanged(x)} />
                            }
                        </Col>
                    }

                    { /* if string then show a text control  */}
                    {!this.checkOperator(LeafExpressionOperator.None) && !this.checkOperator(LeafExpressionOperator.Unknown) && this.getColumnDataTypeFromState() == DataType.String &&
                        <Col xs={5}>
                            <FormControl value={this.state.Operand1} type="string" placeholder="Enter a Value" onChange={(x) => this.onOperand1ValueChanged(x)} />
                        </Col>
                    }
                </FormGroup>

            </Panel>
        </div>

    }


    private onOperatorChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operator: e.value, Operand1: "", Operand2: "" } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onOperand1ValueChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand1: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onOperand2ValueChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand2: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onDisallowEditChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let operator: LeafExpressionOperator = (e.value == "None") ? LeafExpressionOperator.None : LeafExpressionOperator.Unknown;
        this.setState({ Operator: operator } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    private getColumnDataTypeFromState(): DataType {
        return this.props.Columns.find(c => c.ColumnId == this.props.Data.ColumnId).DataType;
    }

    private checkOperator(operator: LeafExpressionOperator): boolean {
        return this.state.Operator == operator;
    }

    private isBetweenOperator(): boolean {
        return this.checkOperator(LeafExpressionOperator.Between) || this.checkOperator(LeafExpressionOperator.NotBetween);
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        switch (this.getColumnDataTypeFromState()) {
            case DataType.Boolean:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.IsTrue, LeafExpressionOperator.IsFalse];
            case DataType.String:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
            case DataType.Date:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween];
            case DataType.Number:
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
                if (this.getColumnDataTypeFromState() == DataType.Date) {
                    return "After "
                } else {
                    return "Greater Than "
                }
            case LeafExpressionOperator.LessThan:
                if (this.getColumnDataTypeFromState() == DataType.Date) {
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
        let dataType: DataType = this.props.Columns.find(c => c.ColumnId == CellValidation.ColumnId).DataType;
        let operand1Text: string = (dataType == DataType.Boolean || dataType == DataType.Number) ?
            CellValidation.RangeExpression.Operand1 :
            "'" + CellValidation.RangeExpression.Operand1 + "'"

        valueDescription = valueDescription + operand1Text;

        if (CellValidation.RangeExpression.Operator == LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }

        if (StringExtensions.IsNotNullOrEmpty(CellValidation.RangeExpression.Operand2)) {
            let operand2Text: string = (dataType == DataType.Number) ?
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
        this.props.Data.Description = this.createCellValidationDescription(this.props.Data);
    }

    public Back(): void { }
    public StepName = "Cell Validation Rule"
}


let divStyle = {
    margin: '10px'
}

