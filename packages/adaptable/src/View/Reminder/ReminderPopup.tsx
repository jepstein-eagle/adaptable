import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ScheduleRedux from '../../Redux/ActionsReducers/ScheduleRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { ReminderEntityRow } from './ReminderEntityRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ScheduleWizard } from '../Schedule/Wizard/ScheduleWizard';

interface ReminderPopupProps extends StrategyViewPopupProps<ReminderPopupComponent> {
  Reminders: ReminderSchedule[];
  onAddReminder: (reminder: ReminderSchedule) => ScheduleRedux.ReminderScheduleAddAction;
  onEditReminder: (reminder: ReminderSchedule) => ScheduleRedux.ReminderScheduleEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class ReminderPopupComponent extends React.Component<
  ReminderPopupProps,
  EditableConfigEntityState
> {
  constructor(props: ReminderPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render() {
    let infoBody: any[] = [
      'Reminders are alerts that you set by schdedule.',
      <br />,
      'You can choose to show the alert on a given date or on a recurring basis.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Message', Size: 4 },
      { Content: 'Type', Size: 2 },
      { Content: 'Schedule', Size: 4 },
      { Content: '', Size: 2 },
    ];
    let Reminders = this.props.Reminders.map((reminder: ReminderSchedule, index) => {
      return (
        <ReminderEntityRow
          AdaptableObject={reminder}
          api={this.props.Adaptable.api}
          colItems={colItems}
          key={'CS' + index}
          onShare={description => this.props.onShare(reminder, description)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onEdit={() => this.onEdit(reminder)}
          onDeleteConfirm={ScheduleRedux.ReminderScheduleDelete(reminder)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Reminder"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ReminderStrategyFriendlyName}
          button={newButton}
          glyphicon={StrategyConstants.ReminderGlyph}
          infoBody={infoBody}
        >
          {this.props.Reminders.length == 0 ? (
            <EmptyContent>
              Click 'New' to create a new Reminder that will trigger an alert according to a
              schedule set by you.
            </EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={Reminders} />
          )}

          {this.state.EditedAdaptableObject != null && (
            <ScheduleWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as ReminderSchedule}
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              Adaptable={this.props.Adaptable}
              WizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyReminder(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(reminder: ReminderSchedule) {
    let clonedObject: ReminderSchedule = Helper.cloneObject(reminder);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let reminder: ReminderSchedule = this.state.EditedAdaptableObject as ReminderSchedule;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditReminder(reminder);
    } else {
      this.props.onAddReminder(reminder);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let reminder = this.state.EditedAdaptableObject as ReminderSchedule;
    if (reminder.Alert == null && reminder.Schedule == null) {
      return false;
    }

    if (reminder.Schedule.Hour == null || reminder.Schedule.Minute == null) {
      return false;
    }
    if (
      reminder.Schedule.OneOffDate == null &&
      ArrayExtensions.IsEmpty(reminder.Schedule.DaysOfWeek)
    ) {
      return false;
    }
    return true;
  }
}

function mapStateToProps(state: AdaptableState): Partial<ReminderPopupProps> {
  return {
    Reminders: state.Schedule.Reminders,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ReminderPopupProps> {
  return {
    onAddReminder: (reminder: ReminderSchedule) =>
      dispatch(ScheduleRedux.ReminderScheduleAdd(reminder)),
    onEditReminder: (reminder: ReminderSchedule) =>
      dispatch(ScheduleRedux.ReminderScheduleEdit(reminder)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ReminderStrategyId, description)
      ),
  };
}

export let ReminderPopup = connect(mapStateToProps, mapDispatchToProps)(ReminderPopupComponent);
