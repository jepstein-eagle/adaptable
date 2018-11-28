"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const react_bootstrap_2 = require("react-bootstrap");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../../Core/Enums");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class IPushPullDomainPageSelectorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { SelectedFolder: null, SelectedPage: null };
    }
    render() {
        let cssClassName = StyleConstants.PUSHPULL_PAGE_SELECTOR;
        let itemsElements = [];
        this.props.IPPDomainsPages.forEach(x => {
            // let itemsElements = this.props.IPPDomainsPages.map(x => {
            if (x.Name == this.state.SelectedFolder) {
                itemsElements.push(React.createElement(react_bootstrap_1.ListGroupItem, { key: x.Name, onClick: () => { this.UnSelectFolder(); }, value: x.Name },
                    React.createElement(react_bootstrap_2.Glyphicon, { glyph: "folder-open" }),
                    ' ',
                    x.Name));
                x.Pages.forEach((page) => {
                    itemsElements.push(React.createElement(react_bootstrap_1.ListGroupItem, { key: page, style: { paddingLeft: '30px' }, disabled: this.props.LiveReports.findIndex(x => x.WorkbookName == page) > -1, onClick: () => { this.SelectPage(page); }, active: this.state.SelectedPage == page, value: page },
                        React.createElement(react_bootstrap_2.Glyphicon, { glyph: "cloud-download" }),
                        ' ',
                        page));
                });
            }
            else {
                itemsElements.push(React.createElement(react_bootstrap_1.ListGroupItem, { key: x.Name, onClick: () => { this.SelectFolder(x.Name); }, value: x.Name },
                    React.createElement(react_bootstrap_2.Glyphicon, { glyph: "folder-close" }),
                    ' ',
                    x.Name));
            }
        });
        return React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "iPushPull Folder and Page Selector", bsStyle: "primary", glyphicon: "export" },
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? React.createElement(react_bootstrap_1.Alert, { bsStyle: StyleConstants.DANGER_BSSTYLE },
                "Error getting iPushPull Pages : ",
                this.props.ErrorMsg) : React.createElement(react_bootstrap_1.ListGroup, { fill: true, className: "ab_preview_panel" }, itemsElements),
            React.createElement(react_bootstrap_2.Button, { className: "ab_right_modal_button", onClick: () => { this.props.onCancel(); } },
                "Cancel ",
                React.createElement(react_bootstrap_2.Glyphicon, { glyph: "remove" })),
            React.createElement(react_bootstrap_2.Button, { disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.SelectedPage), className: "ab_right_modal_button", bsStyle: "primary", onClick: () => { this.props.onApplyExport(this.props.PopupParams, this.state.SelectedFolder, this.state.SelectedPage); } },
                React.createElement(react_bootstrap_2.Glyphicon, { glyph: "user" }),
                " Select"));
    }
    SelectFolder(folder) {
        this.setState({ SelectedFolder: folder });
    }
    SelectPage(page) {
        this.setState({ SelectedPage: page });
    }
    UnSelectFolder() {
        this.setState({ SelectedFolder: "", SelectedPage: "" });
    }
}
function mapStateToProps(state, ownProps) {
    return {
        IPPDomainsPages: state.Export.IPPDomainsPages,
        ErrorMsg: state.Export.ErrorMsg,
        LiveReports: state.System.CurrentLiveReports,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onApplyExport: (value, folder, page) => dispatch(ExportRedux.ExportApply(value, Enums_1.ExportDestination.iPushPull, folder, page)),
        onCancel: () => { dispatch(PopupRedux.PopupHideScreen()); dispatch(ExportRedux.ReportSetErrorMsg("")); }
    };
}
exports.IPushPullDomainPageSelector = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(IPushPullDomainPageSelectorComponent);
