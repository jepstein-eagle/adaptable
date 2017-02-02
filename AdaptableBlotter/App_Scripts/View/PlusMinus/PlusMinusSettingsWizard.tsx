/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, Popover } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IPlusMinusCondition } from '../../Core/interface/IPlusMinusStrategy';
import { ColumnType, SortOrder } from '../../Core/Enums';
import { InformationPopover } from '../InformationPopover';
import { Helper } from '../../Core/Helper'


interface PlusMinusSettingsWizardProps extends AdaptableWizardStepProps<IPlusMinusCondition> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface PlusMinusSettingsWizardState {
    ColumnId: string,
    DefaultNudge: number
    ExpressionOption: string
}

export class PlusMinusSettingsWizard extends React.Component<PlusMinusSettingsWizardProps, PlusMinusSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            DefaultNudge: this.props.Data.DefaultNudge,
            ExpressionOption: this.props.Data.ColumnId == "select" ?
                "" :
                (this.props.Data.Expression == null ? "whole" : "expression")
        }
    }
    render(): any {
        let sortedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Columns.filter(x => x.ColumnType == ColumnType.Number), "FriendlyName")
        let optionColumns = sortedColumns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        return <Panel header="Plus/Minus Settings" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="formColumn">
                    <Col componentClass={ControlLabel} xs={3}>Select Column: </Col>
                    <Col xs={9}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                            <option value="select" key="select">Select a column</option>
                            {optionColumns}
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="nudgeColumn">
                    <Col xs={3} componentClass={ControlLabel}>Default Nudge: </Col>
                    <Col xs={9}>
                        <FormControl value={this.state.DefaultNudge.toString()} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onColumnDefaultNudgeValueChange(e)} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="applyTo">
                    <Col xs={3} componentClass={ControlLabel}>Apply To: </Col>
                    <Col xs={9}>
                        <Radio value="whole" checked={this.state.ExpressionOption == 'whole'} onChange={(e) => this.onExpressionOptionChange(e)}>
                            Whole Column
                        </Radio>
                        <Radio value="expression" checked={this.state.ExpressionOption == 'expression'} onChange={(e) => this.onExpressionOptionChange(e)}>
                            Column Expression {' '}
                            <InformationPopover headerText={""} bodyText={"You can create the Expression in the next step of the wizard"} />
                            </Radio>
                    </Col>
                </FormGroup>
            </Form>
        </Panel>
    }

    private onExpressionOptionChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ExpressionOption: e.value } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(e.value == "whole"))
    }

    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(this.state.ExpressionOption == "whole"))
    }
    onColumnDefaultNudgeValueChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ DefaultNudge: parseFloat(e.value) } as PlusMinusSettingsWizardState, () => this.props.UpdateGoBackState(this.state.ExpressionOption == "whole"))
    }

    public canNext(): boolean {
        return Number.isFinite(this.state.DefaultNudge)
            && this.state.ColumnId != "select"
            && this.state.ExpressionOption != "";
    }
    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.DefaultNudge = this.state.DefaultNudge
    }
    public Back(): void { }
    public StepName = "Plus/Minus Settings"
}