/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { ColumnType } from '../../Core/Enums';


interface AdvancedSearchSettingsWizardProps extends AdaptableWizardStepProps<IAdvancedSearch> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface AdvancedSearchSettingsWizardState {
    AdvancedSearchName: string
}

export class AdvancedSearchSettingsWizard extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSettingsWizardProps) {
        super(props)
        this.state = {
            AdvancedSearchName: this.props.Data.AdvancedSearchName,
        }
    }
    render(): any {

        return <Panel header="Advanced Search Settings" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="nudgeColumn">
                    <Col xs={3} componentClass={ControlLabel}>Search Name: </Col>
                    <Col xs={9}>
                        <FormControl value={this.state.AdvancedSearchName} type="string" placeholder="Enter Search name"
                            onChange={(e: React.FormEvent) => this.onAdvancedSearchNameChange(e)} />
                    </Col>
                </FormGroup>

            </Form>
        </Panel>

    }


    onAdvancedSearchNameChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ AdvancedSearchName: e.value } as AdvancedSearchSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return this.state.AdvancedSearchName != "";
    }
   
    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.AdvancedSearchName = this.state.AdvancedSearchName
    }
    public Back(): void { }
    public StepName = "Advanced Search Settings"
}