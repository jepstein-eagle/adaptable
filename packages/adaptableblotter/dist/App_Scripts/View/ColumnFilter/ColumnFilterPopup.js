"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const FilterRedux = require("../../Redux/ActionsReducers/FilterRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const ColumnFilterEntityRow_1 = require("./ColumnFilterEntityRow");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
class ColumnFilterPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedUserFilter: null, WizardStartIndex: 0 };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__columnfilter";
        let infoBody = ["Column Filters are set using the filter dropdown in the column header menu.", React.createElement("br", null), React.createElement("br", null),
            "This popup allows you to see which columns have filters applied with an option to clear them."];
        let colItems = [
            { Content: "Column", Size: 3 },
            { Content: "Filter", Size: 7 },
            { Content: "", Size: 2 },
        ];
        let columnFilterItems = this.props.ColumnFilters.map((columnFilter, index) => {
            return React.createElement(ColumnFilterEntityRow_1.ColumnFilterEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: null, ColumnFilter: columnFilter, Columns: this.props.Columns, UserFilters: this.props.UserFilters, Index: index, onEdit: null, onDeleteConfirm: null, onClear: () => this.props.onClearColumnFilter(columnFilter), onSaveColumnFilterasUserFilter: () => this.onSaveColumnFilterasUserFilter(columnFilter) });
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyNames.ColumnFilterStrategyName, bsStyle: "primary", className: "ab_main_popup", infoBody: infoBody, glyphicon: StrategyGlyphs.ColumnFilterGlyph },
                columnFilterItems.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: columnFilterItems }),
                columnFilterItems.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "There are currently no column filters applied.  Create column filters by using the filter dropdown in each column header.")));
    }
    onSaveColumnFilterasUserFilter(columnFilter) {
        let prompt = {
            PromptTitle: "Enter name for User Filter",
            PromptMsg: "Please enter a user filter name",
            ConfirmAction: FilterRedux.CreateUserFilterFromColumnFilter(columnFilter, "")
        };
        this.props.onShowPrompt(prompt);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.Filter.ColumnFilters,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearColumnFilter: (columnFilter) => dispatch(FilterRedux.ColumnFilterClear(columnFilter)),
        onShowPrompt: (prompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}
exports.ColumnFilterPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterPopupComponent);
