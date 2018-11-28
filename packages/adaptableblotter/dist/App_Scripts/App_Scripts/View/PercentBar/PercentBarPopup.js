"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
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
const StyleConstants = require("../../Core/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class PercentBarPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 };
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newPercentRender = ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar();
                newPercentRender.ColumnId = arrayParams[1];
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
        let cssClassName = this.props.cssClassName + "__PercentBar";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";
        let infoBody = ["To Do."];
        let colItems = [
            { Content: "Column", Size: 3 },
            { Content: "Min", Size: 1 },
            { Content: "Max", Size: 1 },
            { Content: "Positive", Size: 2 },
            { Content: "Negative", Size: 2 },
            { Content: "", Size: 2 },
        ];
        let PercentBarItems = this.props.PercentBars.map((PercentBar, index) => {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(PercentBar.ColumnId, this.props.Columns);
            return React.createElement(PercentBarEntityRow_1.PercentBarEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: PercentBar, Column: column, Columns: this.props.Columns, UserFilters: this.props.UserFilters, ColorPalette: this.props.ColorPalette, Index: index, onEdit: (index, object) => this.onEdit(index, PercentBar), onShare: () => this.props.onShare(PercentBar), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: PercentBarRedux.PercentBarDelete(index), onPositiveColorChanged: (PercentBar, positiveColor) => this.props.onPositiveColorChanged(PercentBar, positiveColor), onNegativeColorChanged: (PercentBar, negativeColor) => this.props.onNegativeColorChanged(PercentBar, negativeColor) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Percent Bar ", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.PercentBarStrategyName, bsStyle: "primary", cssClassName: cssClassName, button: newButton, glyphicon: StrategyConstants.PercentBarGlyph, infoBody: infoBody },
                PercentBarItems.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: PercentBarItems }),
                PercentBarItems.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating s for valid cell edits."),
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).")),
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
        this.props.onAddEditPercentBar(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let PercentBar = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(PercentBar.ColumnId);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        PercentBars: state.PercentBar.PercentBars
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddEditPercentBar: (index, PercentBar) => dispatch(PercentBarRedux.PercentBarAddUpdate(index, PercentBar)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
        onPositiveColorChanged: (PercentBar, positiveColor) => dispatch(PercentBarRedux.PercentBarChangePositiveColor(PercentBar, positiveColor)),
        onNegativeColorChanged: (PercentBar, negativeColor) => dispatch(PercentBarRedux.PercentBarChangeNegativeColor(PercentBar, negativeColor))
    };
}
exports.PercentBarPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PercentBarPopupComponent);
