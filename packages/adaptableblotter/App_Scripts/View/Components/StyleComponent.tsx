import * as React from "react";
import { FormGroup, FormControl, Row, Col, Panel, Checkbox, HelpBlock, Well } from 'react-bootstrap';
import { FontWeight, FontStyle, FontSize, MessageType } from '../../Utilities/Enums';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';
import { AdaptableBlotterForm } from "./Forms/AdaptableBlotterForm";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IStyle } from "../../Utilities/Interface/IStyle";


export interface StyleComponentProps extends React.ClassAttributes<StyleComponent> {
    ColorPalette: string[],
    StyleClassNames: string[]
    Style: IStyle,
    UpdateStyle: (style: IStyle) => void;
    CanUseClassName: boolean
    cssClassName: string
}

export interface StyleComponentState {
    myStyle: IStyle
    ShowClassName: boolean
}

export class StyleComponent extends React.Component<StyleComponentProps, StyleComponentState>  {

    constructor(props: StyleComponentProps) {
        super(props)
        this.state = {
            myStyle: this.props.Style,
            ShowClassName: StringExtensions.IsNotNullOrEmpty(this.props.Style.ClassName)
        }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + StyleConstants.STYLE_COMPONENT
        let optionFontSizes = EnumExtensions.getNames(FontSize).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as FontSize}</option>
        })

        let optionClassNames = this.props.StyleClassNames.map(scn => {
            return <option value={scn} key={scn}>{scn}</option>
        })

        return <div className={cssClassName}>
            <Panel header="Style" bsStyle="primary">


                {this.props.CanUseClassName && this.props.StyleClassNames.length > 0 &&
                    <Checkbox inline style={{ marginBottom: "10px" }} onChange={(e) => this.onShowClassNameChanged(e)} checked={this.state.ShowClassName}>Use Style Class Name</Checkbox>
                }

                {this.state.ShowClassName ?
                    <Well bsSize="small">
                        <HelpBlock>
                            {"Choose a style from the dropdown."}
                        </HelpBlock>
                        <HelpBlock>
                            {"Note: This assumes that you have provided a style with the same name in a stylesheet."}
                        </HelpBlock>
                        <FormControl componentClass="select" placeholder="select" value={this.state.myStyle.ClassName} onChange={(x) => this.onStyleClassNameChanged(x)} >
                            <option value="select" key="select">Select Style Class Name</option>
                            {optionClassNames}
                        </FormControl>

                    </Well>
                    :

                    <Row>
                        <Col xs={6}>
                            <Panel header="Cell Colours" bsStyle="info"  >
                                <div style={{ height: '355px' }}>
                                    <Col xs={12}>
                                        <HelpBlock>Set the colour by ticking a checkbox and selecting a colour from the dropdown; leave unchecked to use colours from the cell's existing style.</HelpBlock>
                                    </Col>
                                    <AdaptableBlotterForm horizontal>
                                        <FormGroup controlId="colorBackStyle">
                                            <Col xs={6} >
                                                <Checkbox inline value="existing" checked={this.state.myStyle.BackColor ? true : false} onChange={(e) => this.onUseBackColorCheckChange(e)}>Set Back Colour</Checkbox>
                                            </Col>
                                            <Col xs={6}>
                                                {this.state.myStyle.BackColor != null &&
                                                    <ColorPicker  ColorPalette={this.props.ColorPalette} value={this.state.myStyle.BackColor} onChange={(x) => this.onBackColorSelectChange(x)} />
                                                }
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="colorForeStyle">
                                            <Col xs={6} >
                                                <Checkbox inline value="existing" checked={this.state.myStyle.ForeColor ? true : false} onChange={(e) => this.onUseForeColorCheckChange(e)}>Set Fore Colour</Checkbox>
                                            </Col>
                                            <Col xs={6}>
                                                {this.state.myStyle.ForeColor != null &&
                                                    <ColorPicker   ColorPalette={this.props.ColorPalette} value={this.state.myStyle.ForeColor} onChange={(x) => this.onForeColorSelectChange(x)} />
                                                }
                                            </Col>

                                        </FormGroup>
                                    </AdaptableBlotterForm>
                                </div>
                            </Panel>
                        </Col>
                        <Col xs={6}>
                            <Panel header="Font Properties" bsStyle="info"  >
                                <div style={{ height: '355px' }}>
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
                                            <Col xs={6} >
                                                <Checkbox inline checked={this.state.myStyle.FontSize ? true : false} onChange={(e) => this.onUseFontSizeCheckChange(e)}>Set Font Size</Checkbox>
                                            </Col>
                                            <Col xs={6}>
                                                {/*we use the componentclass fieldset to indicate its not a new form...*/}
                                                {this.state.myStyle.FontSize != null &&
                                                    < AdaptableBlotterForm inline componentClass='fieldset' >
                                                        <FormControl componentClass="select" placeholder="select" value={this.state.myStyle.FontSize.toString()} onChange={(x) => this.onFontSizeChange(x)} >
                                                            {optionFontSizes}
                                                        </FormControl>
                                                        {' '}<AdaptablePopover  cssClassName={cssClassName} headerText={"Conditional Style: Font Size"}
                                                            bodyText={["Select the size of the font for the Conditional Style.  The default is 'Medium'."]}
                                                            MessageType={MessageType.Info} />
                                                    </AdaptableBlotterForm  >
                                                }
                                            </Col>

                                        </FormGroup>
                                    </AdaptableBlotterForm>
                                </div>
                            </Panel>
                        </Col>
                    </Row>



                }



            </Panel >
        </div>
    }

    private onShowClassNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        // clear everything 
        this.state.myStyle.BackColor = null;
        this.state.myStyle.ForeColor = null;
        this.state.myStyle.FontSize = null;
        this.state.myStyle.FontStyle = null;
        this.state.myStyle.FontWeight = null;
        this.state.myStyle.ClassName = ""
        this.setState({ ShowClassName: e.checked } as StyleComponentState)
    }

    private onStyleClassNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.state.myStyle.ClassName = e.value == "select" ? "" : e.value;
        this.props.UpdateStyle(this.state.myStyle);
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


