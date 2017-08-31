import * as React from "react";
import { ListGroup, ListGroupItem, Panel, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions';
import { ColumnSelector } from '../ColumnSelector';
import { ICustomColumn } from "../../Core/Interface/ICustomColumnStrategy";
import { AdaptableBlotterForm } from "../AdaptableBlotterForm";

export interface CustomColumnSettingsWizardProps extends AdaptableWizardStepProps<ICustomColumn> {
}
export interface CustomColumnSettingsWizardState {
    ColumnName: string
}

export class CustomColumnSettingsWizard extends React.Component<CustomColumnSettingsWizardProps, CustomColumnSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CustomColumnSettingsWizardProps) {
        super(props);
        this.state = { ColumnName: this.props.Data.ColumnId }
    }
    render(): any {
        return <Panel header="Column Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="formInlineName">
                    <Col xs={4}>
                        <ControlLabel >Column Name</ControlLabel>
                    </Col>
                    <Col xs={8}>
                        <FormControl style={{ width: "Auto" }} value={this.state.ColumnName} type="text" placeholder="Enter a name" onChange={(e) => this.handleColumnNameChange(e)} />
                    </Col>
                </FormGroup>
            </AdaptableBlotterForm>
        </Panel>
    }

    handleColumnNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnName: e.value }, () => this.props.UpdateGoBackState())

    }

    public canNext(): boolean { return StringExtensions.IsNotNullOrEmpty(this.state.ColumnName); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.ColumnName }
    public Back(): void { }
    public StepName = "Name your Custom Column"
}