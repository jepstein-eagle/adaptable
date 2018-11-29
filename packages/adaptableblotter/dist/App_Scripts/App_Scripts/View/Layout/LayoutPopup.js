"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const LayoutRedux = require("../../Redux/ActionsReducers/LayoutRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const LayoutWizard_1 = require("./Wizard/LayoutWizard");
const LayoutEntityRow_1 = require("./LayoutEntityRow");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../../Utilities/Enums");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
class LayoutPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew();
        }
        // dont think we will ever let you an edit a layout this way - only create and then save what is currently in the grid.
        //   if (this.props.PopupParams == "Edit") {
        //       let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName)
        //       if (currentLayout) {
        ///          this.onEdit(currentLayout)
        //     }
        //  }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__layout";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__layout";
        let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName);
        let infoBody = ["Create layouts - groups of column order, visibility and sorts.", React.createElement("br", null), React.createElement("br", null),
            "You can create as many layouts as you wish."];
        let colItems = [
            { Content: "Current", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Details", Size: 7 },
            { Content: "", Size: 2 },
        ];
        let LayoutRows = this.props.Layouts.filter(l => l.Name != GeneralConstants.DEFAULT_LAYOUT).map((x, index) => {
            return React.createElement(LayoutEntityRow_1.LayoutEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, IsCurrentLayout: x.Name == this.props.CurrentLayoutName, AdaptableBlotterObject: x, Columns: this.props.Columns, UserFilters: this.props.UserFilters, Index: index, onEdit: (index, x) => this.onEdit(index, x), onShare: () => this.props.onShare(x), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: LayoutRedux.LayoutDelete(x.Name), onSelect: () => this.props.onSelectLayout(x.Name) });
        });
        let newSearchButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create New Advanced Search", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, bsStyle: "primary", headerText: StrategyConstants.LayoutStrategyName, infoBody: infoBody, button: newSearchButton, glyphicon: StrategyConstants.LayoutGlyph, className: "ab_main_popup" },
                LayoutRows.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: LayoutRows }),
                LayoutRows.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating layouts.")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(LayoutWizard_1.LayoutWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.Layouts, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, GridSorts: this.props.GridSorts, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateLayout([], [], null, ""), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, layout) {
        let clonedObject = Helper_1.Helper.cloneObject(layout);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        let layoutNameChanged = this.state.EditedAdaptableBlotterObjectIndex == -1;
        if (this.state.EditedAdaptableBlotterObjectIndex > -1) {
            let previousLayout = this.props.Layouts[this.state.EditedAdaptableBlotterObjectIndex + 1];
            layoutNameChanged = previousLayout.Name == this.props.CurrentLayoutName;
        }
        // note: add 1 to index if editing because default layout not included in collection
        let index = (this.state.EditedAdaptableBlotterObjectIndex > -1) ? this.state.EditedAdaptableBlotterObjectIndex + 1 : this.state.EditedAdaptableBlotterObjectIndex;
        this.props.onPreSaveLayout(index, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        if (layoutNameChanged) { // its new so make it the selected layout or name has changed.
            this.props.onSelectLayout(clonedObject.Name);
        }
    }
    canFinishWizard() {
        let layout = this.state.EditedAdaptableBlotterObject;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(layout.GridSorts)) {
            let canFinish = true;
            layout.GridSorts.forEach(gs => {
                if (StringExtensions_1.StringExtensions.IsNullOrEmpty(gs.Column) || gs.SortOrder == Enums_1.SortOrder.Unknown) {
                    canFinish = false;
                }
            });
            if (!canFinish) {
                return false;
            }
        }
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(layout.Name) &&
            ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(layout.Columns);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        Layouts: state.Layout.Layouts,
        CurrentLayoutName: state.Layout.CurrentLayout,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onPreSaveLayout: (index, layout) => dispatch(LayoutRedux.LayoutPreSave(index, layout)),
        onSelectLayout: (selectedSearchName) => dispatch(LayoutRedux.LayoutSelect(selectedSearchName)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LayoutStrategyId))
    };
}
exports.LayoutPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);
