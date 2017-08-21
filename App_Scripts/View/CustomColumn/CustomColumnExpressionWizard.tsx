import * as React from "react";
import { ListGroup, ListGroupItem, Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions';
import { ColumnSelector } from '../ColumnSelector';
import { ICustomColumn } from "../../Core/Interface/ICustomColumnStrategy";
import { AdaptableBlotterForm } from "../AdaptableBlotterForm";

export interface CustomColumnExpressionWizardProps extends AdaptableWizardStepProps<ICustomColumn> {
    IsExpressionValid: (expression: string) => void
    GetErrorMessage: () => string
}
export interface CustomColumnExpressionWizardState {
    GetValueFunc: string
}

export class CustomColumnExpressionWizard extends React.Component<CustomColumnExpressionWizardProps, CustomColumnExpressionWizardState> implements AdaptableWizardStep {
    constructor(props: CustomColumnExpressionWizardProps) {
        super(props);
        this.state = { GetValueFunc: this.props.Data.GetValueFunc }
    }
    render(): any {
        let validationState = StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage()) ? null : "error"
        return <Panel header="Custom Column Expression" bsStyle="primary">
            <AdaptableBlotterForm>
                <FormGroup controlId="formInlineName">
                    <ControlLabel >Column Name</ControlLabel>
                    <FormControl value={this.state.GetValueFunc} componentClass="textarea" placeholder="Enter expression" onChange={(e) => this.handleExpressionChange(e)} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.props.GetErrorMessage()}</HelpBlock>
                </FormGroup>
            </AdaptableBlotterForm>
        </Panel>
    }

    handleExpressionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.IsExpressionValid(e.value)
        this.setState({ GetValueFunc: e.value }, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotNullOrEmpty(this.state.GetValueFunc)
            && StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage());
    }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.GetValueFunc = this.state.GetValueFunc }
    public Back(): void { }
    public StepName = "Custom Column Expression"
}