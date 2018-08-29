"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _ = require("lodash");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Core/Enums");
const QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const ColorPicker_1 = require("../ColorPicker");
const AdaptablePopover_1 = require("../AdaptablePopover");
const AdaptableBlotterFormControlTextClear_1 = require("../Components/Forms/AdaptableBlotterFormControlTextClear");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const GeneralConstants_1 = require("../../Core/Constants/GeneralConstants");
class QuickSearchPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 250);
        this.state = { EditedQuickSearchText: "", EditedStyle: null };
    }
    componentDidMount() {
        this.setState({ EditedQuickSearchText: this.props.QuickSearchText, EditedStyle: this.props.QuickSearchStyle });
    }
    handleQuickSearchTextChange(text) {
        this.setState({ EditedQuickSearchText: text });
        this.debouncedRunQuickSearch();
    }
    onStringOperatorChange(event) {
        let e = event.target;
        this.props.onSetSearchOperator(e.value);
    }
    onDisplayTypeChange(event) {
        let e = event.target;
        this.props.onSetSearchDisplayType(e.value);
    }
    onUseBackColorCheckChange(event) {
        let e = event.target;
        let style = this.state.EditedStyle;
        style.BackColor = (e.checked) ?
            (this.props.QuickSearchStyle.BackColor) ? this.props.QuickSearchStyle.BackColor : GeneralConstants_1.QUICK_SEARCH_DEFAULT_BACK_COLOR
            :
                null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }
    onUseForeColorCheckChange(event) {
        let e = event.target;
        let style = this.state.EditedStyle;
        style.ForeColor = (e.checked) ?
            (this.props.QuickSearchStyle.ForeColor) ? this.props.QuickSearchStyle.ForeColor : GeneralConstants_1.QUICK_SEARCH_DEFAULT_FORE_COLOR
            :
                null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }
    onBackColorSelectChange(event) {
        let e = event.target;
        let style = this.state.EditedStyle;
        style.BackColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }
    onForeColorSelectChange(event) {
        let e = event.target;
        let style = this.state.EditedStyle;
        style.ForeColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }
    render() {
        let cssClassName = this.props.cssClassName + "__quicksearch";
        let infoBody = ["Run a simple text search across all visible cells in the Blotter.", React.createElement("br", null), React.createElement("br", null), "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", React.createElement("br", null), React.createElement("br", null), "For a more powerful, multi-column, saveable search with a wide range of options, use ", React.createElement("i", null, "Advanced Search"), "."];
        let stringOperators = [Enums_1.LeafExpressionOperator.Contains, Enums_1.LeafExpressionOperator.StartsWith];
        let optionOperators = EnumExtensions_1.EnumExtensions.getNames(Enums_1.LeafExpressionOperator).filter(name => stringOperators.find(s => s == name) != null).map((stringOperatorName) => {
            return React.createElement("option", { key: stringOperatorName, value: stringOperatorName }, ExpressionHelper_1.ExpressionHelper.OperatorToShortFriendlyString(stringOperatorName));
        });
        let DisplayActions = EnumExtensions_1.EnumExtensions.getNames(Enums_1.DisplayAction).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, this.getTextForDisplayAction(enumName));
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyNames.QuickSearchStrategyName, bsStyle: "primary", glyphicon: StrategyGlyphs.QuickSearchGlyph, infoBody: infoBody },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Panel, { header: "Search For", bsStyle: "info" },
                        React.createElement(AdaptableBlotterFormControlTextClear_1.AdaptableBlotterFormControlTextClear, { cssClassName: cssClassName, type: "text", placeholder: "Quick Search Text", value: this.state.EditedQuickSearchText, OnTextChange: (x) => this.handleQuickSearchTextChange(x) }))),
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.Panel, { header: "Quick Search Options", eventKey: "1", bsStyle: "info" },
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineSearchOperator" },
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Operator:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.props.Operator.toString(), onChange: (x) => this.onStringOperatorChange(x) }, optionOperators)),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Quick Search: Operator", bodyText: [React.createElement("b", null, "Starts With:"), " Returns cells whose contents begin with the search text", React.createElement("br", null), React.createElement("br", null), React.createElement("b", null, "Contains:"), " Returns cells whose contents contain the search text anywhere."], MessageType: Enums_1.MessageType.Info }))),
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineSearchDisplay" },
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Behaviour:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.props.DisplayAction.toString(), onChange: (x) => this.onDisplayTypeChange(x) }, DisplayActions)),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Quick Search: Behaviour", bodyText: [React.createElement("b", null, "Highlight Cells Only:"), " Changes back colour of cells matching search text", React.createElement("br", null), React.createElement("br", null), React.createElement("b", null, "Show Matching Rows Only:"), " Only shows rows containing cells matching search text", React.createElement("br", null), React.createElement("br", null), React.createElement("b", null, "Highlight Cells and Show Matching Rows:"), " Only shows rows containing cells (which are also coloured) matching search text"], MessageType: Enums_1.MessageType.Info }))),
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "colorBackStyle" },
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Set Back Colour:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(react_bootstrap_1.Checkbox, { value: "existing", checked: this.props.QuickSearchStyle.BackColor ? true : false, onChange: (e) => this.onUseBackColorCheckChange(e) })),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 }, this.props.QuickSearchStyle.BackColor != null &&
                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.props.QuickSearchStyle.BackColor, onChange: (x) => this.onBackColorSelectChange(x) }))),
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "colorForeStyle" },
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Set Fore Colour:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(react_bootstrap_1.Checkbox, { value: "existing", checked: this.props.QuickSearchStyle.ForeColor ? true : false, onChange: (e) => this.onUseForeColorCheckChange(e) })),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 }, this.props.QuickSearchStyle.ForeColor != null &&
                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.props.QuickSearchStyle.ForeColor, onChange: (x) => this.onForeColorSelectChange(x) })))))));
    }
    getTextForDisplayAction(displayAction) {
        switch (displayAction) {
            case Enums_1.DisplayAction.HighlightCell:
                return "Highlight Cells Only";
            case Enums_1.DisplayAction.ShowRow:
                return "Show Matching Rows Only";
            case Enums_1.DisplayAction.ShowRowAndHighlightCell:
                return "Highlight Cells & Show Matching Rows";
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        Operator: state.QuickSearch.Operator,
        DisplayAction: state.QuickSearch.DisplayAction,
        QuickSearchStyle: state.QuickSearch.Style,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onRunQuickSearch: (quickSearchText) => dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText)),
        onSetSearchOperator: (searchOperator) => dispatch(QuickSearchRedux.QuickSearchSetOperator(searchOperator)),
        onSetSearchDisplayType: (searchDisplayType) => dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType)),
        onSetStyle: (style) => dispatch(QuickSearchRedux.QuickSearchSetStyle(style)),
    };
}
exports.QuickSearchPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QuickSearchPopupComponent);
