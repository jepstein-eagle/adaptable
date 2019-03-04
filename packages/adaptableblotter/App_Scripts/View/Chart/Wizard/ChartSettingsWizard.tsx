import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ICategoryChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";

export interface ChartSettingsWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
    ChartNames: string[]
}

export interface ChartSettingsWizardState {
    Name: string,
    Description: string,
    ErrorMessage: string
}

export class ChartSettingsWizard extends React.Component<ChartSettingsWizardProps, ChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartSettingsWizardProps) {
        super(props)
        this.state = {
            Name: props.Data.Name,
            Description: props.Data.Description,
            ErrorMessage: null
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
      
        return <div className={cssClassName}>
            <Panel header="Chart Definition Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="chartName">
                        <Col xs={3} componentClass={ControlLabel}>Name:</Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineName" validationState={validationState}>
                                <FormControl value={this.state.Name} type="string" placeholder="Enter chart name"
                                    onChange={(e) => this.onChartNameChange(e)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="chartDescription">
                        <Col xs={3} componentClass={ControlLabel}>Description:</Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineDescription" validationState={validationState}>
                                <FormControl value={this.state.Description} type="string" placeholder="Enter description (optional)"
                                    onChange={(e) => this.onChartDescriptionChange(e)} />
                            </FormGroup>
                        </Col>
                    </FormGroup>


                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    onChartNameChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({
            Name: e.value,
            ErrorMessage: ArrayExtensions.ContainsItem(this.props.ChartNames, e.value) ? "A Chart Definition already exists with that name" : null
        } as ChartSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    onChartDescriptionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ Description: e.value, } as ChartSettingsWizardState, () => this.props.UpdateGoBackState())
    }




    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.Name) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Name = this.state.Name
        this.props.Data.Description = this.state.Description
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return (ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1
    }
   
}

