import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { EnumExtensions } from "../../../Utilities/Extensions/EnumExtensions";
import { ChartType } from "../../../Core/Enums";

export interface ChartSettingsWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
}

export interface ChartSettingsWizardState {
    ChartName: string,
    ChartType: 'Bar Chart' | 'Line Chart',
    ErrorMessage: string
}

export class ChartSettingsWizard extends React.Component<ChartSettingsWizardProps, ChartSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ChartSettingsWizardProps) {
        super(props)
        this.state = {
            ChartName: props.Data.Name,
            ChartType: props.Data.Type,
            ErrorMessage: null
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let optionChartTypes = EnumExtensions.getNames(ChartType).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartType}</option>
        })

        return <div className={cssClassName}>
            <Panel header="Chart Definition Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="chartName">
                        <Col xs={3} componentClass={ControlLabel}>Name:</Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineName" validationState={validationState}>
                                <FormControl value={this.state.ChartName} type="string" placeholder="Enter chart name"
                                    onChange={(e) => this.onChartNameChange(e)} />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                            </FormGroup>
                        </Col>
                     </FormGroup>
                    <FormGroup controlId="chartType">
                        <Col xs={3} componentClass={ControlLabel}>Type:</Col>
                        <Col xs={7}>
                            <FormGroup controlId="formInlineName" >
                                <FormControl componentClass="select" placeholder="select" value={this.state.ChartType} onChange={(x) => this.onChartTypeChange(x)} >
                                    {optionChartTypes}
                                </FormControl>
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
            ChartName: e.value,
            ErrorMessage: ArrayExtensions.ContainsItem(this.props.ChartDefinitions.map(s => s.Name), e.value) ? "A Chart Definition already exists with that name" : null
        } as ChartSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    onChartTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChartType: e.value as ChartType, } as ChartSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
        return StringExtensions.IsNotEmpty(this.state.ChartName) && StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.Name = this.state.ChartName
        this.props.Data.Type = this.state.ChartType
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

