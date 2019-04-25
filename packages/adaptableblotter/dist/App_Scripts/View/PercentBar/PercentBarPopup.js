"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const PercentBarRedux = require("../../Redux/ActionsReducers/PercentBarRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const PercentBarWizard_1 = require("./Wizard/PercentBarWizard");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const PercentBarEntityRow_1 = require("./PercentBarEntityRow");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const Enums_1 = require("../../Utilities/Enums");
class PercentBarPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 };
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let columnId = arrayParams[1];
                let distinctColumnsValues = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columnId, Enums_1.DistinctCriteriaPairValue.RawValue, false).map(pair => {
                    return pair.RawValue;
                });
                let newPercentRender = ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar();
                newPercentRender.ColumnId = columnId;
                newPercentRender.MinValue = Math.min(...distinctColumnsValues);
                newPercentRender.MaxValue = Math.max(...distinctColumnsValues);
                this.onEdit(-1, newPercentRender);
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editPercentRender = this.props.PercentBars.find(x => x.ColumnId == arrayParams[1]);
                let index = this.props.PercentBars.findIndex(x => x.ColumnId == editPercentRender.ColumnId);
                this.onEdit(index, editPercentRender);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__percentBar";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__percentBar";
        let infoBody = ["Use Percent Bars to render numeric columns with a coloured bar, the length of which is dependent on the column value", React.createElement("br", null), React.createElement("br", null),
            "For each Percent Bar you can select the colours and range boundaries."];
        let colItems = [
            { Content: "Column", Size: 2 },
            { Content: "Min", Size: 2 },
            { Content: "Max", Size: 2 },
            { Content: "Positive", Size: 2 },
            { Content: "Negative", Size: 2 },
            { Content: "", Size: 2 },
        ];
        let PercentBarItems = this.props.PercentBars.map((PercentBar, index) => {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(PercentBar.ColumnId, this.props.Columns);
            return React.createElement(PercentBarEntityRow_1.PercentBarEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: PercentBar, Column: column, Columns: this.props.Columns, UserFilters: this.props.UserFilters, ColorPalette: this.props.ColorPalette, Index: index, onEdit: (index, object) => this.onEdit(index, PercentBar), onShare: () => this.props.onShare(PercentBar), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: PercentBarRedux.PercentBarDelete(index), onMinimumValueChanged: (PercentBar, minimumValue) => this.props.onMinimumValueChanged(PercentBar, minimumValue), onMaximumValueChanged: (PercentBar, maximumValue) => this.props.onMaximumValueChanged(PercentBar, maximumValue), onPositiveColorChanged: (PercentBar, positiveColor) => this.props.onPositiveColorChanged(PercentBar, positiveColor), onNegativeColorChanged: (PercentBar, negativeColor) => this.props.onNegativeColorChanged(PercentBar, negativeColor) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Percent Bar ", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.PercentBarStrategyName, bsStyle: "primary", cssClassName: cssClassName, button: newButton, glyphicon: StrategyConstants.PercentBarGlyph, infoBody: infoBody },
                PercentBarItems.length > 0 ?
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: PercentBarItems })
                    :
                        React.createElement("div", null,
                            React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating Percent Bars."),
                            React.createElement(react_bootstrap_1.HelpBlock, null, "Visualise numeric columns as a bar (positive, negative or both) in order better to see their contents.")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(PercentBarWizard_1.PercentBarWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, Blotter: this.props.Blotter, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ColorPalette: this.props.ColorPalette, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }
    onEdit(index, renderedColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(renderedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let percentBar = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
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
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(percentBar.ColumnId) ||
            StringExtensions_1.StringExtensions.IsNullOrEmpty(percentBar.PositiveColor) ||
            StringExtensions_1.StringExtensions.IsNullOrEmpty(percentBar.NegativeColor)) {
            return false;
        }
        // we are not currently checking for columns - ok? or problem?
        return true;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        PercentBars: state.PercentBar.PercentBars
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPercentBar: (PercentBar) => dispatch(PercentBarRedux.PercentBarAdd(PercentBar)),
        onEditPercentBar: (Index, PercentBar) => dispatch(PercentBarRedux.PercentBarEdit(Index, PercentBar)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
        onMinimumValueChanged: (PercentBar, minimumValue) => dispatch(PercentBarRedux.PercentBarChangeMinimumValue(PercentBar, minimumValue)),
        onMaximumValueChanged: (PercentBar, maximumValue) => dispatch(PercentBarRedux.PercentBarChangeMaximumValue(PercentBar, maximumValue)),
        onPositiveColorChanged: (PercentBar, positiveColor) => dispatch(PercentBarRedux.PercentBarChangePositiveColor(PercentBar, positiveColor)),
        onNegativeColorChanged: (PercentBar, negativeColor) => dispatch(PercentBarRedux.PercentBarChangeNegativeColor(PercentBar, negativeColor))
    };
}
exports.PercentBarPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PercentBarPopupComponent);
