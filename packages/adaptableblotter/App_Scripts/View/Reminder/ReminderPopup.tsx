import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { ReminderEntityRow } from './ReminderEntityRow';
import { ReminderWizard } from './Wizard/ReminderWizard';
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
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { Reminder } from '../../PredefinedConfig/RunTimeState/ReminderState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';

interface ReminderPopupProps extends StrategyViewPopupProps<ReminderPopupComponent> {
  Reminders: Reminder[];
  onAddReminder: (reminder: Reminder) => ReminderRedux.ReminderAddAction;
  onEditReminder: (reminder: Reminder) => ReminderRedux.ReminderEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
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
    let Reminders = this.props.Reminders.map((reminder: Reminder, index) => {
      return (
        <ReminderEntityRow
          AdaptableBlotterObject={reminder}
          colItems={colItems}
          key={'CS' + index}
          onShare={() => this.props.onShare(reminder)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          UserFilters={this.props.UserFilters}
          Columns={this.props.Columns}
          onEdit={() => this.onEdit(reminder)}
          onDeleteConfirm={ReminderRedux.ReminderDelete(reminder)}
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
          headerText={StrategyConstants.ReminderStrategyName}
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

          {this.state.EditedAdaptableBlotterObject != null && (
            <ReminderWizard
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as Reminder}
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              Blotter={this.props.Blotter}
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
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyReminder(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(reminder: Reminder) {
    let clonedObject: Reminder = Helper.cloneObject(reminder);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let reminder: Reminder = this.state.EditedAdaptableBlotterObject as Reminder;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditReminder(reminder);
    } else {
      this.props.onAddReminder(reminder);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let reminder = this.state.EditedAdaptableBlotterObject as Reminder;
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

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    Reminders: state.Reminder.Reminders,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddReminder: (reminder: Reminder) => dispatch(ReminderRedux.ReminderAdd(reminder)),
    onEditReminder: (reminder: Reminder) => dispatch(ReminderRedux.ReminderEdit(reminder)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ReminderStrategyId)),
  };
}

export let ReminderPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReminderPopupComponent);
