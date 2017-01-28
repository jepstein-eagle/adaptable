/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { NotificationType, ColumnType, CellChangeType, CellValidationAction, LeafExpressionOperator } from '../../Core/Enums';
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
    CellValidationAction: CellValidationAction
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
            CellValidationAction: this.props.Data.CellValidationAction
        }
    }

    render(): any {
        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        let operatorTypes = this.getAvailableOperators().map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{this.getTextForCellChangeValue(operator)}</option>
        })

        return <Panel header="Validation Settings" bsStyle="primary">

            <Form horizontal>

                <FormGroup controlId="formAction">
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={3}>Action: </Col>
                        <Col xs={9}>
                            <Radio value={CellValidationAction.Prevent.toString()} checked={this.state.CellValidationAction == CellValidationAction.Prevent} onChange={(e) => this.onCellValidationActionChanged(e)}>Prevent Edit</Radio>
                            <Radio value={CellValidationAction.Warning.toString()} checked={this.state.CellValidationAction == CellValidationAction.Warning} onChange={(e) => this.onCellValidationActionChanged(e)}>Show warning</Radio>
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
                <FormGroup>
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={3}>Condition: </Col>
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
                            <Col componentClass={ControlLabel} xs={3}>Value: </Col>
                            <Col xs={9}>
                                <FormControl style={{ width: "Auto" }} value={this.state.Operand1} type="number" placeholder="Enter a Number" onChange={(x) => this.onOperand1ValueChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>
                }

                { /* if  date then show a date control */}
                {this.state.Operator != LeafExpressionOperator.Any && this.state.ColumnType == ColumnType.Date &&
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Value: </Col>
                            <Col xs={9}>
                                <FormControl style={{ width: "Auto" }} type="date" placeholder="Enter a date" value={this.state.Operand1} onChange={(x) => this.onOperand1ValueChanged(x)} />
                            </Col>
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
            </Form>

        </Panel>

    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let columnType: ColumnType = this.props.Columns.find(c => c.ColumnId == e.value).ColumnType;
        this.setState({ ColumnId: e.value, ColumnType: columnType, Operand1: "", Operand2: "", Operator: LeafExpressionOperator.Any } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onOperatorChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operator: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onOperand1ValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ Operand1: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onCellValidationActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellValidationAction: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private getAvailableOperators(): LeafExpressionOperator[] {
        if (!this.stateHasColumn()) {
            return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
        }
        let columnType: ColumnType = this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType;

        switch (columnType) {
            case ColumnType.String:
            case ColumnType.Boolean:
                return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals];
            case ColumnType.Date:
                return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.LessThan, LeafExpressionOperator.Between];
            case ColumnType.Number:
                return [LeafExpressionOperator.Any, LeafExpressionOperator.Equals, LeafExpressionOperator.NotEquals, LeafExpressionOperator.LessThan, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between, LeafExpressionOperator.ValueChange, LeafExpressionOperator.PercentChange];
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
            case LeafExpressionOperator.ValueChange:
                return "Value Change is At Least"
            case LeafExpressionOperator.PercentChange:
                return "% Change is At Least"
        }
    }

    createCellValidationRuleDescription(cellValidationRule: ICellValidationRule): string {

        let cellValidationColumn: IColumn = this.props.Columns.find(c => c.ColumnId == cellValidationRule.ColumnId);

        let scope: string = cellValidationColumn.FriendlyName;

        let valueDescription: string = "";

        if (cellValidationRule.RangeExpression.Operator != LeafExpressionOperator.Any) {
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
            }
            let changeValueText: string = (cellValidationColumn.ColumnType == ColumnType.Boolean || cellValidationColumn.ColumnType == ColumnType.Number) ?
                cellValidationRule.RangeExpression.Operand1 :
                "'" + cellValidationRule.RangeExpression.Operand1 + "'"

            valueDescription = valueDescription + changeValueText;

            if (cellValidationRule.RangeExpression.Operator == LeafExpressionOperator.PercentChange) {
                valueDescription = valueDescription + '%';
            }
        } else {
            valueDescription = " any change in value"
        }
        return "'" + scope + "' column: " + valueDescription;
    }

    private stateHasColumn(): boolean {
        return this.state.ColumnId != 'select'
    }

    public canNext(): boolean {
        if (!this.stateHasColumn()) { return false };
        if (this.state.Operator != LeafExpressionOperator.Any) {
            return StringExtensions.IsNotNullOrEmpty(this.state.Operand1);
        }
        //   if (this.state.Operator == LeafExpressionOperator.NotBetween) {
        //      return StringExtensions.IsNotNullOrEmpty( this.state.Operand2);
        //  }
        return true;
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
        this.props.Data.Description = this.createCellValidationRuleDescription(this.props.Data);
    }
    public Back(): void { }
    public StepName = "Validation Settings"
}


let smallMarginStyle = {
    margin: '10px'
}