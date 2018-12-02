"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const CalculatedColumnRedux = require("../../Redux/ActionsReducers/CalculatedColumnRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const CalculatedColumnWizard_1 = require("./Wizard/CalculatedColumnWizard");
const Enums_1 = require("../../Utilities/Enums");
const CalculatedColumnEntityRow_1 = require("./CalculatedColumnEntityRow");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
class CalculatedColumnPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            // only editing is possible - you cannot create a new calc column from the column menu
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let calculatedColumn = this.props.CalculatedColumns.find(x => x.ColumnId == arrayParams[1]);
                let index = this.props.CalculatedColumns.indexOf(calculatedColumn);
                this.onEdit(index, calculatedColumn);
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__calculatedcolumn";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__calculatedcolumn";
        let infoBody = ["Use Calculated Columns to create your own bespoke columns; the value of the column is an Expression which will update automatically in line with any columns it refers to.", React.createElement("br", null), React.createElement("br", null), "Once created, Calculated Columns are treated like any other column in the Grid."];
        let colItems = [
            { Content: "Column Name", Size: 3 },
            { Content: "Column Expression", Size: 7 },
            { Content: "", Size: 2 },
        ];
        let propCalculatedColumns = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.CalculatedColumns, "ColumnId");
        let calculatedColumns = propCalculatedColumns.map((calculatedColumn, index) => {
            // let index = this.props.CalculatedColumns.indexOf(calculatedColumn)
            return React.createElement(CalculatedColumnEntityRow_1.CalculatedColumnEntityRow, { cssClassName: cssClassName, Index: index, colItems: colItems, onShare: () => this.props.onShare(calculatedColumn), TeamSharingActivated: this.props.TeamSharingActivated, AdaptableBlotterObject: calculatedColumn, key: calculatedColumn.ColumnId, onEdit: (index, calculatedColumn) => this.onEdit(index, calculatedColumn), onDeleteConfirm: CalculatedColumnRedux.CalculatedColumnDelete(index) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { onClick: () => { this.onNew(); }, cssClassName: cssClassName, overrideTooltip: "Create Calculated Column", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.CalculatedColumnStrategyName, className: "ab_main_popup", infoBody: infoBody, button: newButton, bsStyle: "primary", glyphicon: StrategyConstants.CalculatedColumnGlyph },
                this.props.CalculatedColumns.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: calculatedColumns }),
                this.props.CalculatedColumns.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to create a new Calculated Column."),
                this.state.EditedAdaptableBlotterObject &&
                    React.createElement(CalculatedColumnWizard_1.CalculatedColumnWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.CalculatedColumns, Columns: this.props.Columns, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, GetErrorMessage: () => this.props.CalculatedColumnErrorMessage, IsExpressionValid: (expression) => this.props.IsExpressionValid(expression), Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyCalculatedColumn(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, calculatedColumn) {
        let clonedObject = Helper_1.Helper.cloneObject(calculatedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        this.props.IsExpressionValid("");
    }
    onFinishWizard() {
        let calculatedColumn = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditCalculatedColumn(this.state.EditedAdaptableBlotterObjectIndex, calculatedColumn);
        }
        else {
            this.props.onAddCalculatedColumn(calculatedColumn);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let calculatedColumn = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        CalculatedColumnErrorMessage: state.CalculatedColumn.CalculatedColumnErrorMessage
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddCalculatedColumn: (calculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn)),
        onEditCalculatedColumn: (index, calculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnEdit(index, calculatedColumn)),
        IsExpressionValid: (expression) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CalculatedColumnStrategyId))
    };
}
exports.CalculatedColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnPopupComponent);
