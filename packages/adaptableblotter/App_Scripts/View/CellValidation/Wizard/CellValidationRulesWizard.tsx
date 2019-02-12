import * as React from "react";
import { Radio, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { DataType, LeafExpressionOperator, MessageType, RangeOperandType } from '../../../Utilities/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ICellValidationRule } from "../../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { IRange } from "../../../Utilities/Interface/Expression/IRange";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";

export interface CellValidationRulesWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
   
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
            Operator: this.props.Data.Range.Operator,
            Operand1: this.props.Data.Range.Operand1,
            Operand2: this.props.Data.Range.Operand2,
        }
    }

    render(): any {

        let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{ExpressionHelper.OperatorToLongFriendlyString(operator, ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns))}</option>
        })

        let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns)

        let validationRuleHeader: string = "Validation Rule for Column: " + columnFriendlyName;

        let helpText: string = "Choose whether to prevent all edits for this column, or whether to allow those which match a rule (to be set by you).";
        let cssClassName: string = this.props.cssClassName + "-rules"

        return <div className={cssClassName}>
            <Panel header={validationRuleHeader} bsStyle="primary">

                <AdaptableBlotterForm >
                    <Col xs={12}>
                        <HelpBlock>{helpText}</HelpBlock>
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio inline value="None" checked={this.state.Operator == LeafExpressionOperator.None} onChange={(e) => this.onDisallowEditChanged(e)}>Disallow ALL edits</Radio>
                        {' '}<AdaptablePopover cssClassName={cssClassName} headerText={"Validation Rule: No Edits Allowed"} bodyText={["Any edit is invalid - effectively makes the column read-only."]} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio inline value="others" checked={this.state.Operator != LeafExpressionOperator.None} onChange={(e) => this.onDisallowEditChanged(e)}>Disallow edits where the new cell value matches rule:</Radio>
                        {' '}<AdaptablePopover cssClassName={cssClassName} headerText={"Validation Rule: Custom"} bodyText={["Disallow edits that match the rule defined in the dropdown below."]} />
                    </Col>
                </AdaptableBlotterForm>

                { /* if not None operator then show operator dropdown */}
                <FormGroup className="ab_large_margin">
                    <Col xs={1}></Col>
                    <Col xs={6}>
                        <FormControl disabled={this.checkOperator(LeafExpressionOperator.None)} componentClass="select" placeholder="select" value={this.state.Operator.toString()} onChange={(x) => this.onOperatorChanged(x)} >
                            {operatorTypes}
                        </FormControl>
                    </Col>

                    { /* if  numeric then show a numeric control */}
                    {!this.checkOperator(LeafExpressionOperator.None) && !this.checkOperator(LeafExpressionOperator.Unknown) && !this.checkOperator(LeafExpressionOperator.IsPositive) && !this.checkOperator(LeafExpressionOperator.IsNegative) && !this.checkOperator(LeafExpressionOperator.IsNotNumber) &&  ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == DataType.Number &&
                        <Col xs={5}>
                            <FormControl value={this.state.Operand1} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                            {this.isBetweenOperator() &&
                                <FormControl value={this.state.Operand2} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand2ValueChanged(x)} />
                            }
                        </Col>
                    }

                    { /* if  date then show a date control */}
                    {!this.checkOperator(LeafExpressionOperator.None) && !this.checkOperator(LeafExpressionOperator.Unknown) &&  ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == DataType.Date &&
                        <Col xs={5}>
                            <FormControl type="date" placeholder="Enter Date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                            {this.isBetweenOperator() &&
                                <FormControl value={this.state.Operand2} type="date" placeholder="Enter Date" onChange={(x) => this.onOperand2ValueChanged(x)} />
                            }
                        </Col>
                    }

                    { /* if string then show a text control  */}
                    {!this.checkOperator(LeafExpressionOperator.None) && !this.checkOperator(LeafExpressionOperator.Unknown) && !this.checkOperator(LeafExpressionOperator.NoDuplicates)&&  ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)== DataType.String &&
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

    private checkOperator(operator: LeafExpressionOperator): boolean {
        return this.state.Operator == operator;
    }

    private isBetweenOperator(): boolean {
        return this.checkOperator(LeafExpressionOperator.Between) || this.checkOperator(LeafExpressionOperator.NotBetween);
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        switch ( ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)) {
            case DataType.Boolean:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.IsTrue, LeafExpressionOperator.IsFalse];
            case DataType.String:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.Contains, LeafExpressionOperator.NotContains, LeafExpressionOperator.StartsWith, LeafExpressionOperator.Regex, LeafExpressionOperator.NoDuplicates];
            case DataType.Date:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween];
            case DataType.Number:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.LessThan, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween, LeafExpressionOperator.IsPositive, LeafExpressionOperator.IsNegative, LeafExpressionOperator.ValueChange, LeafExpressionOperator.PercentChange, LeafExpressionOperator.IsNotNumber];
        }
    }


    public canNext(): boolean {
        if (!ExpressionHelper.OperatorRequiresValue(this.state.Operator)) {
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
        let rangeExpression: IRange = {
            Operator: this.state.Operator,
            Operand1: this.state.Operand1,
            Operand2: this.state.Operand2,
            Operand1Type: RangeOperandType.Value,
            Operand2Type: RangeOperandType.Value
        }
        this.props.Data.Range = rangeExpression;
   //     this.props.Data.Description = this.createCellValidationDescription(this.props.Data);
    }

    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
   
}

