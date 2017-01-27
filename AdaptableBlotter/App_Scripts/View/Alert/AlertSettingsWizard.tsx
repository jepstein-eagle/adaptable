/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IAlert } from '../../Core/interface/IAlertStrategy';
import { ICellChangeRule } from '../../Core/Interface/ICellValidationStrategy';
import { NotificationType, ColumnType, CellChangeType } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface AlertSettingsWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface AlertSettingsWizardState {
    ColumnId: string
    CellChangeType: CellChangeType
    ChangeValue: any
}

export class AlertSettingsWizard extends React.Component<AlertSettingsWizardProps, AlertSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AlertSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.CellChangeRule.ColumnId,
            CellChangeType: this.props.Data.CellChangeRule.CellChangeType,
            ChangeValue: this.props.Data.CellChangeRule.ChangeValue
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

        return <Panel header="Alert Settings" bsStyle="primary">

            {!this.stateRequiesCellChangeRule() &&
                <Form horizontal>
                    <Well bsSize="small">There are no additional settings for this Alert type.</Well>
                </Form>
            }

            {this.stateRequiesCellChangeRule() &&
                <Form horizontal>
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
            }
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
            this.setState({ ColumnId: e.value, ChangeValue: null, CellChangeType: CellChangeType.Any } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ColumnId: e.value } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onCellChangeTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellChangeType: Number.parseInt(e.value) } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onNumericChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChangeValue: Number.parseFloat(e.value) } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onDateChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let myDate: Date = new Date(e.value);
        this.setState({ ChangeValue: myDate} as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onStringChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChangeValue: e.value } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
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

    private stateHasColumn(): boolean {
        return this.state.ColumnId != null && this.state.ColumnId != 'select'
    }

    private stateRequiesCellChangeRule(): boolean {
        return this.props.Data.NotificationType == NotificationType.CellEdited || this.props.Data.NotificationType == NotificationType.CellUpdated
    }


    public canNext(): boolean {
        if (this.stateRequiesCellChangeRule()) {
            if (this.state.CellChangeType == null || !this.stateHasColumn()) { return false };
            if (this.state.CellChangeType != CellChangeType.Any) { return this.state.ChangeValue != null; }
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
    }
    public Back(): void { }
    public StepName = "Alert Settings"
}


let smallMarginStyle = {
    margin: '10px'
}