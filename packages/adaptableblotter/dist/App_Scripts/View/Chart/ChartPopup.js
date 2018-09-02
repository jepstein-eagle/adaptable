"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const Helper_1 = require("../../Core/Helpers/Helper");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const ChartEntityRow_1 = require("./ChartEntityRow");
const ChartWizard_1 = require("./Wizard/ChartWizard");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class ChartPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            if (this.props.PopupParams == "New") {
                this.onNew();
            }
            if (this.props.PopupParams == "Edit") {
                let editChart = this.props.ChartDefinitions.find(x => x.Name == this.props.CurrentChartName);
                if (editChart) {
                    let index = this.props.ChartDefinitions.findIndex(cd => cd.Name == editChart.Name);
                    this.onEdit(index, editChart);
                }
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Chart";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__Chart";
        let infoBody = ["Use Charts to see youyr grid data visually."];
        let colItems = [
            { Content: "Name", Size: 4 },
            { Content: "Type", Size: 4 },
            { Content: "Show", Size: 1 },
            { Content: "", Size: 3 },
        ];
        let Charts = this.props.ChartDefinitions.map((Chart, index) => {
            return React.createElement(ChartEntityRow_1.ChartEntityRow, { cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: Chart, key: Chart.Name, Index: index, onEdit: (index, Chart) => this.onEdit(index, Chart), TeamSharingActivated: this.props.TeamSharingActivated, onShare: () => this.props.onShare(Chart), onDeleteConfirm: ChartRedux.ChartDefinitionDelete(Chart), onShowChart: (chartName) => this.onShowChart(chartName) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Chart Definition", DisplayMode: "Glyph+Text", size: "small" });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyNames.ChartStrategyName, className: "ab_main_popup", infoBody: infoBody, button: newButton, bsStyle: "primary", glyphicon: StrategyGlyphs.ChartGlyph },
                Charts.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: Charts }),
                Charts.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create a bespoke sort order for a selected column."),
                this.state.EditedAdaptableBlotterObject &&
                    React.createElement(ChartWizard_1.ChartWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onShowChart(chartName) {
        this.props.onSelectChartDefinition(chartName);
        this.props.onShowChart();
    }
    onEdit(index, Chart) {
        //so we dont mutate original object
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(Chart), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyChartDefinition(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let searchIndex = this.state.EditedAdaptableBlotterObjectIndex;
        let currentSearchIndex = this.props.ChartDefinitions.findIndex(as => as.Name == this.props.CurrentChartName);
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateChartDefinition(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        if (searchIndex == -1 || searchIndex == currentSearchIndex) { // its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectChartDefinition(clonedObject.Name);
        }
    }
    canFinishWizard() {
        let Chart = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(Chart.Name);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartName: state.Chart.CurrentChartName
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (selectedChartDefinitionName) => dispatch(ChartRedux.ChartDefinitionSelect(selectedChartDefinitionName)),
        onShowChart: () => dispatch(PopupRedux.PopupShowChart()),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ChartStrategyId))
    };
}
exports.ChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
