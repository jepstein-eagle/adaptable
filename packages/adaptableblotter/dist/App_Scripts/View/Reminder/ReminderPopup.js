"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ReminderRedux = require("../../Redux/ActionsReducers/ReminderRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const react_bootstrap_1 = require("react-bootstrap");
const ReminderEntityRow_1 = require("./ReminderEntityRow");
const ReminderWizard_1 = require("./Wizard/ReminderWizard");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
class ReminderPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Reminder";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__Reminder";
        let infoBody = ["Reminders are alerts that you set by schdedule.", React.createElement("br", null), React.createElement("br", null),
            "You can choose to show the alert on a given date or on a recurring basis."];
        let colItems = [
            { Content: "Message", Size: 4 },
            { Content: "Type", Size: 2 },
            { Content: "Schedule", Size: 4 },
            { Content: "", Size: 2 },
        ];
        let Reminders = this.props.Reminders.map((reminder, index) => {
            return React.createElement(ReminderEntityRow_1.ReminderEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: reminder, colItems: colItems, key: "CS" + index, Index: index, onShare: () => this.props.onShare(reminder), TeamSharingActivated: this.props.TeamSharingActivated, UserFilters: this.props.UserFilters, Columns: this.props.Columns, onEdit: () => this.onEdit(index, reminder), onDeleteConfirm: ReminderRedux.ReminderDelete(index) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.onNew(), overrideTooltip: "Create Reminder", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ReminderStrategyName, button: newButton, bsStyle: StyleConstants.PRIMARY_BSSTYLE, cssClassName: cssClassName, glyphicon: StrategyConstants.ReminderGlyph, infoBody: infoBody },
                this.props.Reminders.length == 0 ?
                    React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to create a new Reminder that will trigger an alert according to a schedule set by you.")
                    :
                        React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: Reminders }),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(ReminderWizard_1.ReminderWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyReminder(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, reminder) {
        let clonedObject = Helper_1.Helper.cloneObject(reminder);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let reminder = this.state.EditedAdaptableBlotterObject;
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditReminder(this.state.EditedAdaptableBlotterObjectIndex, reminder);
        }
        else {
            this.props.onAddReminder(reminder);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let reminder = this.state.EditedAdaptableBlotterObject;
        if (reminder.Alert == null && reminder.Schedule == null) {
            return false;
        }
        if (reminder.Schedule.Hour == null || reminder.Schedule.Minute == null) {
            return false;
        }
        if (reminder.Schedule.OneOffDate == null && ArrayExtensions_1.ArrayExtensions.IsEmpty(reminder.Schedule.DaysOfWeek)) {
            return false;
        }
        return true;
    }
}
function mapStateToProps(state) {
    return {
        Reminders: state.Reminder.Reminders,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddReminder: (reminder) => dispatch(ReminderRedux.ReminderAdd(reminder)),
        onEditReminder: (index, reminder) => dispatch(ReminderRedux.ReminderEdit(index, reminder)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ReminderStrategyId))
    };
}
exports.ReminderPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ReminderPopupComponent);
