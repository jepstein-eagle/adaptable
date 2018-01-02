import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem, Checkbox, Radio, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize, PopoverType } from '../../Core/Enums';
import { EnumExtensions } from '../../Core/Extensions';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ColorPicker } from '../ColorPicker';
import { Helper } from '../../Core/Helper'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';


export interface ConditionalStyleSettingsWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    PredefinedColorChoices: string[]
}

export interface ConditionalStyleSettingsWizardState {
    BackColor: string,
    ForeColor: string,
    FontWeight: FontWeight,
    FontStyle: FontStyle,
    FontSize: FontSize,
}

export class ConditionalStyleSettingsWizard extends React.Component<ConditionalStyleSettingsWizardProps, ConditionalStyleSettingsWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleSettingsWizardProps) {
        super(props)
        this.state = {
            BackColor: this.props.Data.Style.BackColor,
            ForeColor: this.props.Data.Style.ForeColor,
            FontWeight: this.props.Data.Style.FontWeight,
            FontStyle: this.props.Data.Style.FontStyle,
            FontSize: this.props.Data.Style.FontSize,
        }
    }

    render() {

        let optionFontSizes = EnumExtensions.getNames(FontSize).map((fontSizeName) => {
            return <option key={fontSizeName} value={fontSizeName}>{fontSizeName}</option>
        })

        return <Panel header="Style" bsStyle="primary">

            <Panel header="Cell Colours" eventKey="1" bsStyle="info"  >
                <Col xs={12}>
                    <HelpBlock>Set the fore or back colours - leave unchecked to use the colours from the cell's existing style.</HelpBlock>
                </Col>
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="colorBackStyle">
                        <Col xs={4} >
                            <Checkbox inline value="existing" checked={this.state.BackColor ? true : false} onChange={(e) => this.onUseBackColourCheckChange(e)}>Set Back Colour</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {this.state.BackColor != null &&
                                <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} value={this.state.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="colorForeStyle">
                        <Col xs={4} >
                            <Checkbox inline value="existing" checked={this.state.ForeColor ? true : false} onChange={(e) => this.onUseForeColourCheckChange(e)}>Set Fore Colour</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {this.state.ForeColor != null &&
                                <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} value={this.state.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                            }
                        </Col>

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>

            <Panel header="Font Properties" eventKey="1" bsStyle="info"  >
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="fontWeight">
                        <Col xs={12} >
                            <Checkbox value={FontWeight.Normal} checked={this.state.FontWeight == FontWeight.Bold} onChange={(e) => this.onFontWeightChange(e)} >Bold</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="fontStyle">
                        <Col xs={12} >
                            <Checkbox value={FontStyle.Normal.toString()} checked={this.state.FontStyle == FontStyle.Italic} onChange={(e) => this.onFontStyleChange(e)}  >Italic</Checkbox>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="fontSize">
                        <Col xs={4} >
                            <Checkbox inline checked={this.state.FontSize ? true : false} onChange={(e) => this.onUseFontSizeCheckChange(e)}>Set Font Size</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {/*we use the componentclass fieldset to indicate its not a new form...*/}
                            {this.state.FontSize != null &&
                                < AdaptableBlotterForm inline componentClass='fieldset' >
                                    <FormControl componentClass="select" placeholder="select" value={this.state.FontSize} onChange={(x) => this.onFontSizeChange(x)} >
                                        {optionFontSizes}
                                    </FormControl>
                                    {' '}<AdaptablePopover headerText={"Conditional Style: Font Size"}
                                        bodyText={["Select the size of the font for the Conditional Style.  The default is 'Medium'."]}
                                        popoverType={PopoverType.Info} />
                                </AdaptableBlotterForm  >
                            }
                        </Col>

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>


        </Panel >
    }

    private onUseBackColourCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ BackColor: "#ffffff" } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ BackColor: null } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onUseForeColourCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ ForeColor: "#000000" } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ForeColor: null } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onUseFontSizeCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ FontSize: FontSize.Medium } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ FontSize: null } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }


    private onBackColourSelectChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        this.setState({ BackColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onForeColourSelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ForeColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onFontWeightChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let fontWeight: FontWeight = (e.checked) ? FontWeight.Bold : FontWeight.Normal;
        this.setState({ FontWeight: fontWeight } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onFontStyleChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let fontStyle: FontStyle = (e.checked) ? FontStyle.Italic : FontStyle.Normal;
        this.setState({ FontStyle: fontStyle } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onFontSizeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ FontSize: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return this.state.BackColor != null || this.state.ForeColor != null || this.state.FontWeight != FontWeight.Normal || this.state.FontStyle != FontStyle.Normal || this.state.FontSize != null;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.Style.BackColor = this.state.BackColor;
        this.props.Data.Style.ForeColor = this.state.ForeColor;
        this.props.Data.Style.FontWeight = this.state.FontWeight;
        this.props.Data.Style.FontStyle = this.state.FontStyle;
        this.props.Data.Style.FontSize = this.state.FontSize;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}


