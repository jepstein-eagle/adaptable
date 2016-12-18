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

        return <Panel header="Alert Settings" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="formColumn">
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={3}>Select Column: </Col>
                        <Col xs={9}>
                            <FormControl componentClass="select" placeholder="select" value={selectedColumn} onChange={(x) => this.onColumnSelectChange(x) } >
                                <option value="select" key="select">Select a column</option>
                                {optionColumns}
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row style={smallMarginStyle}>
                        <Col componentClass={ControlLabel} xs={3}>Condition: </Col>
                        <Col xs={5}>
                            <Radio value="Any" checked={this.state.CellChangeType == CellChangeType.Any} onChange={(e) => this.onNotificationTypeChange(e) }>
                                Any Change in Value
                            </Radio>
                        </Col>
                        <Col xs={4}>
                        </Col>
                    </Row>

                    { /* if not numeric then show a string control for now */ }
                    {!isNumericColumn &&
                        <div>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="Equals" checked={this.state.CellChangeType == CellChangeType.Equals} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        New Value Equals
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="string" placeholder="Enter a Value"  />
                                </Col>
                            </Row>

                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="NotEquals" checked={this.state.CellChangeType == CellChangeType.NotEquals} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        New Value Not Equal To
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="string" placeholder="Enter a Value"  />
                                </Col>
                            </Row>
                        </div>
                    }

                    { /* if numeric then show all the numeric controls */ }
                    {isNumericColumn &&
                        <div>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="Equals" checked={this.state.CellChangeType == CellChangeType.Equals} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        New Value Equals
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="number" placeholder="Enter a Number"  />
                                </Col>
                            </Row>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="NotEquals" checked={this.state.CellChangeType == CellChangeType.NotEquals} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        New Value Not Equal To
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="number" placeholder="Enter a Number"  />
                                </Col>
                            </Row>
                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="GreaterThan" checked={this.state.CellChangeType == CellChangeType.GreaterThan} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        New Value Greater Than
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="number" placeholder="Enter a Number"  />
                                </Col>
                            </Row>

                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="LessThan" checked={this.state.CellChangeType == CellChangeType.LessThan} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        New Value Less Than
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="number" placeholder="Enter a Number"  />
                                </Col>
                            </Row>

                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="ValueChange" checked={this.state.CellChangeType == CellChangeType.ValueChange} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        Value Change is At Least
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="number" placeholder="Enter a Number"  />
                                </Col>
                            </Row>

                            <Row style={smallMarginStyle}>
                                <Col componentClass={ControlLabel} xs={3}></Col>
                                <Col xs={5}>
                                    <Radio value="PercentChange" checked={this.state.CellChangeType == CellChangeType.PercentChange} onChange={(e) => this.onNotificationTypeChange(e) }>
                                        % Change is At Least
                                    </Radio>
                                </Col>
                                <Col xs={4}>
                                    <FormControl style={{ width: "Auto" }}  type="number" placeholder="Enter a Number"  />
                                </Col>
                            </Row>
                        </div>
                    }
                </FormGroup>

            </Form>
        </Panel>
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value, CellChangeType: CellChangeType.Any } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onNotificationTypeChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        switch (e.value) {
            case "Any":
                this.setState({ CellChangeType: CellChangeType.Any } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
            case "Equals":
                this.setState({ CellChangeType: CellChangeType.Equals } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
            case "NotEquals":
                this.setState({ CellChangeType: CellChangeType.NotEquals } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
            case "GreaterThan":
                this.setState({ CellChangeType: CellChangeType.GreaterThan } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
            case "LessThan":
                this.setState({ CellChangeType: CellChangeType.LessThan } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
            case "ValueChange":
                this.setState({ CellChangeType: CellChangeType.ValueChange } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
            case "PercentChange":
                this.setState({ CellChangeType: CellChangeType.PercentChange } as AlertSettingsWizardState, () => this.props.UpdateGoBackState())
                break;
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