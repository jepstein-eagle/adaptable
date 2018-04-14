import * as React from "react";
import { FormGroup, FormControl, Col, Panel, Checkbox, HelpBlock } from 'react-bootstrap';
import { IStyle } from '../../Core/Interface/IStyle';
import { FontWeight, FontStyle, FontSize, PopoverType } from '../../Core/Enums';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';
import { AdaptableBlotterForm } from "./Forms/AdaptableBlotterForm";


export interface StyleComponentProps extends React.ClassAttributes<StyleComponent> {
    ColorPalette: string[],
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

        return <div className="adaptable_blotter_style_styleeditor">
            <Panel header="Style" bsStyle="primary">

                <Panel header="Cell Colours" bsStyle="info"  >
                    <Col xs={12}>
                        <HelpBlock>Set the fore or back colours by ticking the checkbox and selecting a colour from the dropdown.  Leave unchecked to continue using the colours from the cell's existing style.</HelpBlock>
                    </Col>
                    <AdaptableBlotterForm horizontal>
                        <FormGroup controlId="colorBackStyle">
                            <Col xs={3} >
                                <Checkbox inline value="existing" checked={this.state.myStyle.BackColor ? true : false} onChange={(e) => this.onUseBackColorCheckChange(e)}>Set Back Colour</Checkbox>
                            </Col>
                            <Col xs={8}>
                                {this.state.myStyle.BackColor != null &&
                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.state.myStyle.BackColor} onChange={(x) => this.onBackColorSelectChange(x)} />
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="colorForeStyle">
                            <Col xs={3} >
                                <Checkbox inline value="existing" checked={this.state.myStyle.ForeColor ? true : false} onChange={(e) => this.onUseForeColorCheckChange(e)}>Set Fore Colour</Checkbox>
                            </Col>
                            <Col xs={8}>
                                {this.state.myStyle.ForeColor != null &&
                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.state.myStyle.ForeColor} onChange={(x) => this.onForeColorSelectChange(x)} />
                                }
                            </Col>

                        </FormGroup>
                    </AdaptableBlotterForm>
                </Panel>

                <Panel header="Font Properties" bsStyle="info"  >
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
                            <Col xs={3} >
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
        </div>
    }

    private onUseBackColorCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.BackColor = (e.checked) ? "#ffffff" : null;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onUseForeColorCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.ForeColor = (e.checked) ? "#000000" : null;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onUseFontSizeCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.FontSize = (e.checked) ? FontSize.Medium : null;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onBackColorSelectChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.BackColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }

    private onForeColorSelectChange(event: React.FormEvent<any>) {
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


