"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const CellRendererRedux = require("../../Redux/ActionsReducers/CellRendererRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const Helper_1 = require("../../Core/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const CellRendererWizard_1 = require("./Wizard/CellRendererWizard");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const CellRendererEntityRow_1 = require("./CellRendererEntityRow");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class CellRendererPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 };
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newPercentRender = ObjectFactory_1.ObjectFactory.CreateEmptyPercentCellRenderer();
                newPercentRender.ColumnId = arrayParams[1];
                this.onEdit(-1, newPercentRender);
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editPercentRender = this.props.PercentCellRenderers.find(x => x.ColumnId == arrayParams[1]);
                let index = this.props.PercentCellRenderers.findIndex(x => x.ColumnId == editPercentRender.ColumnId);
                this.onEdit(index, editPercentRender);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__cellRenderer";
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
        let CellRendererItems = this.props.PercentCellRenderers.map((percentCellRenderer, index) => {
            let column = this.props.Columns.find(c => c.ColumnId == percentCellRenderer.ColumnId);
            return React.createElement(CellRendererEntityRow_1.CellRendererEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: percentCellRenderer, Column: column, Columns: this.props.Columns, UserFilters: this.props.UserFilters, ColorPalette: this.props.ColorPalette, Index: index, onEdit: (index, object) => this.onEdit(index, percentCellRenderer), onShare: () => this.props.onShare(percentCellRenderer), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: CellRendererRedux.CellRendererDelete(index), onPositiveColorChanged: (percentCellRenderer, positiveColor) => this.props.onPositiveColorChanged(percentCellRenderer, positiveColor), onNegativeColorChanged: (percentCellRenderer, negativeColor) => this.props.onNegativeColorChanged(percentCellRenderer, negativeColor) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Cell Renderer ", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.CellRendererStrategyName, bsStyle: "primary", cssClassName: cssClassName, button: newButton, glyphicon: StrategyConstants.CellRendererGlyph, infoBody: infoBody },
                CellRendererItems.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: CellRendererItems }),
                CellRendererItems.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating s for valid cell edits."),
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(CellRendererWizard_1.CellRendererWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, Blotter: this.props.Blotter, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ColorPalette: this.props.ColorPalette, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyPercentCellRenderer(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
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
        this.props.onAddEditCellRenderer(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let cellRenderer = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(cellRenderer.ColumnId);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        PercentCellRenderers: state.CellRenderer.PercentCellRenderers
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddEditCellRenderer: (index, percentCellRenderer) => dispatch(CellRendererRedux.CellRendererAddUpdate(index, percentCellRenderer)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellRendererStrategyId)),
        onPositiveColorChanged: (percentCellRenderer, positiveColor) => dispatch(CellRendererRedux.CellRendererChangePositiveColor(percentCellRenderer, positiveColor)),
        onNegativeColorChanged: (percentCellRenderer, negativeColor) => dispatch(CellRendererRedux.CellRendererChangeNegativeColor(percentCellRenderer, negativeColor))
    };
}
exports.CellRendererPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellRendererPopupComponent);
