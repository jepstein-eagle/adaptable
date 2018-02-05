import * as React from "react";
import { ListGroup, ListGroupItem, Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '.././../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from '.././../Wizard/AdaptableWizard'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions';
import { ColumnSelector } from '../../ColumnSelector';
import { ICalculatedColumn } from "../../../Strategy/Interface/ICalculatedColumnStrategy";
import { AdaptableBlotterForm } from "../../AdaptableBlotterForm";


export interface CalculatedColumnSettingsWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
    Columns: IColumn[]
}
export interface CalculatedColumnSettingsWizardState {
    ColumnName: string,
    ErrorMessage: string
}

export class CalculatedColumnSettingsWizard extends React.Component<CalculatedColumnSettingsWizardProps, CalculatedColumnSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnSettingsWizardProps) {
        super(props);
        this.state = { ColumnName: this.props.Data.ColumnId, ErrorMessage: null }
    }
    render(): any {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        return <Panel header="Calculated Column Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="formInlineName">
                    <Col xs={4}>
                        <ControlLabel >Column Name</ControlLabel>
                    </Col>
                    <Col xs={8}>
                        <FormGroup controlId="formInlineName" validationState={validationState}>
                            <FormControl style={{ width: "Auto" }} value={this.state.ColumnName} type="text" placeholder="Enter a name" onChange={(e) => this.handleColumnNameChange(e)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </AdaptableBlotterForm>
        </Panel>
    }

    handleColumnNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            ColumnName: e.value,
            ErrorMessage: this.props.Columns.findIndex(x => x.ColumnId == e.value) > -1 ? "A Column already exists with that name" : null
        }, () => this.props.UpdateGoBackState())

    }

    public canNext(): boolean { return StringExtensions.IsNotNullOrEmpty(this.state.ColumnName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.ColumnName }
    public Back(): void { }
    public StepName = this.props.StepName
}