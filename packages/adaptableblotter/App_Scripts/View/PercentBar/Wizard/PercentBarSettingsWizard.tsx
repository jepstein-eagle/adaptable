import * as React from "react";
import { FormGroup, FormControl, Col, Panel, ControlLabel, Row, Checkbox, Radio } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { MessageType, SelectionMode } from '../../../Utilities/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IPercentBar } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import { ColorPicker } from "../../ColorPicker";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";

export interface PercentBarsWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    Columns: Array<IColumn>;
    ColorPalette: Array<string>;
}
export interface PercentBarSettingsWizardState {
    MinValue: number;
    MaxValue: number;
    MinValueColumnId: string;
    MaxValueColumnId: string;
    PositiveColor: string;
    NegativeColor: string;
    ShowValue: boolean;
    UseMinColumn: boolean;
    UseMaxColumn: boolean;
}

export class PercentBarSettingsWizard extends React.Component<PercentBarsWizardProps, PercentBarSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarsWizardProps) {
        super(props)
        this.state = {
            MinValue: this.props.Data.MinValue,
            MaxValue: this.props.Data.MaxValue,
            MinValueColumnId: this.props.Data.MinValueColumnId,
            MaxValueColumnId: this.props.Data.MaxValueColumnId,
            PositiveColor: this.props.Data.PositiveColor,
            NegativeColor: this.props.Data.NegativeColor,
            ShowValue: this.props.Data.ShowValue,
            UseMinColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MinValueColumnId),
            UseMaxColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MaxValueColumnId),

        }
    }

    render(): any {

        let cssClassName: string = this.props.cssClassName + "-s"
        let friendlyColumnName: string = ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);

        return <div className={cssClassName}>
            <Panel header={"Percent Bar for: " + friendlyColumnName} bsStyle="primary">

                <AdaptableBlotterForm >

                    <FormGroup controlId="formMinimumValueSelect">
                        <Row>
                            <Col xs={3}>
                                <ControlLabel>Minimum Value:</ControlLabel>
                            </Col>
                            <Col xs={6} >
                                <Radio inline value="value" checked={this.state.UseMinColumn == false} onChange={(e) => this.onUseMinColumnSelectChanged(e)}>Numeric Value</Radio>
                                {' '}
                                <Radio inline value="column" checked={this.state.UseMinColumn == true} onChange={(e) => this.onUseMinColumnSelectChanged(e)}>Column</Radio>
                                <span style={{ marginLeft: '10px' }} >
                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Percent Bar: Minimum Value"}
                                        bodyText={["The minimum value of the column (can be minus).  If positive numbers only use the default of 0."]} MessageType={MessageType.Info} />
                                </span>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '10px' }}>
                            <Col xs={3} />
                            <Col xs={5}>
                                {this.state.UseMinColumn == false ?

                                    <FormControl
                                        type="number"
                                        placeholder="Enter Number"
                                        onChange={this.onMinValueChanged}
                                        value={this.state.MinValue}
                                    />
                                    :
                                    <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.MinValueColumnId]}
                                        ColumnList={this.props.Columns}
                                        onColumnChange={columns => this.onColumnMinValueSelectedChanged(columns)}
                                        SelectionMode={SelectionMode.Single} />
                                }
                            </Col>
                        </Row>

                    </FormGroup>

                    <FormGroup controlId="formMaximumValueSelect">
                        <Row>
                            <Col xs={3}>
                                <ControlLabel>Maximum Value:</ControlLabel>
                            </Col>
                            <Col xs={6} >
                                <Radio inline value="value" checked={this.state.UseMaxColumn == false} onChange={(e) => this.onUseMaxColumnSelectChanged(e)}>Numeric Value</Radio>
                                {' '}
                                <Radio inline value="column" checked={this.state.UseMaxColumn == true} onChange={(e) => this.onUseMaxColumnSelectChanged(e)}>Column</Radio>
                                <span style={{ marginLeft: '10px' }} >
                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Percent Bar: Maximum Value"}
                                        bodyText={["The maximum value of the bar.  Can be a numeric value (default is 100) or another column"]} MessageType={MessageType.Info} />
                                </span>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '10px' }}>
                            <Col xs={3} />
                            <Col xs={5}>
                                {this.state.UseMaxColumn == false ?

                                    <FormControl
                                        type="number"
                                        placeholder="Enter Number"
                                        onChange={this.onMaxValueChanged}
                                        value={this.state.MaxValue}
                                    />
                                    :
                                    <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.MaxValueColumnId]}
                                        ColumnList={this.props.Columns}
                                        onColumnChange={columns => this.onColumnMaxValueSelectedChanged(columns)}
                                        SelectionMode={SelectionMode.Single} />
                                }
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
                                <ControlLabel>Show Cell Value:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox style={{ margin: '0px' }} onChange={(e) => this.onShowValueChanged(e)} checked={this.state.ShowValue}></Checkbox>
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

    private onUseMinColumnSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ UseMinColumn: (e.value == "column") } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onMinValueChanged = (e: any) => {
        this.setState({ MinValue: e.target.value } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onColumnMinValueSelectedChanged(columns: IColumn[]) {
        this.setState({ MinValueColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onUseMaxColumnSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ UseMaxColumn: (e.value == "column") } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onMaxValueChanged = (e: any) => {
        this.setState({ MaxValue: e.target.value } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onColumnMaxValueSelectedChanged(columns: IColumn[]) {
        this.setState({ MaxValueColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as PercentBarSettingsWizardState, () => this.props.UpdateGoBackState())
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
        if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId) ||
            StringExtensions.IsNullOrEmpty(this.state.PositiveColor) ||
            StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
            return false;
        }
        if (this.state.UseMinColumn && StringExtensions.IsNullOrEmpty(this.state.MinValueColumnId)) {
            return false;
        }
        if (this.state.UseMaxColumn && StringExtensions.IsNullOrEmpty(this.state.MaxValueColumnId)) {
            return false;
        }

        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {

        this.props.Data.MinValue = (this.state.UseMinColumn) ? 0 : this.state.MinValue
        this.props.Data.MaxValue = (this.state.UseMaxColumn) ? 100 : this.state.MaxValue;
        this.props.Data.MinValueColumnId = (this.state.UseMinColumn) ? this.state.MinValueColumnId : null;
        this.props.Data.MaxValueColumnId = (this.state.UseMaxColumn) ? this.state.MaxValueColumnId : null;
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

