"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ChartEntityRow_1 = require("./ChartEntityRow");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const CategoryChartWizard_1 = require("./CategoryChart/Wizard/CategoryChartWizard");
const PieChartWizard_1 = require("./PieChart/Wizard/PieChartWizard");
const Enums_1 = require("../../Utilities/Enums");
class ChartPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
                let arrayParams = this.props.PopupParams.split("|");
                let action = arrayParams[0].trim();
                let chartType = arrayParams[1].trim(); // todo: use the enum...
                if (action == "New") {
                    this.onNew(chartType);
                }
                if (this.props.PopupParams == "Edit") {
                    let index = this.props.ChartDefinitions.findIndex(cd => cd.Name == this.props.CurrentChartDefinition.Name);
                    this.onEdit(index, this.props.CurrentChartDefinition);
                }
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Chart";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__Chart";
        let infoBody = ["Create Charts to view your grid data visually."];
        let colItems = [
            { Content: "Title", Size: 3 },
            { Content: "Subtitle", Size: 3 },
            { Content: "Type", Size: 2 },
            { Content: "Show", Size: 1 },
            { Content: "", Size: 3 },
        ];
        let Charts = this.props.ChartDefinitions.map((Chart, index) => {
            return React.createElement(ChartEntityRow_1.ChartEntityRow, { cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: Chart, key: Chart.Name, Index: index, onEdit: (index, Chart) => this.onEdit(index, Chart), TeamSharingActivated: this.props.TeamSharingActivated, onShare: () => this.props.onShare(Chart), onDeleteConfirm: ChartRedux.ChartDefinitionDelete(Chart), onShowChart: (chartName) => this.onShowChart(chartName), AccessLevel: this.props.AccessLevel });
        });
        let categoryChartMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.onNew(ChartEnums_1.ChartType.CategoryChart), key: "categoryChart" }, "Category Chart");
        let pieChartMenuItem = React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.onNew(ChartEnums_1.ChartType.PieChart), key: "pieChart" }, "Pie Chart");
        // we need to make this a button type...
        const plusGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "exportOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                "Create New Chart Definition") },
            React.createElement("span", null,
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: 'plus' }),
                ' ',
                'New',
                " "));
        let dropdownButton = React.createElement(react_bootstrap_1.DropdownButton, { style: { marginLeft: "5px" }, bsSize: 'small', bsStyle: StyleConstants.INFO_BSSTYLE, title: plusGlyph, id: "chartDropdown" },
            categoryChartMenuItem,
            pieChartMenuItem);
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(ChartEnums_1.ChartType.CategoryChart), overrideTooltip: "Create Chart Definition", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        let editedChartDefinition = this.state.EditedAdaptableBlotterObject;
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.ChartStrategyName, className: "ab_main_popup", infoBody: infoBody, button: dropdownButton, bsStyle: "primary", glyphicon: StrategyConstants.ChartGlyph },
                Charts.length > 0 ?
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: Charts })
                    :
                        React.createElement(react_bootstrap_1.HelpBlock, null,
                            "Click 'New' to create a new Chart.",
                            React.createElement("br", null),
                            "Choose between Category and Pie Chart.",
                            React.createElement("br", null)),
                this.state.EditedAdaptableBlotterObject &&
                    React.createElement("div", null, editedChartDefinition.ChartType == ChartEnums_1.ChartType.CategoryChart ?
                        React.createElement(CategoryChartWizard_1.CategoryChartWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: editedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })
                        :
                            React.createElement(PieChartWizard_1.PieChartWizard, { cssClassName: cssClassName, EditedAdaptableBlotterObject: editedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: 0, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }))));
    }
    onShowChart(chartName) {
        this.props.onSelectChartDefinition(chartName);
        this.props.onShowChart();
    }
    onEdit(index, Chart) {
        //so we dont mutate original object
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(Chart), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onNew(chartType) {
        let emptyChartDefinition = (chartType == ChartEnums_1.ChartType.CategoryChart) ?
            ObjectFactory_1.ObjectFactory.CreateEmptyCategoryChartDefinition() :
            ObjectFactory_1.ObjectFactory.CreateEmptyPieChartDefinition();
        this.setState({ EditedAdaptableBlotterObject: emptyChartDefinition, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let index = this.state.EditedAdaptableBlotterObjectIndex;
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateChartDefinition(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        let currentChartIndex = (this.props.CurrentChartDefinition == null) ?
            -1 :
            this.props.ChartDefinitions.findIndex(as => as.Name == this.props.CurrentChartDefinition.Name);
        if (index == -1 || index == currentChartIndex) {
            // its new so make it the new chart or we are editing the current chart (but might have changed the title)
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
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Name == state.Chart.CurrentChartName),
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ChartStrategyId))
    };
}
exports.ChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
