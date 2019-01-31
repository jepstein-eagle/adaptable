import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IFreeTextColumn } from "../../../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";


export interface FreeTextColumnSettingsWizardProps extends AdaptableWizardStepProps<IFreeTextColumn> {
   
}
export interface FreeTextColumnSettingsWizardState {
    ColumnId: string,
    ErrorMessage: string,
    DefaultValue: string,
}

export class FreeTextColumnSettingsWizard extends React.Component<FreeTextColumnSettingsWizardProps, FreeTextColumnSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: FreeTextColumnSettingsWizardProps) {
        super(props);
        this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null, DefaultValue: this.props.Data.DefaultValue }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        return <div className={cssClassName}>
            <Panel header="FreeText Column Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="formInlineName">
                        <Col xs={3}>
                            <ControlLabel >Column Name</ControlLabel>
                        </Col>
                        <Col xs={8}>
                            <FormGroup controlId="formInlineName" validationState={validationState}>
                                <FormControl value={this.state.ColumnId} type="text" placeholder="Enter a name" onChange={(e) => this.handleColumnNameChange(e)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                            </FormGroup>
                        </Col>
                        <Col xs={1}>{' '} </Col>
                    </FormGroup>
           
                    <FormGroup controlId="formInlineDefaultValue">
                        <Col xs={3}>
                            <ControlLabel >Default Value</ControlLabel>
                        </Col>
                        <Col xs={8}>
                        <FormGroup controlId="formInlineName" validationState={null}>
                        <FormControl value={this.state.DefaultValue} type="text" placeholder="Default Column Value (not required)" onChange={(e) => this.handleDefaultValueChange(e)} />
                          <FormControl.Feedback />
                                <HelpBlock>{""}</HelpBlock>
                            </FormGroup>
                            
                        </Col>
                        <Col xs={1}>{' '} </Col>
                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    handleColumnNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            ColumnId: e.value,
            ErrorMessage: ArrayExtensions.ContainsItem(this.props.Columns, e.value) ? "A Column already exists with that name" : null
        }, () => this.props.UpdateGoBackState())

    }

    handleDefaultValueChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            DefaultValue: e.value,
        }, () => this.props.UpdateGoBackState())

    }

    public canNext(): boolean { return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage); }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId
        this.props.Data.DefaultValue = this.state.DefaultValue
    }
    public Back(): void {
        //
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}
