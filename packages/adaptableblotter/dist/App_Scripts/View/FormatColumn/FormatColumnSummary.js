"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Core/Helpers/Helper");
const FormatColumnWizard_1 = require("./Wizard/FormatColumnWizard");
const FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const StyleVisualItem_1 = require("../Components/StyleVisualItem");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class FormatColumnSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__formatcolumn";
        let formatColumn = this.props.FormatColumns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let noFormatColumn = formatColumn == null;
        let formatColumnRow;
        if (noFormatColumn) {
            formatColumnRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyIds.FormatColumnStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyIds.FormatColumnStrategyId, StrategySummary: "No Format Column Set", onNew: () => this.onNew(), NewButtonTooltip: StrategyIds.FormatColumnStrategyName });
        }
        else {
            formatColumnRow = React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyIds.FormatColumnStrategyName, cssClassName: this.props.cssClassName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyIds.FormatColumnStrategyId }), Item2: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: formatColumn.Style }), ConfigEnity: formatColumn, showShare: this.props.TeamSharingActivated, EntityName: StrategyIds.FormatColumnStrategyName, onEdit: () => this.onEdit(formatColumn), onShare: () => this.props.onShare(formatColumn), onDelete: FormatColumnRedux.FormatColumnDelete(formatColumn), showBold: true });
        }
        return React.createElement("div", null,
            formatColumnRow,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(FormatColumnWizard_1.FormatColumnWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.FormatColumns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard(), Blotter: this.props.Blotter }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyFormatColumn();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(formatColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(formatColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1 });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let formatColumn = this.state.EditedAdaptableBlotterObject;
        if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
            this.props.onEditFormatColumn(formatColumn);
        }
        else {
            this.props.onAddFormatColumn(formatColumn);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let formatColumn = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(formatColumn.Style);
    }
}
exports.FormatColumnSummaryComponent = FormatColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        FormatColumns: state.FormatColumn.FormatColumns,
        ColorPalette: state.UserInterface.ColorPalette,
        StyleClassNames: state.UserInterface.StyleClassNames
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFormatColumn: (FormatColumn) => dispatch(FormatColumnRedux.FormatColumnAdd(FormatColumn)),
        onEditFormatColumn: (FormatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit(FormatColumn)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.FormatColumnStrategyId))
    };
}
exports.FormatColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormatColumnSummaryComponent);
