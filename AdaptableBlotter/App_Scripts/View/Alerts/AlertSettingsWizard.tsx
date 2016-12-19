/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IAlert, ICellChangeRule } from '../../Core/interface/IAlertStrategy';
import { NotificationType, ColumnType, CellChangeType } from '../../Core/Enums';


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
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })

        let selectedColumn: string = (this.state.ColumnId != "") ? this.state.ColumnId : "select";


        let isNumericColumn: boolean = (this.stateHasColumn() && this.props.Columns.find(c => c.ColumnId == this.state.ColumnId).ColumnType == ColumnType.Number);


        let availableCellChangeTypes: CellChangeType[] = (isNumericColumn) ?
            [CellChangeType.Any, CellChangeType.Equals, CellChangeType.NotEquals, CellChangeType.GreaterThan, CellChangeType.LessThan, CellChangeType.ValueChange, CellChangeType.PercentChange] :
            [CellChangeType.Any, CellChangeType.Equals, CellChangeType.NotEquals];

        let optionCellChangeTypes = availableCellChangeTypes.map(c => {
            return <option value={c} key={c}>{this.getTextForCellChangeValue(c) }</option>

        });

        return <Panel header="Alert Settings" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="formColumn">
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={5}>Select Column: </Col>
                        <Col xs={7}>
                            <FormControl componentClass="select" placeholder="select" value={selectedColumn} onChange={(x) => this.onColumnSelectChanged(x) } >
                                <option value="select" key="select">Select a column</option>
                                {optionColumns}
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={5}>Select Change Condition: </Col>
                        <Col xs={7}>
                            <FormControl componentClass="select" placeholder="select" value={this.state.CellChangeType} onChange={(x) => this.onCellChangeTypeChanged(x) } >
                                {optionCellChangeTypes}
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>

                { /* if  numeric then show a numeric control */ }
                {this.state.CellChangeType != CellChangeType.Any && isNumericColumn &&
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={5}>Value: </Col>
                            <Col xs={7}>
                                <FormControl style={{ width: "Auto" }} value={this.state.ChangeValue} type="number" placeholder="Enter a Number" onChange={(x) => this.onNumericChangeValueChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>
                }

                { /* if not numeric then show a string control for now */ }
                {this.state.CellChangeType != CellChangeType.Any && !isNumericColumn &&
                    <FormGroup>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={5}>Value: </Col>
                            <Col xs={7}>
                                <FormControl style={{ width: "Auto" }} value={this.state.ChangeValue} type="string" placeholder="Enter a Value" onChange={(x) => this.onStringChangeValueChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>
                }

            </Form>
        </Panel>
    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value, CellChangeType: CellChangeType.Any } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onCellChangeTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ CellChangeType: Number.parseInt(e.value) } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

private onNumericChangeValueChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChangeValue: Number.parseFloat(e.value) } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onStringChangeValueChanged(event: React.FormEvent) {        let e = event.target as HTMLInputElement;
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

    public canBack(): boolean { return false; }
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