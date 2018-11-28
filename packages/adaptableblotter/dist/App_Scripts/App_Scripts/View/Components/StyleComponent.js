"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Core/Enums");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const ColorPicker_1 = require("../ColorPicker");
const AdaptablePopover_1 = require("../AdaptablePopover");
const AdaptableBlotterForm_1 = require("./Forms/AdaptableBlotterForm");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class StyleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myStyle: this.props.Style,
            ShowClassName: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Style.ClassName)
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.STYLE_COMPONENT;
        let optionFontSizes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.FontSize).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let optionClassNames = this.props.StyleClassNames.map(scn => {
            return React.createElement("option", { value: scn, key: scn }, scn);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Style", bsStyle: "primary" },
                this.props.CanUseClassName && this.props.StyleClassNames.length > 0 &&
                    React.createElement(react_bootstrap_1.Checkbox, { inline: true, style: { marginBottom: "10px" }, onChange: (e) => this.onShowClassNameChanged(e), checked: this.state.ShowClassName }, "Use Style Class Name"),
                this.state.ShowClassName ?
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Choose a style from the dropdown."),
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Note: This assumes that you have provided a style with the same name in a stylesheet."),
                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.myStyle.ClassName, onChange: (x) => this.onStyleClassNameChanged(x) },
                            React.createElement("option", { value: "select", key: "select" }, "Select Style Class Name"),
                            optionClassNames))
                    :
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Panel, { header: "Cell Colours", bsStyle: "info" },
                                    React.createElement("div", { style: { height: '355px' } },
                                        React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                            React.createElement(react_bootstrap_1.HelpBlock, null, "Set the colour by ticking a checkbox and selecting a colour from the dropdown; leave unchecked to use colours from the cell's existing style.")),
                                        React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "colorBackStyle" },
                                                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                    React.createElement(react_bootstrap_1.Checkbox, { inline: true, value: "existing", checked: this.state.myStyle.BackColor ? true : false, onChange: (e) => this.onUseBackColorCheckChange(e) }, "Set Back Colour")),
                                                React.createElement(react_bootstrap_1.Col, { xs: 6 }, this.state.myStyle.BackColor != null &&
                                                    React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.myStyle.BackColor, onChange: (x) => this.onBackColorSelectChange(x) }))),
                                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "colorForeStyle" },
                                                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                    React.createElement(react_bootstrap_1.Checkbox, { inline: true, value: "existing", checked: this.state.myStyle.ForeColor ? true : false, onChange: (e) => this.onUseForeColorCheckChange(e) }, "Set Fore Colour")),
                                                React.createElement(react_bootstrap_1.Col, { xs: 6 }, this.state.myStyle.ForeColor != null &&
                                                    React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.myStyle.ForeColor, onChange: (x) => this.onForeColorSelectChange(x) }))))))),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Panel, { header: "Font Properties", bsStyle: "info" },
                                    React.createElement("div", { style: { height: '355px' } },
                                        React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "fontWeight" },
                                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                                    React.createElement(react_bootstrap_1.Checkbox, { value: Enums_1.FontWeight.Normal.toString(), checked: this.state.myStyle.FontWeight == Enums_1.FontWeight.Bold, onChange: (e) => this.onFontWeightChange(e) }, "Bold"))),
                                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "fontStyle" },
                                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                                    React.createElement(react_bootstrap_1.Checkbox, { value: Enums_1.FontStyle.Normal.toString(), checked: this.state.myStyle.FontStyle == Enums_1.FontStyle.Italic, onChange: (e) => this.onFontStyleChange(e) }, "Italic"))),
                                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "fontSize" },
                                                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                    React.createElement(react_bootstrap_1.Checkbox, { inline: true, checked: this.state.myStyle.FontSize ? true : false, onChange: (e) => this.onUseFontSizeCheckChange(e) }, "Set Font Size")),
                                                React.createElement(react_bootstrap_1.Col, { xs: 6 }, this.state.myStyle.FontSize != null &&
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true, componentClass: 'fieldset' },
                                                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.myStyle.FontSize.toString(), onChange: (x) => this.onFontSizeChange(x) }, optionFontSizes),
                                                        ' ',
                                                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Conditional Style: Font Size", bodyText: ["Select the size of the font for the Conditional Style.  The default is 'Medium'."], MessageType: Enums_1.MessageType.Info })))))))))));
    }
    onShowClassNameChanged(event) {
        let e = event.target;
        // clear everything 
        this.state.myStyle.BackColor = null;
        this.state.myStyle.ForeColor = null;
        this.state.myStyle.FontSize = null;
        this.state.myStyle.FontStyle = null;
        this.state.myStyle.FontWeight = null;
        this.state.myStyle.ClassName = "";
        this.setState({ ShowClassName: e.checked });
    }
    onStyleClassNameChanged(event) {
        let e = event.target;
        this.state.myStyle.ClassName = e.value == "select" ? "" : e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onUseBackColorCheckChange(event) {
        let e = event.target;
        this.state.myStyle.BackColor = (e.checked) ? "#ffffff" : null;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onUseForeColorCheckChange(event) {
        let e = event.target;
        this.state.myStyle.ForeColor = (e.checked) ? "#000000" : null;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onUseFontSizeCheckChange(event) {
        let e = event.target;
        this.state.myStyle.FontSize = (e.checked) ? Enums_1.FontSize.Medium : null;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onBackColorSelectChange(event) {
        let e = event.target;
        this.state.myStyle.BackColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onForeColorSelectChange(event) {
        let e = event.target;
        this.state.myStyle.ForeColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onFontWeightChange(event) {
        let e = event.target;
        let fontWeight = (e.checked) ? Enums_1.FontWeight.Bold : Enums_1.FontWeight.Normal;
        this.state.myStyle.FontWeight = fontWeight;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onFontStyleChange(event) {
        let e = event.target;
        let fontStyle = (e.checked) ? Enums_1.FontStyle.Italic : Enums_1.FontStyle.Normal;
        this.state.myStyle.FontStyle = fontStyle;
        this.props.UpdateStyle(this.state.myStyle);
    }
    onFontSizeChange(event) {
        let e = event.target;
        this.state.myStyle.FontSize = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    }
}
exports.StyleComponent = StyleComponent;
