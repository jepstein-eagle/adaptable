/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IEditingRestriction } from '../../Core/interface/IEditingRestrictionStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { ColumnType, EditingRestrictionAction, LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';

interface EditingRestrictionSettingsWizardProps extends AdaptableWizardStepProps<IEditingRestriction> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface EditingRestrictionSettingsWizardState {
    ColumnId: string
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
    EditingRestrictionAction: EditingRestrictionAction;
    HasExpression: boolean;
}

export class EditingRestrictionSettingsWizard extends React.Component<EditingRestrictionSettingsWizardProps, EditingRestrictionSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: EditingRestrictionSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            Operator: this.props.Data.RangeExpression.Operator,
            Operand1: this.props.Data.RangeExpression.Operand1,
            Operand2: this.props.Data.RangeExpression.Operand2,
            EditingRestrictionAction: this.props.Data.EditingRestrictionAction,
            HasExpression: this.props.Data.HasExpression
        }
    }

    public componentDidMount() {
        // would rather not but only way I can see to force page to show Finish (which is default)
        this.props.UpdateGoBackState(this.state.HasExpression == false);
    }

    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{this.getTextForLeafOperator(operator)}</option>
        })

        return <div>
            <Panel header="Edit Restriction Settings" bsStyle="primary">

                <Panel header="Action To Take When Restriction Is Applied" bsStyle="info" >
                    <Form inline >
                        <Col xs={3}>
                            <Radio inline value={EditingRestrictionAction.Prevent.toString()} checked={this.state.EditingRestrictionAction == EditingRestrictionAction.Prevent} onChange={(e) => this.onEditingRestrictionActionChanged(e)}>Prevent Edit</Radio>
                        </Col>
                        <Col xs={9}>
                            <Radio inline value={EditingRestrictionAction.Warning.toString()} checked={this.state.EditingRestrictionAction == EditingRestrictionAction.Warning} onChange={(e) => this.onEditingRestrictionActionChanged(e)}>Show Warning (with option to allow / disallow edit)</Radio>
                        </Col>
                    </Form>
                </Panel>

                <Panel header="Column" bsStyle="info" >
                    <FormGroup controlId="formColumn">
                        <Col xs={9}>
                            <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChanged(x)} >
                                <option value="select" key="select">Select a column</option>
                                {optionColumns}
                            </FormControl>
                        </Col>
                    </FormGroup>
                </Panel>

                <Panel header="Restriction Rule" bsStyle="info">
                    <FormGroup>
                       <Col xs={12}> <HelpBlock>{this.getActionText()} when the following change happens to a cell value:</HelpBlock>
                       </Col>
                        <Col xs={6}>
                            <FormControl componentClass="select" placeholder="select" value={this.state.Operator.toString()} onChange={(x) => this.onOperatorChanged(x)} >
                                {operatorTypes}
                            </FormControl>
                        </Col>

                        { /* if  numeric then show a numeric control */}
                        {this.isNotAnyOperator() && this.isNotNegativeOperator() && this.getColumnTypeFromState() == ColumnType.Number &&
                            <Col xs={5}>
                                <FormControl value={this.state.Operand1} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                             {this.isBetweenOperator() &&
                                        <FormControl value={this.state.Operand2} type="number" placeholder="Enter Number" onChange={(x) => this.onOperand2ValueChanged(x)} />
                             }
                            </Col>
                        }

                          { /* if  date then show a date control */}
                        {this.isNotAnyOperator() && this.getColumnTypeFromState() == ColumnType.Date &&
                            <Col xs={5}>
                                <FormControl type="date" placeholder="Enter Date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                                {this.isBetweenOperator() &&
                                    <FormControl value={this.state.Operand2} type="date" placeholder="Enter Date" onChange={(x) => this.onOperand2ValueChanged(x)} />
                                }
                            </Col>
                        }


                        { /* if string then show a text control  */}
                        {this.isNotAnyOperator() && (this.getColumnTypeFromState() == ColumnType.String) &&
                            <Col xs={5}>
                                <FormControl value={this.state.Operand1} type="string" placeholder="Enter a Value" onChange={(x) => this.onOperand1ValueChanged(x)} />
                            </Col>
                        }
                    </FormGroup>
                </Panel>

                <Panel header="Expression" bsStyle="info">
                    <Form inline >
                        <Col xs={12}>
                            <Checkbox inline onChange={(e) => this.onOtherExpressionOptionChanged(e)} checked={this.state.HasExpression}>Edit Restriction is additionally dependent on other cell values (you create Expression in next step)</Checkbox>
                        </Col>
                    </Form>

                </Panel>
            </Panel>
        </div>

    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value, Operand1: "", Operand2: "", Operator: LeafExpressionOperator.All } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOperatorChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operator: Number.parseInt(e.value) } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOperand1ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand1: e.value } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOperand2ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand2: e.value } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onEditingRestrictionActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ EditingRestrictionAction: Number.parseInt(e.value) } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState(this.state.HasExpression == false))
    }

    private onOtherExpressionOptionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ HasExpression: e.checked } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState(e.checked == false))
    }

    private getColumnTypeFromState(): ColumnType {
        return this.stateHasColumn() ? this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType : ColumnType.Object;
    }

    private isBetweenOperator(): boolean {
        return this.state.Operator == LeafExpressionOperator.Between || this.state.Operator == LeafExpressionOperator.NotBetween;
    }
    private isNotAnyOperator(): boolean {
        return this.state.Operator != LeafExpressionOperator.All;
    }

    private isNotNegativeOperator(): boolean {
        return this.state.Operator != LeafExpressionOperator.IsNegative;
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        switch (this.getColumnTypeFromState()) {
            case ColumnType.Object:
                return [LeafExpressionOperator.All];
            case ColumnType.Boolean:
                return [LeafExpressionOperator.All, LeafExpressionOperator.IsTrue, LeafExpressionOperator.IsFalse];
            case ColumnType.String:
                return [LeafExpressionOperator.All, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
            case ColumnType.Date:
                return [LeafExpressionOperator.All, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween];
            case ColumnType.Number:
                return [LeafExpressionOperator.All, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.LessThan, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between, LeafExpressionOperator.NotBetween, LeafExpressionOperator.IsNegative, LeafExpressionOperator.ValueChange, LeafExpressionOperator.PercentChange];
        }
    }

    private getTextForLeafOperator(leafExpressionOperator: LeafExpressionOperator): string {
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.All:
                return "Any Change "
            case LeafExpressionOperator.Equals:
                return "Equals "
            case LeafExpressionOperator.NotEquals:
                return "Not Equals "
            case LeafExpressionOperator.GreaterThan:
                if (this.getColumnTypeFromState() == ColumnType.Date) {
                    return "Is After "
                } else {
                    return "Greater Than "
                }
            case LeafExpressionOperator.LessThan:
                if (this.getColumnTypeFromState() == ColumnType.Date) {
                    return "Is Before "
                } else {
                    return "Less Than "
                }
            case LeafExpressionOperator.Between:
                return "Is Between "
            case LeafExpressionOperator.NotBetween:
                return "Is Not Between "
            case LeafExpressionOperator.IsNegative:
                return "Is Negative ";
            case LeafExpressionOperator.ValueChange:
                return "Change In Value Is At Least "
            case LeafExpressionOperator.PercentChange:
                return "% Change Is At Least "
            case LeafExpressionOperator.IsTrue:
                return "Is True "
            case LeafExpressionOperator.IsFalse:
                return "Is False "
        }
    }

    createEditingRestrictionDescription(editingRestriction: IEditingRestriction): string {

        let valueDescription: string = this.getTextForLeafOperator(editingRestriction.RangeExpression.Operator);

        if (!this.operatorRequiresValue(editingRestriction.RangeExpression.Operator)) {
            return valueDescription;
        }
        let columnType: ColumnType = this.props.Columns.find(c => c.ColumnId == editingRestriction.ColumnId).ColumnType;
        let operand1Text: string = (columnType == ColumnType.Boolean || columnType == ColumnType.Number) ?
            editingRestriction.RangeExpression.Operand1 :
            "'" + editingRestriction.RangeExpression.Operand1 + "'"

        valueDescription = valueDescription + operand1Text;

        if (editingRestriction.RangeExpression.Operator == LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }

        if (StringExtensions.IsNotNullOrEmpty(editingRestriction.RangeExpression.Operand2)) {
            let operand2Text: string = (columnType == ColumnType.Number) ?
                " and " + editingRestriction.RangeExpression.Operand2 :
                " and '" + editingRestriction.RangeExpression.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    }

    private stateHasColumn(): boolean {
        return this.state.ColumnId != 'select'
    }

    private operatorRequiresValue(operator: LeafExpressionOperator): boolean {
        return operator != LeafExpressionOperator.All && operator != LeafExpressionOperator.IsNegative && operator != LeafExpressionOperator.IsTrue && operator != LeafExpressionOperator.IsFalse;
    }
    
    private getActionText(): string {
        return this.state.EditingRestrictionAction == EditingRestrictionAction.Prevent? "Prevent cell edit": "Show a warning "
    }

    public canNext(): boolean {
        if (!this.stateHasColumn()) { return false };
        if (!this.operatorRequiresValue(this.state.Operator)) {
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
        this.props.Data.EditingRestrictionAction = this.state.EditingRestrictionAction;
        this.props.Data.HasExpression = this.state.HasExpression;
        this.props.Data.Description = this.createEditingRestrictionDescription(this.props.Data);
    }

    public Back(): void { }
    public StepName = "Create Edit Restriction"
}

