import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import {  HelpBlock } from 'react-bootstrap';
import { ReminderEntityRow } from './ReminderEntityRow'
import { ReminderWizard } from './Wizard/ReminderWizard'
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { IColumnCategory } from "../../Utilities/Interface/BlotterObjects/IColumnCategory";
import { IReminder } from "../../Utilities/Interface/BlotterObjects/IReminder";

interface ReminderPopupProps extends StrategyViewPopupProps<ReminderPopupComponent> {
    Reminders: IReminder[]
    onAddReminder: (reminder: IReminder) => ReminderRedux.ReminderAddAction
    onEditReminder: (index: number, reminder: IReminder) => ReminderRedux.ReminderEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class ReminderPopupComponent extends React.Component<ReminderPopupProps, EditableConfigEntityState> {

    constructor(props: ReminderPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    
    render() {
        let cssClassName: string = this.props.cssClassName + "__Reminder";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__Reminder";

        let infoBody: any[] = ["Conditional Styles enable columns and rows to be given distinct styles according to user rules.", <br />, <br />,
            "Styles include selection of fore and back colours, and font properties."]

        let colItems: IColItem[] = [
            { Content: "Message", Size: 4 },
            { Content: "Type", Size: 2 },
            { Content: "Schedule", Size: 4 },
            { Content: "", Size: 2 },
        ]
        let Reminders = this.props.Reminders.map((reminder: IReminder, index) => {
            return <ReminderEntityRow
                cssClassName={cssClassName}
                AdaptableBlotterObject={reminder}
                colItems={colItems}
                key={"CS" + index}
                Index={index}
                onShare={() => this.props.onShare(reminder)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={() => this.onEdit(index, reminder as IReminder)}
                onDeleteConfirm={ReminderRedux.ReminderDelete(index)} />
        });

        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Conditional Style"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyConstants.ReminderStrategyName} button={newButton} bsStyle={StyleConstants.PRIMARY_BSSTYLE} cssClassName={cssClassName} glyphicon={StrategyConstants.ReminderGlyph} infoBody={infoBody}>

                {this.props.Reminders.length == 0 ?
                    <HelpBlock>Click 'New' to create a new conditional style to be applied at row or column level when a rule set by you is met.</HelpBlock>
               :
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={Reminders} />
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <ReminderWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IReminder}
                        ConfigEntities={null}
                        ModalContainer={this.props.ModalContainer}
                          Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyReminder(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, condition: IReminder) {
        let clonedObject: IReminder = Helper.cloneObject(condition);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let reminder: IReminder = this.state.EditedAdaptableBlotterObject as IReminder;
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditReminder(this.state.EditedAdaptableBlotterObjectIndex, reminder)
        } else {
            this.props.onAddReminder(reminder)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let reminder = this.state.EditedAdaptableBlotterObject as IReminder
      // TODO
        return true;
    }
}

function mapStateToProps(state: AdaptableBlotterState) {
    return {
        Reminders: state.Reminder.Reminders,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddReminder: (reminder: IReminder) => dispatch(ReminderRedux.ReminderAdd(reminder)),
        onEditReminder: (index: number, reminder: IReminder) => dispatch(ReminderRedux.ReminderEdit(index, reminder)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ReminderStrategyId))
    };
}

export let ReminderPopup = connect(mapStateToProps, mapDispatchToProps)(ReminderPopupComponent);


