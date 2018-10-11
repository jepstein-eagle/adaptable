"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
const react_bootstrap_1 = require("react-bootstrap");
const FormatColumnEntityRow_1 = require("./FormatColumnEntityRow");
const FormatColumnWizard_1 = require("./Wizard/FormatColumnWizard");
const Helper_1 = require("../../Core/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const UIHelper_1 = require("../UIHelper");
class FormatColumnPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 };
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newFormatColumn = ObjectFactory_1.ObjectFactory.CreateEmptyFormatColumn();
                newFormatColumn.ColumnId = arrayParams[1];
                this.onEdit(newFormatColumn);
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editFormatColumn = this.props.FormatColumns.find(x => x.ColumnId == arrayParams[1]);
                this.onEdit(editFormatColumn);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__formatcolumn";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__formatcolumn";
        let infoBody = ["Format a column so it styles with the colours and font properties that you provide.", React.createElement("br", null), React.createElement("br", null), "Unlike Conditional Styles the column is ", React.createElement("b", null, "always"), " formatted as set and is not dependent on a rule being met."];
        let colItems = [
            { Content: "Column", Size: 3 },
            { Content: "Format Style", Size: 5 },
            { Content: "", Size: 3 },
        ];
        let FormatColumns = this.props.FormatColumns.map((formatColumn, index) => {
            return React.createElement(FormatColumnEntityRow_1.FormatColumnEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: formatColumn, Columns: this.props.Columns, UserFilters: null, Index: index, onEdit: (index, x) => this.onEdit(formatColumn), onShare: () => this.props.onShare(formatColumn), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: FormatColumnRedux.FormatColumnDelete(formatColumn) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Format Column", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstantsFormatColumnStrategyName, button: newButton, bsStyle: "primary", className: "ab_main_popup", glyphicon: StrategyConstantsFormatColumnGlyph, infoBody: infoBody },
                this.props.FormatColumns.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create a new column format."),
                FormatColumns.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: FormatColumns }),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(FormatColumnWizard_1.FormatColumnWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ModalContainer: this.props.ModalContainer, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Columns: this.props.Columns, Blotter: this.props.Blotter, ConfigEntities: this.props.FormatColumns, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyFormatColumn(), WizardStartIndex: 0 });
    }
    onEdit(formatColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(formatColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }
    onFinishWizard() {
        let formatColumn = this.state.EditedAdaptableBlotterObject;
        if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
            this.props.onEditFormatColumn(formatColumn);
        }
        else {
            this.props.onAddFormatColumn(formatColumn);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }
    canFinishWizard() {
        let formatColumn = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(formatColumn.Style);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        FormatColumns: state.FormatColumn.FormatColumns,
        StyleClassNames: state.UserInterface.StyleClassNames
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFormatColumn: (formatColumn) => dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn)),
        onEditFormatColumn: (formatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FormatColumnStrategyId))
    };
}
exports.FormatColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormatColumnPopupComponent);
