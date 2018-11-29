"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ButtonSave_1 = require("../Components/Buttons/ButtonSave");
const ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const ButtonUndo_1 = require("../Components/Buttons/ButtonUndo");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../../Utilities/Enums");
class LayoutToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__layout";
        let nonDefaultLayouts = this.props.Layouts.filter(l => l.Name != GeneralConstants.DEFAULT_LAYOUT);
        let layoutEntity = nonDefaultLayouts.find(x => x.Name == this.props.CurrentLayout);
        let currentLayoutTitle = (layoutEntity) ?
            layoutEntity.Name :
            "Select a Layout";
        let availableLayouts = nonDefaultLayouts.filter(l => l.Name != currentLayoutTitle).map((layout, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onLayoutChanged(layout.Name) }, layout.Name);
        });
        if (this.isLayoutModified(layoutEntity)) {
            currentLayoutTitle += " (Modified)";
        }
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.DropdownButton, { disabled: availableLayouts.length == 0, style: { minWidth: "120px" }, className: cssClassName, bsSize: "small", bsStyle: "default", title: currentLayoutTitle, id: "layout" }, availableLayouts),
                this.props.CurrentLayout != GeneralConstants.DEFAULT_LAYOUT &&
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onLayoutChanged(GeneralConstants.DEFAULT_LAYOUT), size: "small", overrideTooltip: "Clear layout", overrideDisableButton: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }))),
            React.createElement("span", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ButtonSave_1.ButtonSave, { style: { marginLeft: "5px" }, cssClassName: cssClassName, onClick: () => this.onSave(), size: "small", overrideTooltip: "Save Changes to Current Layout", overrideDisableButton: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonNew_1.ButtonNew, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onNewLayout(), size: "small", overrideTooltip: "Create a new Layout", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonUndo_1.ButtonUndo, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onSelectLayout(this.props.CurrentLayout), size: "small", overrideTooltip: "Undo Layout Changes", overrideDisableButton: !currentLayoutTitle.endsWith(("(Modified)")), DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonDelete_1.ButtonDelete, { style: { marginLeft: "2px" }, cssClassName: cssClassName, size: "small", overrideTooltip: "Delete Layout", overrideDisableButton: this.props.CurrentLayout == GeneralConstants.DEFAULT_LAYOUT, DisplayMode: "Glyph", ConfirmAction: LayoutRedux.LayoutDelete(this.props.CurrentLayout), ConfirmationMsg: "Are you sure you want to delete '" + this.props.CurrentLayout + "'?", ConfirmationTitle: "Delete Layout", AccessLevel: this.props.AccessLevel })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.LayoutStrategyName, glyphicon: StrategyConstants.LayoutGlyph, onClose: () => this.props.onClose(StrategyConstants.LayoutStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    isLayoutModified(layoutEntity) {
        if (layoutEntity) {
            if (!ArrayExtensions_1.ArrayExtensions.areArraysEqualWithOrder(layoutEntity.Columns, this.props.Columns.filter(y => y.Visible).map(x => x.ColumnId))) {
                return true;
            }
            if (!ArrayExtensions_1.ArrayExtensions.areArraysEqualWithOrderandProperties(layoutEntity.GridSorts, this.props.GridSorts)) {
                return true;
            }
        }
        return false;
    }
    onLayoutChanged(layoutName) {
        this.props.onSelectLayout(layoutName);
    }
    onSelectedLayoutChanged(event) {
        let e = event.target;
        this.props.onSelectLayout(e.value);
    }
    onSave() {
        let currentLayoutObject = this.props.Layouts.find(l => l.Name == this.props.CurrentLayout);
        let gridState = (currentLayoutObject) ? currentLayoutObject.VendorGridInfo : null;
        let layoutToSave = ObjectFactory_1.ObjectFactory.CreateLayout(this.props.Columns.filter(c => c.Visible), this.props.GridSorts, gridState, this.props.CurrentLayout);
        let currentLayoutIndex = this.props.Layouts.findIndex(l => l.Name == this.props.CurrentLayout);
        if (currentLayoutIndex != -1) {
            this.props.onPreSaveLayout(currentLayoutIndex, layoutToSave);
        }
    }
    onUndo() {
        this.props.onSelectLayout(this.props.CurrentLayout);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentLayout: state.Layout.CurrentLayout,
        Layouts: state.Layout.Layouts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectLayout: (layoutName) => dispatch(LayoutRedux.LayoutSelect(layoutName)),
        onPreSaveLayout: (index, layout) => dispatch(LayoutRedux.LayoutPreSave(index, layout)),
        onNewLayout: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup, "New")),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.LayoutStrategyId, ScreenPopups.LayoutPopup))
    };
}
exports.LayoutToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LayoutToolbarControlComponent);
