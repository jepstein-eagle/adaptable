/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';

import { IColumn, IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './DualListBoxEditor'
import { IPlusMinusCondition } from '../Core/interface/IPlusMinusStrategy';
import { ColumnType } from '../Core/Enums';


interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<IPlusMinusCondition> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface PlusMinusSettingsWizardState {
    ColumnId: string,
    DefaultNudge: number
}

export class PlusMinusSettingsWizard extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            DefaultNudge: this.props.Data.DefaultNudge
        }
    }
    render(): any {
        let optionColumns = this.props.Columns.filter(x=>x.ColumnType == ColumnType.Number).map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })
        return <Panel header="Plus/Minus Settings" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="formColumn">
                    <Col componentClass={ControlLabel} xs={2}>Select Column: </Col>
                    <Col xs={10}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="nudgeColumn">
                    <Col xs={2} componentClass={ControlLabel}>Default Nudge: </Col>
                    <Col xs={10}>
                        <FormControl value={this.state.DefaultNudge.toString()} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onColumnDefaultNudgeValueChange(e)} />
                    </Col>
                </FormGroup>
            </Form>
        </Panel>
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState())
    }
    onColumnDefaultNudgeValueChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ DefaultNudge: parseFloat(e.value) } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return Number.isFinite(this.state.DefaultNudge) && this.state.ColumnId != "select"; }
    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.DefaultNudge = this.state.DefaultNudge
    }
    public Back(): void { }
    public StepName = "Plus/Minus Settings"
}