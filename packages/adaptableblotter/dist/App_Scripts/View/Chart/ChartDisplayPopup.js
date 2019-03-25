"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const ButtonClose_1 = require("../Components/Buttons/ButtonClose");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const ButtonMaximise_1 = require("../Components/Buttons/ButtonMaximise");
const ButtonMinimise_1 = require("../Components/Buttons/ButtonMinimise");
const PanelWithIImageThreeButtons_1 = require("../Components/Panels/PanelWithIImageThreeButtons");
const CategoryChartWizard_1 = require("./CategoryChart/Wizard/CategoryChartWizard");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const CategoryChartComponent_1 = require("./CategoryChart/CategoryChartComponent");
const PieChartComponent_1 = require("./PieChart/PieChartComponent");
class ChartDisplayPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedChartDefinition: null };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
            this.state = { EditedChartDefinition: null };
        }
    }
    render() {
        // temp till do properly
        let currentChartType = this.props.CurrentChartDefinition.ChartType;
        let cssClassName = this.props.cssClassName + "__Charts";
        let closeButton = (this.props.ShowModal) ?
            null :
            React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.props.onClose(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let editButton = (this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Minimised) ?
            null :
            React.createElement(ButtonEdit_1.ButtonEdit, { cssClassName: cssClassName, style: { marginRight: "5px" }, onClick: () => this.onEditChart(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph+Text", overrideText: "Edit Chart", hideToolTip: true });
        let minmaxButton = (this.props.ShowModal) ?
            null :
            this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Minimised ?
                React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onChartMaximised(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true })
                :
                    React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onChartMinimised(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        // this is how we decide whether to show the chart...
        // let chartElement = (this.props.ChartVisibility == ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?
        return React.createElement("span", { className: cssClassName },
            React.createElement(PanelWithIImageThreeButtons_1.PanelWithImageThreeButtons, { cssClassName: cssClassName, header: StrategyConstants.ChartStrategyName, bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, style: { marginRight: '30px' }, glyphicon: StrategyConstants.ChartGlyph, secondButton: closeButton, firstButton: editButton, thirdButton: minmaxButton }, this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null &&
                React.createElement("div", null, currentChartType == ChartEnums_1.ChartType.CategoryChart ?
                    React.createElement(CategoryChartComponent_1.CategoryChartComponent, { CurrentChartDefinition: this.props.CurrentChartDefinition, ChartData: this.props.ChartData, ColorPalette: this.props.ColorPalette, Columns: this.props.Columns, cssClassName: this.props.cssClassName, onUpdateChartProperties: (chartTitle, chartProperties) => this.props.onUpdateChartProperties(chartTitle, chartProperties) })
                    :
                        React.createElement(PieChartComponent_1.PieChartComponent, { CurrentChartDefinition: this.props.CurrentChartDefinition, ChartData: this.props.ChartData, 
                            //   ColorPalette={this.props.ColorPalette}
                            //   Columns={this.props.Columns}
                            cssClassName: this.props.cssClassName }))),
            this.state.EditedChartDefinition &&
                React.createElement(CategoryChartWizard_1.CategoryChartWizard, { cssClassName: cssClassName, EditedAdaptableBlotterObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: 0, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onEditChart() {
        this.setState({ EditedChartDefinition: Helper_1.Helper.cloneObject(this.props.CurrentChartDefinition) });
    }
    onChartMinimised() {
        this.props.onSetChartVisibility(ChartEnums_1.ChartVisibility.Minimised);
    }
    onChartMaximised() {
        this.props.onSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised);
    }
    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }
    onFinishWizard() {
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedChartDefinition);
        let index = this.props.ChartDefinitions.findIndex(cd => cd.Name == this.state.EditedChartDefinition.Name);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject.Name);
    }
    canFinishWizard() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Name);
    }
}
function mapStateToProps(state) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Name == state.Chart.CurrentChartName),
        ChartData: state.System.ChartData,
        ChartVisibility: state.System.ChartVisibility,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onSetChartVisibility: (chartVisibility) => dispatch(SystemRedux.ChartSetChartVisibility(chartVisibility)),
        onUpdateChartProperties: (chartTitle, chartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),
    };
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
