import { IReport } from '../../../Strategy/Interface/IExportStrategy';
import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';

export interface ReportNameWizardProps extends AdaptableWizardStepProps<IReport> {
    Reports: IReport[]
}
export interface ReportNameWizardState {
    ReportName: string,
    ErrorMessage: string
}

export class ReportNameWizard extends React.Component<ReportNameWizardProps, ReportNameWizardState> implements AdaptableWizardStep {
    constructor(props: ReportNameWizardProps) {
        super(props);
        this.state = {
            ReportName: this.props.Data.Name,
            ErrorMessage: null
        }
    }
    render(): any {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";

        return <div className="adaptable_blotter_style_wizard_export_reportname">
            <Panel header="Enter a Name for the Report" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <Col xs={10}>
                        <FormGroup controlId="formInlineName" validationState={validationState}>
                            <FormControl type="text" placeholder="Enter Report Name" value={this.state.ReportName} onChange={(e) => this.onSaveLayoutNameChanged(e)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                        </FormGroup>
                    </Col>

                    <Col xs={2}>{' '} </Col>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    private onSaveLayoutNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            ReportName: e.value,
            ErrorMessage: this.props.Reports.findIndex(x => x.Name == e.value) > -1 ? "A Report already exists with that name" : null
        } as ReportNameWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.ReportName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.Name = this.state.ReportName; }
    public Back(): void {
        //todo
    }
    public StepName = this.props.StepName
}

