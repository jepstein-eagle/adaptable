import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IAdvancedSearch } from '../../../Strategy/Interface/IAdvancedSearchStrategy';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'

export interface AdvancedSearchSettingsWizardProps extends AdaptableWizardStepProps<IAdvancedSearch> {
    AdvancedSearches: IAdvancedSearch[]
}

export interface AdvancedSearchSettingsWizardState {
    AdvancedSearchName: string,
    ErrorMessage: string
}

export class AdvancedSearchSettingsWizard extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSettingsWizardProps) {
        super(props)
        this.state = {
            AdvancedSearchName: props.Data.Name,
            ErrorMessage: null
        }
    }
    render(): any {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return <Panel header="Advanced Search Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="searchName">
                    <Col xs={3} componentClass={ControlLabel}>Search Name: </Col>
                    <Col xs={9}>
                        <FormGroup controlId="formInlineName" validationState={validationState}>
                            <FormControl style={{ width: "Auto" }}  value={this.state.AdvancedSearchName} type="string" placeholder="Enter search name"
                                onChange={(e) => this.onAdvancedSearchNameChange(e)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                        </FormGroup>
                    </Col>
                </FormGroup>

            </AdaptableBlotterForm>
        </Panel>

    }


    onAdvancedSearchNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            AdvancedSearchName: e.value,
            ErrorMessage: this.props.AdvancedSearches.findIndex(x => x.Name == e.value) > -1 ? "A Search already exists with that name" : null
        } as AdvancedSearchSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.AdvancedSearchName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Name = this.state.AdvancedSearchName
    }
    public Back(): void {
        // todo
     }
     public StepName = this.props.StepName
}