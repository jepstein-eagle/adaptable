"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PercentBarWizard_1 = require("./Wizard/PercentBarWizard");
const PercentBarRedux = require("../../Redux/ActionsReducers/PercentBarRedux");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
class PercentBarSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__percentBar";
        let percentBar = this.props.PercentBars.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let percentBarIndex = this.props.PercentBars.findIndex(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let noPercentBar = percentBar == null;
        let percentBarRow;
        if (noPercentBar) {
            percentBarRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.PercentBarStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.PercentBarStrategyId, StrategySummary: "No Percnt Bar", onNew: () => this.onNew(), NewButtonTooltip: StrategyConstants.PercentBarStrategyName, AccessLevel: this.props.AccessLevel });
        }
        else {
            percentBarRow = React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.PercentBarStrategyName, cssClassName: this.props.cssClassName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.PercentBarStrategyId }), Item2: "Percent Bar set", ConfigEnity: percentBar, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.PercentBarStrategyName, onEdit: () => this.onEdit(percentBarIndex, percentBar), onShare: () => this.props.onShare(percentBar), onDelete: PercentBarRedux.PercentBarDelete(percentBarIndex), showBold: true });
        }
        return React.createElement("div", null,
            percentBarRow,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(PercentBarWizard_1.PercentBarWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ConfigEntities: this.props.PercentBars, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ColorPalette: this.props.ColorPalette, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard(), Blotter: this.props.Blotter }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, renderedColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(renderedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let percentBar = this.state.EditedAdaptableBlotterObject;
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditPercentBar(this.state.EditedAdaptableBlotterObjectIndex, percentBar);
        }
        else {
            this.props.onAddPercentBar(percentBar);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let percentBar = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId);
    }
}
exports.PercentBarSummaryComponent = PercentBarSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        PercentBars: state.PercentBar.PercentBars,
        ColorPalette: state.UserInterface.ColorPalette,
        Entitlements: state.Entitlements.FunctionEntitlements,
        StyleClassNames: state.UserInterface.StyleClassNames
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPercentBar: (PercentBar) => dispatch(PercentBarRedux.PercentBarAdd(PercentBar)),
        onEditPercentBar: (index, PercentBar) => dispatch(PercentBarRedux.PercentBarEdit(index, PercentBar)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId))
    };
}
exports.PercentBarSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PercentBarSummaryComponent);
