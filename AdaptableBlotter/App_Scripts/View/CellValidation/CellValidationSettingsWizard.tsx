/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { ICellChangeRule } from '../../Core/Interface/ICellValidationStrategy';
import { NotificationType, ColumnType, CellChangeType, CellValidationAction } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface CellValidationSettingsWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface CellValidationSettingsWizardState {
    ColumnId: string
    CellChangeType: CellChangeType
    ChangeValue: any
    CellValidationAction: CellValidationAction
}

export class CellValidationSettingsWizard extends React.Component<CellValidationSettingsWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.CellChangeRule.ColumnId,
            CellChangeType: this.props.Data.CellChangeRule.CellChangeType,
            ChangeValue: this.props.Data.CellChangeRule.ChangeValue,
            CellValidationAction: this.props.Data.CellValidationAction
        }
    }

    render(): any {
        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        let selectedColumn: string = (this.state.ColumnId != "") ? this.state.ColumnId : "select";


        let isNumericColumn: boolean = (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Number);

        let isDateColumn: boolean = (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Date);

        let optionPopupTypes = EnumExtensions.getNamesAndValues(CellChangeType).filter(c => this.shouldShowCellChangeTypeValue(isNumericColumn, c.value)).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{this.getTextForCellChangeValue(enumNameAndValue.value)}</option>
        })

        let currentCellChangeValue = this.state.CellChangeType.toString();

        return <Panel header="Validation Settings" bsStyle="primary">

            <Form horizontal>

                <FormGroup controlId="formAction">
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={3}>Action: </Col>
                        <Col xs={9}>
                            <Radio value={CellValidationAction.Prevent.toString()} checked={this.state.CellValidationAction == CellValidationAction.Prevent} onChange={(e) => this.onCellValidationActionChanged(e)}>Prevent Edit in all circumstances</Radio>
                            <Radio value={CellValidationAction.Warning.toString()} checked={this.state.CellValidationAction == CellValidationAction.Warning} onChange={(e) => this.onCellValidationActionChanged(e)}>Allow Edit after warning</Radio>
                        </Col>
                    </Row>
                </FormGroup>

                <FormGroup controlId="formColumn">
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={3}>Column: </Col>
                        <Col xs={9}>
                            <FormControl componentClass="select" placeholder="select" value={selectedColumn} onChange={(x) => this.onColumnSelectChanged(x)} >
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
                            <FormControl componentClass="select" placeholder="select" value={currentCellChangeValue} onChange={(x) => this.onCellChangeTypeChanged(x)} >
                                {optionPopupTypes}
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>

                { /* if  numeric then show a numeric control */}
                {this.state.CellChangeType != CellChangeType.Any && isNumericColumn &&
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Value: </Col>
                            <Col xs={9}>
                                <FormControl style={{ width: "Auto" }} value={this.state.ChangeValue} type="number" placeholder="Enter a Number" onChange={(x) => this.onNumericChangeValueChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>
                }

                { /* if  date then show a date control */}
                {this.state.CellChangeType != CellChangeType.Any && isDateColumn &&
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Value: </Col>
                            <Col xs={9}>
                                <FormControl style={{ width: "Auto" }} type="date" placeholder="Enter a date" value={this.state.ChangeValue} onChange={(x) => this.onDateChangeValueChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>
                }

                { /* if not numeric or date then show a string control for now */}
                {this.state.CellChangeType != CellChangeType.Any && !isNumericColumn && !isDateColumn &&
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={3}>Value: </Col>
                            <Col xs={9}>
                                <FormControl style={{ width: "Auto" }} value={this.state.ChangeValue} type="string" placeholder="Enter a Value" onChange={(x) => this.onStringChangeValueChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>
                }


            </Form>

        </Panel>

    }

    private shouldShowCellChangeTypeValue(isNumericColumn: boolean, cellChangeType: CellChangeType): boolean {
        if (isNumericColumn) return true;

        return (cellChangeType == CellChangeType.Any || cellChangeType == CellChangeType.Equals || cellChangeType == CellChangeType.NotEquals);
    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        // if we are changing from existing column to new column then update CellChangeType and ChangeValue as well; otherwise just change the column
        if (this.stateHasColumn()) {
            this.setState({ ColumnId: e.value, ChangeValue: null, CellChangeType: CellChangeType.Any } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ColumnId: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onCellChangeTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellChangeType: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onNumericChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChangeValue: Number.parseFloat(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onDateChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let myDate: Date = new Date(e.value);
        this.setState({ ChangeValue: myDate } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onStringChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChangeValue: e.value } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onCellValidationActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellValidationAction: Number.parseInt(e.value) } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private getTextForCellChangeValue(cellChangeType: CellChangeType): string {
        switch (cellChangeType) {
            case CellChangeType.Any:
                return "Any Change In Value"
            case CellChangeType.Equals:
                return "New Value Equals"
            case CellChangeType.NotEquals:
                return "New Value Not Equal To"
            case CellChangeType.GreaterThan:
                return "New Value Greater Than"
            case CellChangeType.LessThan:
                return "New Value Less Than"
            case CellChangeType.ValueChange:
                return "Value Change is At Least"
            case CellChangeType.PercentChange:
                return "% Change is At Least"
        }
    }

    createCellValidationRuleDescription(cellValidationRule: ICellValidationRule): string {

        let cellValidationColumn: IColumn = this.props.Columns.find(c => c.ColumnId == cellValidationRule.CellChangeRule.ColumnId);

        let scope: string = cellValidationColumn.FriendlyName;

        let valueDescription: string = "";

        if (cellValidationRule.CellChangeRule.CellChangeType != CellChangeType.Any) {
            switch (cellValidationRule.CellChangeRule.CellChangeType) {
                case CellChangeType.Equals:
                    valueDescription = " new value = ";
                    break;
                case CellChangeType.NotEquals:
                    valueDescription = " new value <> ";
                    break;
                case CellChangeType.GreaterThan:
                    valueDescription = " new value > ";
                    break;
                case CellChangeType.LessThan:
                    valueDescription = " new value < ";
                    break;
                case CellChangeType.ValueChange:
                    valueDescription = " change in value >= ";
                    break;
                case CellChangeType.PercentChange:
                    valueDescription = " % change is at least ";
                    break;
            }
            let changeValueText: string = (cellValidationColumn.ColumnType == ColumnType.Boolean || cellValidationColumn.ColumnType == ColumnType.Number) ?
                cellValidationRule.CellChangeRule.ChangeValue :
                "'" + cellValidationRule.CellChangeRule.ChangeValue + "'"

            valueDescription = valueDescription + changeValueText;

            if (cellValidationRule.CellChangeRule.CellChangeType == CellChangeType.PercentChange) {
                valueDescription = valueDescription + '%';
            }
        } else {
            valueDescription = " with any change"
        }
        return "'" + scope + "' column " + valueDescription;
    }

    private stateHasColumn(): boolean {
        return this.state.ColumnId != null && this.state.ColumnId != 'select'
    }


    public canNext(): boolean {
        if (this.state.CellChangeType == null || !this.stateHasColumn()) { return false };
        if (this.state.CellChangeType != CellChangeType.Any) {
            return this.state.ChangeValue != null;
        }
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        var cellChangeRule: ICellChangeRule = {
            ColumnId: this.state.ColumnId,
            ChangeValue: this.state.ChangeValue,
            CellChangeType: this.state.CellChangeType
        }
        this.props.Data.CellChangeRule = cellChangeRule;
        this.props.Data.CellValidationAction = this.state.CellValidationAction;
        this.props.Data.Description = this.createCellValidationRuleDescription(this.props.Data);
    }
    public Back(): void { }
    public StepName = "Validation Settings"
}


let smallMarginStyle = {
    margin: '10px'
}