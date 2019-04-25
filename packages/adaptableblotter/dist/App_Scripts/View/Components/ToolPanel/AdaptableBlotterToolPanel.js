"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _ = require("lodash");
const QuickSearchRedux = require("../../../Redux/ActionsReducers/QuickSearchRedux");
const react_redux_1 = require("react-redux");
const react_dom_1 = require("react-dom");
const AdaptableBlotterFormControlTextClear_1 = require("../Forms/AdaptableBlotterFormControlTextClear");
const ButtonMinimise_1 = require("../Buttons/ButtonMinimise");
const ButtonMaximise_1 = require("../Buttons/ButtonMaximise");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants_1 = require("../../../Utilities/Constants/StyleConstants");
const ToolPanelSettingsPanel_1 = require("../Panels/ToolPanelSettingsPanel");
class AdaptableBlotterToolPanelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 0);
        this.state = {
            EditedQuickSearchText: this.props.QuickSearchText,
            QuickSearchShowPanel: false,
            QuickSearchShowSettings: false
        };
        // we got agGrid api from props
        // console.log(this.props.api);
        // console.log(this.props);
    }
    render() {
        let minimiseQuickSearchButton = React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: '', size: "xs", bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, DisplayMode: "Glyph", hideToolTip: true, style: { float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }, onClick: () => this.onMinimiseQuickSearch() });
        let maximiseQuickSearchButton = React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: '', size: "xs", bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, DisplayMode: "Glyph", hideToolTip: true, useHoirzontalChevron: true, style: { float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }, onClick: () => this.onMaximiseQuickSearch() });
        let showGeneralSettingsButton = this.state.QuickSearchShowSettings ?
            React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: '', style: { margin: '0px', padding: '0px' }, onClick: () => this.onHideQuickSearchSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: true })
            :
                React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: '', style: { margin: '0px', padding: '0px' }, onClick: () => this.onShowQuickSearchSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: true });
        let settingsPanel = React.createElement(ToolPanelSettingsPanel_1.ToolPanelSettingsPanel, { button: showGeneralSettingsButton }, this.state.QuickSearchShowSettings == true &&
            React.createElement("span", null, "stuff here"));
        return React.createElement("div", null,
            React.createElement("span", null, " Adaptable Blotter"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("div", null, this.state.QuickSearchShowPanel ?
                React.createElement("div", null,
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 12 },
                            minimiseQuickSearchButton,
                            "Quick Search")),
                    React.createElement(react_bootstrap_1.Row, { style: { margin: '1px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 12 },
                            React.createElement(AdaptableBlotterFormControlTextClear_1.AdaptableBlotterFormControlTextClear, { cssClassName: "", bsSize: 'sm', type: "text", placeholder: "Search Text", value: this.props.QuickSearchText, OnTextChange: (x) => this.onUpdateQuickSearchText(x) }))),
                    React.createElement(react_bootstrap_1.Row, { style: { margin: '2px', marginTop: '10px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 12 },
                            " ",
                            settingsPanel)))
                :
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 12 },
                            maximiseQuickSearchButton,
                            "Quick Search"))));
    }
    onUpdateQuickSearchText(searchText) {
        this.setState({ EditedQuickSearchText: searchText });
        this.debouncedRunQuickSearch();
    }
    onMinimiseQuickSearch() {
        this.setState({ QuickSearchShowPanel: false });
    }
    onMaximiseQuickSearch() {
        this.setState({ QuickSearchShowPanel: true });
    }
    onShowQuickSearchSettings() {
        this.setState({ QuickSearchShowSettings: true, });
    }
    onHideQuickSearchSettings() {
        this.setState({ QuickSearchShowSettings: false, });
    }
}
function mapStateToProps(state, ownProps) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onRunQuickSearch: (newQuickSearchText) => dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
    };
}
exports.ConnectedAdaptableBlotterToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterToolPanelComponent);
exports.AdaptableBlotterToolPanelBuilder = (ctx) => class AdaptableBlotterToolPanel {
    constructor() {
        this.ctx = ctx;
    }
    init(params) {
        this.gui = document.createElement('div');
        this.gui.id = 'adaptable-blotter-tool-panel_' + this.ctx.Blotter.blotterOptions.blotterId;
        react_dom_1.render((React.createElement(react_redux_1.Provider, { store: this.ctx.Blotter.adaptableBlotterStore.TheStore },
            React.createElement(exports.ConnectedAdaptableBlotterToolPanel, { Blotter: this.ctx.Blotter, TeamSharingActivated: false }))), this.gui);
        if (params && params.api) {
            params.api.addEventListener('modelUpdated', (newModel) => {
                //    console.log('Model updated', newModel);
            });
        }
    }
    getGui() {
        if (!this.gui) {
            this.init();
        }
        return this.gui;
    }
    refresh() {
        // no refresh logic needed
    }
};
