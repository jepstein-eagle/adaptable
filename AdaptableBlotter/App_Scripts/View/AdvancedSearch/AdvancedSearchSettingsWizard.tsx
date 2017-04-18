import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { StringExtensions } from '../../Core/Extensions';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface AdvancedSearchSettingsWizardProps extends AdaptableWizardStepProps<IAdvancedSearch> {
}

interface AdvancedSearchSettingsWizardState {
    AdvancedSearchName: string
}

export class AdvancedSearchSettingsWizard extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSettingsWizardProps) {
        super(props)
        this.state = {
            AdvancedSearchName: props.Data.Name,
        }
    }
    render(): any {

        return <Panel header="Advanced Search Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="searchName">
                    <Col xs={3} componentClass={ControlLabel}>Search Name: </Col>
                    <Col xs={9}>
                        <FormControl value={this.state.AdvancedSearchName} type="string" placeholder="Enter search name"
                            onChange={(e) => this.onAdvancedSearchNameChange(e)} />
                    </Col>
                </FormGroup>

            </AdaptableBlotterForm>
        </Panel>

    }


    onAdvancedSearchNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ AdvancedSearchName: e.value } as AdvancedSearchSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.AdvancedSearchName);
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Name = this.state.AdvancedSearchName
    }
    public Back(): void { }
    public StepName = "Advanced Search Settings"
}