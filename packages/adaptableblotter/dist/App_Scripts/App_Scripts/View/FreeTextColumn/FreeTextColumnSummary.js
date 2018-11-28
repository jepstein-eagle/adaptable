"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Core/Helpers/Helper");
const FreeTextColumnWizard_1 = require("./Wizard/FreeTextColumnWizard");
const FreeTextColumnRedux = require("../../Redux/ActionsReducers/FreeTextColumnRedux");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class FreeTextColumnSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__FreeTextcolumn";
        let freeTextColumn = this.props.FreeTextColumns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let noFreeTextColumn = freeTextColumn == null;
        let FreeTextColumnRow;
        if (noFreeTextColumn) {
            FreeTextColumnRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.FreeTextColumnStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.FreeTextColumnStrategyId, StrategySummary: "No FreeText Column Set", onNew: () => this.onNew(), NewButtonTooltip: StrategyConstants.FreeTextColumnStrategyName, AccessLevel: this.props.AccessLevel });
        }
        else {
            let index = this.props.FreeTextColumns.findIndex(ftc => ftc.ColumnId == this.props.SummarisedColumn.ColumnId);
            FreeTextColumnRow = React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.FreeTextColumnStrategyName, cssClassName: this.props.cssClassName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.FreeTextColumnStrategyId }), Item2: freeTextColumn.ColumnId, ConfigEnity: freeTextColumn, showShare: this.props.TeamSharingActivated, EntityName: StrategyConstants.FreeTextColumnStrategyName, onEdit: () => this.onEdit(index, freeTextColumn), onShare: () => this.props.onShare(freeTextColumn), onDelete: FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn), showBold: true });
        }
        return React.createElement("div", null,
            FreeTextColumnRow,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(FreeTextColumnWizard_1.FreeTextColumnWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.FreeTextColumns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard(), Blotter: this.props.Blotter }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, FreeTextColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(FreeTextColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let FreeTextColumn = this.state.EditedAdaptableBlotterObject;
        if (this.props.FreeTextColumns.find(x => x.ColumnId == FreeTextColumn.ColumnId)) {
            this.props.onEditFreeTextColumn(FreeTextColumn);
        }
        else {
            this.props.onAddFreeTextColumn(FreeTextColumn);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let FreeTextColumn = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(FreeTextColumn.ColumnId);
    }
}
exports.FreeTextColumnSummaryComponent = FreeTextColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddFreeTextColumn: (FreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
        onEditFreeTextColumn: (index, FreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnEdit(index, FreeTextColumn)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FreeTextColumnStrategyId))
    };
}
exports.FreeTextColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FreeTextColumnSummaryComponent);
