"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const ShortcutRedux = require("../../Redux/ActionsReducers/ShortcutRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const Enums_1 = require("../../Core/Enums");
const Enums_2 = require("../../Core/Enums");
const ShortcutEntityRow_1 = require("./ShortcutEntityRow");
const ShortcutWizard_1 = require("./Wizard/ShortcutWizard");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class ShortcutPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__shortcut";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__shortcut";
        let infoBody = ["Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.", React.createElement("br", null), React.createElement("br", null),
            "Numeric shortcuts update the existing cell value based on a 'calculation'.", React.createElement("br", null), React.createElement("br", null),
            "Date shortcuts replace the contents of the cell with a new date value."];
        let colItems = [
            { Content: "Columns", Size: 2 },
            { Content: "Key", Size: 2 },
            { Content: "Operation", Size: 3 },
            { Content: "Value", Size: 3 },
            { Content: "", Size: 2 },
        ];
        const shortcutOperationList = [Enums_2.MathOperation.Add, Enums_2.MathOperation.Subtract, Enums_2.MathOperation.Multiply, Enums_2.MathOperation.Divide];
        let shortcuts = this.props.Shortcuts.map((shortcut, index) => {
            return React.createElement(ShortcutEntityRow_1.ShortcutEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: shortcut, key: "ns" + index, Index: index, onEdit: null, colItems: colItems, AvailableActions: shortcutOperationList, AvailableKeys: this.getAvailableKeys(shortcut), onShare: () => this.props.onShare(shortcut), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: ShortcutRedux.ShortcutDelete(shortcut), onChangeKey: (shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey), onChangeOperation: (shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation), onChangeResult: (shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.CreateShortcut(), overrideTooltip: "Create New Shortcut", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        let shortcut = this.state.EditedAdaptableBlotterObject;
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstantsShortcutStrategyName, className: "ab_main_popup", button: newButton, bsStyle: "primary", glyphicon: StrategyConstantsShortcutGlyph, infoBody: infoBody },
                shortcuts.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: shortcuts }),
                shortcuts.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" }, "Click 'New' to add a new Shortcut."),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(ShortcutWizard_1.ShortcutWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: shortcut, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, DateKeysAvailable: shortcut.ShortcutKey ?
                            keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                            : keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Date).findIndex(y => y.ShortcutKey == x) == -1), NumericKeysAvailable: shortcut.ShortcutKey ?
                            keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                            : keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Number).findIndex(y => y.ShortcutKey == x) == -1), WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let shortcut = this.state.EditedAdaptableBlotterObject;
        this.props.onAddShortcut(shortcut);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let shortcut = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutResult) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutKey);
    }
    CreateShortcut() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyShortcut(), WizardStartIndex: 0 });
    }
    getAvailableKeys(shortcut) {
        return (shortcut.ColumnType == Enums_1.DataType.Number) ?
            keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            : keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        Shortcuts: state.Shortcut.Shortcuts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddShortcut: (shortcut) => dispatch(ShortcutRedux.ShortcutAdd(shortcut)),
        onChangeKeyShortcut: (shortcut, NewShortcutKey) => dispatch(ShortcutRedux.ShortcutChangeKey(shortcut, NewShortcutKey)),
        onChangeOperationShortcut: (shortcut, NewshortcutOperation) => dispatch(ShortcutRedux.ShortcutChangeOperation(shortcut, NewshortcutOperation)),
        onChangeResultShortcut: (shortcut, NewShortcutResult) => dispatch(ShortcutRedux.ShortcutChangeResult(shortcut, NewShortcutResult)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstantsShortcutStrategyId))
    };
}
exports.ShortcutPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ShortcutPopupComponent);
const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
