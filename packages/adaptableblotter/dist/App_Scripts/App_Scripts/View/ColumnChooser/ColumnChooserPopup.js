"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ColumnChooserRedux = require("../../Redux/ActionsReducers/ColumnChooserRedux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
class ColumnChooserPopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__columnchooser";
        let availableValues;
        let selectedValues;
        let masterChildren;
        if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(this.props.ColumnCategories)) {
            masterChildren = this.props.ColumnCategories.map(cc => {
                return {
                    Master: cc.ColumnCategoryId,
                    Children: cc.ColumnIds.map(ci => ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns))
                };
            });
        }
        availableValues = this.props.Columns.filter(x => !x.Visible).map(x => ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x));
        selectedValues = this.props.Columns.filter(x => x.Visible).map(x => ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x));
        let infoBody = ["Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.", React.createElement("br", null), React.createElement("br", null),
            "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.", React.createElement("br", null), React.createElement("br", null),
            "All changes made while using the Column Chooser are implemented in the Blotter immediately."];
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.ColumnChooserStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.ColumnChooserGlyph, infoBody: infoBody },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableValues, cssClassName: cssClassName, SelectedValues: selectedValues, HeaderAvailable: "Hidden Columns", HeaderSelected: "Visible Columns", MasterChildren: masterChildren, onChange: (SelectedValues) => this.ColumnListChange(SelectedValues) })));
    }
    ColumnListChange(columnList) {
        let cols = ColumnHelper_1.ColumnHelper.getColumnsFromFriendlyNames(columnList, this.props.Columns);
        this.props.onNewColumnListOrder(cols);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ColumnCategories: state.ColumnCategory.ColumnCategories,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onNewColumnListOrder: (VisibleColumnList) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}
exports.ColumnChooserPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnChooserPopupComponent);
