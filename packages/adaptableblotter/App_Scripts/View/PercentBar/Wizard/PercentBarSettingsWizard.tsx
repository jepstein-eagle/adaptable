import * as React from "react";
import { FormGroup, FormControl, Col, Panel, ControlLabel, Row, Checkbox, Radio } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { MessageType, SelectionMode } from '../../../Utilities/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
import { ColorPicker } from "../../ColorPicker";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";

export interface PercentBarSettingsWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    ColorPalette: Array<string>;
}
export interface PercentBarSettingsWizardState {
    PositiveColor: string;
    NegativeColor: string;
    ShowValue: boolean;
}

export class PercentBarSettingsWizard extends React.Component<PercentBarSettingsWizardProps, PercentBarSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarSettingsWizardProps) {
        super(props)
        this.state = {
            PositiveColor: this.props.Data.PositiveColor,
            NegativeColor: this.props.Data.NegativeColor,
            ShowValue: this.props.Data.ShowValue,
        }
    }

    render(): any {

        let cssClassName: string = this.props.cssClassName + "-s"

        return <div className={cssClassName}>
            <Panel header={"Select Style"} bsStyle="primary">

                <AdaptableBlotterForm >

                    <FormGroup controlId="formPositiveColour">
                        <Row>
                            <Col xs={3} >
                                <ControlLabel>Positive Colour:</ControlLabel>
                            </Col>
                            <Col xs={3}>
                                <ColorPicker
                                    ColorPalette={this.props.ColorPalette}
                                    value={this.state.PositiveColor}
                                    onChange={(x) => this.onPositiveColorSelectChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup controlId="formNegativeColour">
                        <Row>
                            <Col xs={3} >
                                <ControlLabel>Negative Colour:</ControlLabel>
                            </Col>
                            <Col xs={3}>
                                <ColorPicker
                                    ColorPalette={this.props.ColorPalette}
                                    value={this.state.NegativeColor}
                                    onChange={(x) => this.onNegativeColorSelectChanged(x)} />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup controlId="formShowValue">
                        <Row>
                            <Col xs={3}>
                                <ControlLabel>Show Cell Value:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox style={{ margin: '0px' }} onChange={(e) => this.onShowValueChanged(e)} checked={this.state.ShowValue}></Checkbox>
                            </Col>
                            <Col xs={1}>
                                <AdaptablePopover cssClassName={cssClassName} headerText={"Percent Bar: Show Value"} bodyText={["Whether to show additionally the value of the cell in the bar."]} />
                            </Col>
                        </Row>
                    </FormGroup>

                </AdaptableBlotterForm>



            </Panel>
        </div>



    }

    private onPositiveColorSelectChanged(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        this.setState({ PositiveColor: e.value } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onNegativeColorSelectChanged(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        this.setState({ NegativeColor: e.value } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    private onShowValueChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShowValue: e.checked } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (StringExtensions.IsNullOrEmpty(this.state.PositiveColor) || StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {

        this.props.Data.PositiveColor = this.state.PositiveColor;
        this.props.Data.NegativeColor = this.state.NegativeColor;
        this.props.Data.ShowValue = this.state.ShowValue;
    }

    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

