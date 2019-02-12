import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";

export interface ChartSettingsWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartTitles: string[]
}

export interface ChartSettingsWizardState {
    Title: string,
    SubTitle: string,
    ErrorMessage: string
}

export class ChartSettingsWizard extends React.Component<ChartSettingsWizardProps, ChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartSettingsWizardProps) {
        super(props)
        this.state = {
            Title: props.Data.Title,
            SubTitle: props.Data.SubTitle,
            ErrorMessage: null
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
      
        return <div className={cssClassName}>
            <Panel header="Chart Definition Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="chartTitle">
                        <Col xs={3} componentClass={ControlLabel}>Title:</Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineTitle" validationState={validationState}>
                                <FormControl value={this.state.Title} type="string" placeholder="Enter chart title"
                                    onChange={(e) => this.onChartTitleChange(e)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="chartName">
                        <Col xs={3} componentClass={ControlLabel}>Sub title:</Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineName" validationState={validationState}>
                                <FormControl value={this.state.SubTitle} type="string" placeholder="Enter chart subtitle (optional)"
                                    onChange={(e) => this.onChartSubTitleChange(e)} />
                            </FormGroup>
                        </Col>
                    </FormGroup>


                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    onChartTitleChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            Title: e.value,
            ErrorMessage: ArrayExtensions.ContainsItem(this.props.ChartTitles, e.value) ? "A Chart Definition already exists with that title" : null
        } as ChartSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    onChartSubTitleChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SubTitle: e.value, } as ChartSettingsWizardState, () => this.props.UpdateGoBackState())
    }




    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.Title) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Title = this.state.Title
        this.props.Data.SubTitle = this.state.SubTitle
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return (ExpressionHelper.IsEmptyExpression(this.props.Data.XSegmentExpression)) ? 2 : 1
    }
   
}

