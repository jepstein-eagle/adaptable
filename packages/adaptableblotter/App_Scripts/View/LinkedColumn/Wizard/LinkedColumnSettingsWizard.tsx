import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";
import { PRIMARY_BSSTYLE } from "../../../Core/Constants/StyleConstants";
import { ILinkedColumn } from "../../../Core/Interface/Interfaces";

export interface LinkedColumnSettingsWizardProps extends AdaptableWizardStepProps<ILinkedColumn> {
    LinkedColumns: ILinkedColumn[]
}

export interface LinkedColumnSettingsWizardState {
    LinkedColumnId: string,
    ErrorMessage: string
}

export class LinkedColumnSettingsWizard extends React.Component<LinkedColumnSettingsWizardProps, LinkedColumnSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: LinkedColumnSettingsWizardProps) {
        super(props)
        this.state = {
            LinkedColumnId: props.Data.LinkedColumnId,
            ErrorMessage: null
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"
        
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return <div className={cssClassName}>
            <Panel header="Linked Column Settings" bsStyle={PRIMARY_BSSTYLE}>
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="linkedColumnName">
                        <Col xs={4} componentClass={ControlLabel}>Linked Column Name: </Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineName" validationState={validationState}>
                                <FormControl value={this.state.LinkedColumnId} type="string" placeholder="Enter Linked Column name"
                                    onChange={(e) => this.onLinkedColumnNameChange(e)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <Col xs={1}>{' '} </Col>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    onLinkedColumnNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            LinkedColumnId: e.value,
            ErrorMessage: ArrayExtensions.ContainsItem( this.props.LinkedColumns.map(s=>s.LinkedColumnId),  e.value) ? "A Linked Column already exists with that name" : null
        } as LinkedColumnSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.LinkedColumnId) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.LinkedColumnId = this.state.LinkedColumnId
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}

