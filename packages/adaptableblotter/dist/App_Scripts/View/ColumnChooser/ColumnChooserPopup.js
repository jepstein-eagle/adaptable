"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ColumnChooserRedux = require("../../Redux/ActionsReducers/ColumnChooserRedux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class ColumnChooserPopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__columnchooser";
        let infoBody = ["Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.", React.createElement("br", null), React.createElement("br", null),
            "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.", React.createElement("br", null), React.createElement("br", null),
            "All changes made while using the Column Chooser are implemented in the Blotter immediately."];
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstantsColumnChooserStrategyName, bsStyle: "primary", glyphicon: StrategyConstantsColumnChooserGlyph, infoBody: infoBody },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: this.props.Columns.filter(x => !x.Visible).map(x => ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x)), cssClassName: cssClassName, SelectedValues: this.props.Columns.filter(x => x.Visible).map(x => ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x)), HeaderAvailable: "Hidden Columns", HeaderSelected: "Visible Columns", onChange: (SelectedValues) => this.ColumnListChange(SelectedValues) })));
    }
    ColumnListChange(columnList) {
        let cols = ColumnHelper_1.ColumnHelper.getColumnsFromFriendlyNames(columnList, this.props.Columns);
        this.props.onNewColumnListOrder(cols);
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onNewColumnListOrder: (VisibleColumnList) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}
exports.ColumnChooserPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnChooserPopupComponent);
