import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem, Checkbox, Radio, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IFormatColumn } from '../../Core/Interface/IFormatColumnStrategy';
import { IStyle } from '../../Core/Interface/IStyle';
import { FontWeight, FontStyle, FontSize, PopoverType } from '../../Core/Enums';
import { EnumExtensions } from '../../Core/Extensions';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ColorPicker } from '../ColorPicker';
import { Helper } from '../../Core/Helper'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';


export interface StyleComponentProps extends React.ClassAttributes<StyleComponent> {
    PredefinedColorChoices: string[],
    Style: IStyle,
    UpdateStyle: (style: IStyle) => void;
}

export interface StyleComponentState {
    myStyle: IStyle
}

export class StyleComponent extends React.Component<StyleComponentProps, StyleComponentState>  {

    constructor(props: StyleComponentProps) {
        super(props)
        this.state = {
            myStyle: this.props.Style
        }
    }

    render() {

          let optionFontSizes = EnumExtensions.getNames(FontSize).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as FontSize}</option>
        })

        return <Panel header="Style" bsStyle="primary">

            <Panel header="Cell Colours" eventKey="1" bsStyle="info"  >
                <Col xs={12}>
                    <HelpBlock>Set the fore or back colours - leave unchecked to use the colours from the cell's existing style.</HelpBlock>
                </Col>
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="colorBackStyle">
                        <Col xs={4} >
                            <Checkbox inline value="existing" checked={this.state.myStyle.BackColor ? true : false} onChange={(e) => this.onUseBackColourCheckChange(e)}>Set Back Colour</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {this.state.myStyle.BackColor != null &&
                                <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} value={this.state.myStyle.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="colorForeStyle">
                        <Col xs={4} >
                            <Checkbox inline value="existing" checked={this.state.myStyle.ForeColor ? true : false} onChange={(e) => this.onUseForeColourCheckChange(e)}>Set Fore Colour</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {this.state.myStyle.ForeColor != null &&
                                <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} value={this.state.myStyle.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                            }
                        </Col>

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>

            <Panel header="Font Properties" eventKey="1" bsStyle="info"  >
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="fontWeight">
                        <Col xs={12} >
                            <Checkbox value={FontWeight.Normal.toString()} checked={this.state.myStyle.FontWeight == FontWeight.Bold} onChange={(e) => this.onFontWeightChange(e)} >Bold</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="fontStyle">
                        <Col xs={12} >
                            <Checkbox value={FontStyle.Normal.toString()} checked={this.state.myStyle.FontStyle == FontStyle.Italic} onChange={(e) => this.onFontStyleChange(e)}  >Italic</Checkbox>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="fontSize">
                        <Col xs={4} >
                            <Checkbox inline checked={this.state.myStyle.FontSize ? true : false} onChange={(e) => this.onUseFontSizeCheckChange(e)}>Set Font Size</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {/*we use the componentclass fieldset to indicate its not a new form...*/}
                            {this.state.myStyle.FontSize != null &&
                                < AdaptableBlotterForm inline componentClass='fieldset' >
                                    <FormControl componentClass="select" placeholder="select" value={this.state.myStyle.FontSize.toString()} onChange={(x) => this.onFontSizeChange(x)} >
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
        this.state.myStyle.BackColor = (e.checked) ? "#ffffff" : null;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onUseForeColourCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.ForeColor = (e.checked) ? "#000000" : null;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onUseFontSizeCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.FontSize = (e.checked) ? FontSize.Medium  : null;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onBackColourSelectChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.BackColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onForeColourSelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.ForeColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onFontWeightChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let fontWeight: FontWeight = (e.checked) ? FontWeight.Bold : FontWeight.Normal;
        this.state.myStyle.FontWeight = fontWeight;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onFontStyleChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let fontStyle: FontStyle = (e.checked) ? FontStyle.Italic : FontStyle.Normal;
        this.state.myStyle.FontStyle = fontStyle;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onFontSizeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.FontSize = e.value as FontSize;
        this.props.UpdateStyle(this.state.myStyle);
    }

}


