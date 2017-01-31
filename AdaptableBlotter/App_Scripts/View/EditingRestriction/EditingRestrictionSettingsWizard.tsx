/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/IEditingRestrictionStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { ColumnType, EditingRestrictionAction, LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';

interface EditingRestrictionSettingsWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface EditingRestrictionSettingsWizardState {
    ColumnId: string
    EditingRestrictionAction: EditingRestrictionAction;
}

export class EditingRestrictionSettingsWizard extends React.Component<EditingRestrictionSettingsWizardProps, EditingRestrictionSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: EditingRestrictionSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            EditingRestrictionAction: this.props.Data.EditingRestrictionAction,
        }
    }

    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.FriendlyName}</option>
        })

        return <div>
            <Panel header="Cell Validation Settings" bsStyle="primary">

                <Panel header="Action To Take When Validation Fails" bsStyle="info" >
                    <Form inline >
                        <Col xs={12}>
                            <Radio inline value={EditingRestrictionAction.Prevent.toString()} checked={this.state.EditingRestrictionAction == EditingRestrictionAction.Prevent} onChange={(e) => this.onEditingRestrictionActionChanged(e)}>Prevent the cell edit in all circumstances</Radio>
                        </Col>
                        <Col xs={12}>
                            <Radio inline value={EditingRestrictionAction.Warning.toString()} checked={this.state.EditingRestrictionAction == EditingRestrictionAction.Warning} onChange={(e) => this.onEditingRestrictionActionChanged(e)}>Display a warning - with options to allow or disallow the edit</Radio>
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

            </Panel>
        </div>
    }

    private onColumnSelectChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onEditingRestrictionActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ EditingRestrictionAction: Number.parseInt(e.value) } as EditingRestrictionSettingsWizardState, () => this.props.UpdateGoBackState())
    }
    
    public canNext(): boolean {
        return (this.state.ColumnId != 'select');
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.EditingRestrictionAction = this.state.EditingRestrictionAction;
    }

    public Back(): void { }
    public StepName = "Cell Validation Settings"
}

