import { IReport } from "../../../Api/Interface/IAdaptableBlotterObjects";
import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';

export interface ReportSettingsWizardProps extends AdaptableWizardStepProps<IReport> {
    Reports: IReport[]
}
export interface ReportSettingsWizardState {
    ReportName: string,
    ErrorMessage: string
}

export class ReportSettingsWizard extends React.Component<ReportSettingsWizardProps, ReportSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ReportSettingsWizardProps) {
        super(props);
        this.state = {
            ReportName: this.props.Data.Name,
            ErrorMessage: null
        }
    }
    render(): any {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let cssClassName: string = this.props.cssClassName + "-settings"
       
        return <div className={cssClassName}>
        <Panel header="Enter a Name for the Report" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <Col xs={10}>
                        <FormGroup controlId="formInlineName" validationState={validationState}>
                            <FormControl type="text" placeholder="Enter Report Name" value={this.state.ReportName} onChange={(e) => this.onReportNameChanged(e)} />
                            <FormControl.Feedback />
                            <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                        </FormGroup>
                    </Col>

                    <Col xs={2}>{' '} </Col>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    private onReportNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            ReportName: e.value,
            ErrorMessage: this.props.Reports.findIndex(x => x.Name == e.value) > -1 ? "A Report already exists with that name" : null
        } as  ReportSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.ReportName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.Name = this.state.ReportName; }
    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}

