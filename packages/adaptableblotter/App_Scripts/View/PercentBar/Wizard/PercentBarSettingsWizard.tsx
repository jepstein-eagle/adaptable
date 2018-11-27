import * as React from "react";
import { FormGroup, FormControl, Col, Panel, ControlLabel, Row, Checkbox } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { MessageType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IPercentBar } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColorPicker } from "../../ColorPicker";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";

export interface PercentBarsWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    Columns: Array<IColumn>;
    ColorPalette: Array<string>;
}
export interface PercentBarSettingsWizardState {
    MinValue: number;
    MaxValue: number;
    PositiveColor: string;
    NegativeColor: string;
    ShowValue: boolean;
}

export class PercentBarSettingsWizard extends React.Component<PercentBarsWizardProps, PercentBarSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarsWizardProps) {
        super(props)
        this.state = {
            MinValue: this.props.Data.MinValue,
            MaxValue: this.props.Data.MaxValue,
            PositiveColor: this.props.Data.PositiveColor,
            NegativeColor: this.props.Data.NegativeColor,
            ShowValue: this.props.Data.ShowValue,
        }
    }

    render(): any {

        let cssClassName: string = this.props.cssClassName + "-s"
        let friendlyColumnName: string = ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);

        return <div className={cssClassName}>
            <Panel header={"Percent Bar for: " + friendlyColumnName} bsStyle="primary">

                <AdaptableBlotterForm >

                    <FormGroup controlId="formMinimumValue">
                        <Row>
                            <Col xs={3}>
                                <ControlLabel>Minimum Value:</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <FormControl
                                    type="number"
                                    placeholder="Enter Number"
                                    onChange={this.onMinValueChanged}
                                    value={this.state.MinValue}
                                />
                            </Col>
                            <Col xs={1}><AdaptablePopover cssClassName={cssClassName} headerText={"Percent Bar: Minimum Value"}
                                bodyText={["The minimum value of the column (can be minus).  If positive numbers only use the default of 0."]} MessageType={MessageType.Info} />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup controlId="formMaximumValue">
                        <Row>
                            <Col xs={3}>
                                <ControlLabel>Maximum Value:</ControlLabel>
                            </Col>
                            <Col xs={6}>
                                <FormControl
                                    type="number"
                                    placeholder="Enter Number"
                                    onChange={this.onMaxValueChanged}
                                    value={this.state.MaxValue}
                                />
                            </Col>
                            <Col xs={1}><AdaptablePopover cssClassName={cssClassName} headerText={"Percent Bar: Maximum Value"}
                                bodyText={["The maximum value of the column (default is 100)"]} MessageType={MessageType.Info} />
                            </Col>
                        </Row>
                    </FormGroup>

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
                                <ControlLabel>Show Value:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox style={{margin: '0px'}}  onChange={(e) => this.onShowValueChanged(e)} checked={this.state.ShowValue}></Checkbox>
                            </Col>
                            <Col xs={1}>
                                <AdaptablePopover cssClassName={cssClassName} headerText={"Percent Bar: Show Value"} bodyText={["Whether to show additionally the value of the cell in the bar."]} MessageType={MessageType.Info} />
                            </Col>
                        </Row>
                    </FormGroup>

                </AdaptableBlotterForm>



            </Panel>
        </div>



    }

    private onMinValueChanged = (e: any) => {
        this.setState({ MinValue: e.target.value } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onMaxValueChanged = (e: any) => {
        this.setState({ MaxValue: e.target.value } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
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

        return true;// StringExtensions.IsNotNullOrEmpty(this.state.PositiveColor);
    }

    public canBack(): boolean { return true; }
    public Next(): void {

        this.props.Data.MinValue = this.state.MinValue;
        this.props.Data.MaxValue = this.state.MaxValue;
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

