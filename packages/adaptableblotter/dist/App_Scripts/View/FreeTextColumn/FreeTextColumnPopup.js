"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const FreeTextColumnRedux = require("../../Redux/ActionsReducers/FreeTextColumnRedux");
const react_bootstrap_1 = require("react-bootstrap");
const FreeTextColumnEntityRow_1 = require("./FreeTextColumnEntityRow");
const FreeTextColumnWizard_1 = require("./Wizard/FreeTextColumnWizard");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
class FreeTextColumnPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 };
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editFreeTextColumn = this.props.FreeTextColumns.find(x => x.ColumnId == arrayParams[1]);
                let index = this.props.FreeTextColumns.indexOf(editFreeTextColumn);
                this.onEdit(index, editFreeTextColumn);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__FreeTextcolumn";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__FreeTextcolumn";
        let infoBody = ["A FreeText Column is one where you can insert any values you wish (e.g.comments).", React.createElement("br", null), React.createElement("br", null), "These values are stored with your settings and not with the rest of the data in the grid."];
        let colItems = [
            { Content: "Column", Size: 3 },
            { Content: "Default Value", Size: 4 },
            { Content: "No. Stored Value", Size: 3 },
            { Content: "", Size: 2 },
        ];
        let freeTextColumns = this.props.FreeTextColumns.map((FreeTextColumn, index) => {
            return React.createElement(FreeTextColumnEntityRow_1.FreeTextColumnEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: FreeTextColumn, Columns: this.props.Columns, UserFilters: null, Index: index, onEdit: () => this.onEdit(index, FreeTextColumn), onShare: () => this.props.onShare(FreeTextColumn), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: FreeTextColumnRedux.FreeTextColumnDelete(FreeTextColumn) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create FreeText Column", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.FreeTextColumnStrategyName, button: newButton, bsStyle: "primary", className: "ab_main_popup", glyphicon: StrategyConstants.FreeTextColumnGlyph, infoBody: infoBody },
                this.props.FreeTextColumns.length == 0 ?
                    React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to create a new column FreeText.")
                    :
                        React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: freeTextColumns }),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(FreeTextColumnWizard_1.FreeTextColumnWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Columns: this.props.Columns, Blotter: this.props.Blotter, ConfigEntities: this.props.FreeTextColumns, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, FreeTextColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(FreeTextColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }
    onFinishWizard() {
        let freeTextColumn = this.state.EditedAdaptableBlotterObject;
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditFreeTextColumn(this.state.EditedAdaptableBlotterObjectIndex, freeTextColumn);
        }
        else {
            this.props.onAddFreeTextColumn(freeTextColumn);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }
    canFinishWizard() {
        let freeTextColumn = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(freeTextColumn.ColumnId);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFreeTextColumn: (FreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
        onEditFreeTextColumn: (Index, FreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnEdit(Index, FreeTextColumn)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FreeTextColumnStrategyId))
    };
}
exports.FreeTextColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FreeTextColumnPopupComponent);
