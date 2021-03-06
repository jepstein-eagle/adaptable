import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as ScheduleRedux from '../../Redux/ActionsReducers/ScheduleRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
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
import { ScheduleEntityRow } from './ScheduleEntityRow';
import { ScheduleWizard } from './Wizard/ScheduleWizard';
import { ScheduleType } from '../../PredefinedConfig/Common/Enums';
import DropdownButton from '../../components/DropdownButton';
import PlusIcon from '../../components/icons/plus';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { Glue42Api } from '../../Api/Glue42Api';
import { IPushPullApi } from '../../Api/IPushPullApi';
import { OpenFinApi } from '../../Api/OpenFinApi';
import { OpenFinSchedule } from '../../PredefinedConfig/OpenFinState';
interface SchedulePopupProps extends StrategyViewPopupProps<SchedulePopupComponent> {
  Reminders: ReminderSchedule[];
  ReportSchedules: ReportSchedule[];
  IPushPullSchedules: IPushPullSchedule[];
  Glue42Schedules: Glue42Schedule[];
  OpenFinSchedules: OpenFinSchedule[];

  onAddReminderSchedule: (
    reminderchedule: ReminderSchedule
  ) => ScheduleRedux.ReminderScheduleAddAction;
  onEditReminderSchedule: (
    reminderSchedule: ReminderSchedule
  ) => ScheduleRedux.ReminderScheduleEditAction;
  onAddReportSchedule: (reportSchedule: ReportSchedule) => ScheduleRedux.ReportScheduleAddAction;
  onEditReportSchedule: (reportSchedule: ReportSchedule) => ScheduleRedux.ReportScheduleEditAction;
  onAddIPushPullSchedule: (
    iPushPullSchedule: IPushPullSchedule
  ) => ScheduleRedux.IPushPullScheduleAddAction;
  onEditIPushPullSchedule: (
    iPushPullSchedule: IPushPullSchedule
  ) => ScheduleRedux.IPushPullScheduleEditAction;
  onAddGlue42Schedule: (glue42Schedule: Glue42Schedule) => ScheduleRedux.Glue42ScheduleAddAction;
  onEditGlue42Schedule: (glue42Schedule: Glue42Schedule) => ScheduleRedux.Glue42ScheduleEditAction;
  onAddOpenFinSchedule: (
    OpenFinSchedule: OpenFinSchedule
  ) => ScheduleRedux.OpenFinScheduleAddAction;
  onEditOpenFinSchedule: (
    OpenFinSchedule: OpenFinSchedule
  ) => ScheduleRedux.OpenFinScheduleEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class SchedulePopupComponent extends React.Component<
  SchedulePopupProps,
  EditableConfigEntityState
> {
  constructor(props: SchedulePopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.value) {
        if (this.props.popupParams.action == 'New') {
          let baseSchedule: BaseSchedule = this.props.popupParams.value as BaseSchedule;
          if (baseSchedule) {
            this.onNew(baseSchedule);
          }
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Use schedules to ensure that actions happen at set times.',
      <br />,
      'You can create schedules for Reminders, Exports (reports) or to send data to ipushpull or Glue42.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Type', Size: 2 },
      { Content: 'Details', Size: 5 },
      { Content: 'Schedule', Size: 3 },
      { Content: '', Size: 2 },
    ];

    // we need to do this for all 3 schedule types and then concact them into one array
    let allSchedules: BaseSchedule[] = [];
    allSchedules.push(...this.props.Reminders);
    allSchedules.push(...this.props.ReportSchedules);
    const ippApi: IPushPullApi = this.props.api.pluginsApi.getPluginApi('ipushpull');
    if (ippApi && ippApi.isIPushPullRunning()) {
      allSchedules.push(...this.props.IPushPullSchedules);
    }
    const glue42Api: Glue42Api = this.props.api.pluginsApi.getPluginApi('glue42');
    if (glue42Api && glue42Api.isGlue42Running()) {
      allSchedules.push(...this.props.Glue42Schedules);
    }

    const openFinApi: OpenFinApi = this.props.api.pluginsApi.getPluginApi('openfin');
    if (openFinApi && openFinApi.isOpenFinAvailable()) {
      allSchedules.push(...this.props.OpenFinSchedules);
    }

    let allScheduleRows = allSchedules.map((baseSchedule: BaseSchedule, index) => {
      let deleteAction: Redux.Action<any>;
      switch (baseSchedule.ScheduleType) {
        case ScheduleType.Reminder:
          deleteAction = ScheduleRedux.ReminderScheduleDelete(baseSchedule as ReminderSchedule);
          break;
        case ScheduleType.Report:
          deleteAction = ScheduleRedux.ReportScheduleDelete(baseSchedule as ReportSchedule);
          break;
        case ScheduleType.ipushpull:
          deleteAction = ScheduleRedux.IPushPullScheduleDelete(baseSchedule as IPushPullSchedule);
          break;
        case ScheduleType.Glue42:
          deleteAction = ScheduleRedux.Glue42ScheduleDelete(baseSchedule as Glue42Schedule);
          break;
        case ScheduleType.OpenFin:
          deleteAction = ScheduleRedux.OpenFinScheduleDelete(baseSchedule as OpenFinSchedule);
          break;
      }

      return (
        <ScheduleEntityRow
          adaptableObject={baseSchedule}
          api={this.props.api}
          colItems={colItems}
          key={'CS' + index}
          onShare={description => this.props.onShare(baseSchedule, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          onEdit={() => this.onEdit(baseSchedule)}
          onDeleteConfirm={deleteAction}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let reminderMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onCreateSchedule(ScheduleType.Reminder),
      label: 'Reminder',
    };
    let reportMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onCreateSchedule(ScheduleType.Report),
      label: 'Report',
    };

    let iPushPullMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onCreateSchedule(ScheduleType.ipushpull),
      label: 'ipushpull',
    };

    let glue42MenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onCreateSchedule(ScheduleType.Glue42),
      label: 'Glue42',
    };

    let openFinMenuItem = {
      disabled: this.props.accessLevel == 'ReadOnly',
      onClick: () => this.onCreateSchedule(ScheduleType.OpenFin),
      label: 'OpenFin Report',
    };

    let scheduleMenuItems = [reminderMenuItem, reportMenuItem];
    if (ippApi && ippApi.isIPushPullRunning()) {
      scheduleMenuItems.push(iPushPullMenuItem);
    }
    if (glue42Api && glue42Api.isGlue42Running()) {
      scheduleMenuItems.push(glue42MenuItem);
    }
    if (openFinApi && openFinApi.isOpenFinAvailable()) {
      scheduleMenuItems.push(openFinMenuItem);
    }

    let dropdownButton = (
      <DropdownButton
        tooltip="Create New Schedule"
        variant="raised"
        tone="accent"
        columns={['label']}
        items={scheduleMenuItems}
        style={{ zIndex: 100 }}
      >
        <PlusIcon /> New
      </DropdownButton>
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ScheduleStrategyFriendlyName}
          button={dropdownButton}
          bodyProps={{ padding: 0 }}
          bodyScroll
          glyphicon={StrategyConstants.ScheduleGlyph}
          infoBody={infoBody}
        >
          {allSchedules.length == 0 ? (
            <EmptyContent>Click 'New' to create a new Schedule.</EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={allScheduleRows} />
          )}

          {this.state.editedAdaptableObject != null && (
            <ScheduleWizard
              editedAdaptableObject={this.state.editedAdaptableObject as BaseSchedule}
              configEntities={null}
              modalContainer={this.props.modalContainer}
              api={this.props.api}
              wizardStartIndex={this.state.wizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onCreateSchedule(scheduleType: ScheduleType) {
    let baseSchedule: BaseSchedule;
    switch (scheduleType) {
      case ScheduleType.Reminder:
        baseSchedule = ObjectFactory.CreateEmptyReminderSchedule();
        break;
      case ScheduleType.Report:
        baseSchedule = ObjectFactory.CreateEmptyReportSchedule();
        break;
      case ScheduleType.ipushpull:
        baseSchedule = ObjectFactory.CreateEmptyIPushPullSchedule();
        break;
      case ScheduleType.Glue42:
        baseSchedule = ObjectFactory.CreateEmptyGlue42Schedule();
        break;
      case ScheduleType.OpenFin:
        baseSchedule = ObjectFactory.CreateEmptyOpenFinSchedule();
        break;
    }
    this.onNew(baseSchedule);
  }

  onNew(baseSchedule: BaseSchedule) {
    this.setState({
      editedAdaptableObject: baseSchedule,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(baseSchedule: BaseSchedule) {
    let clonedObject = Helper.cloneObject(baseSchedule);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let baseSchedule = this.state.editedAdaptableObject as BaseSchedule;

    switch (baseSchedule.ScheduleType) {
      case ScheduleType.Reminder:
        if (this.state.wizardStatus == WizardStatus.Edit) {
          this.props.onEditReminderSchedule(baseSchedule as ReminderSchedule);
        } else {
          this.props.onAddReminderSchedule(baseSchedule as ReminderSchedule);
        }
        break;
      case ScheduleType.Report:
        if (this.state.wizardStatus == WizardStatus.Edit) {
          this.props.onEditReportSchedule(baseSchedule as ReportSchedule);
        } else {
          this.props.onAddReportSchedule(baseSchedule as ReportSchedule);
        }
        break;
      case ScheduleType.ipushpull:
        if (this.state.wizardStatus == WizardStatus.Edit) {
          this.props.onEditIPushPullSchedule(baseSchedule as IPushPullSchedule);
        } else {
          this.props.onAddIPushPullSchedule(baseSchedule as IPushPullSchedule);
        }
        break;
      case ScheduleType.Glue42:
        if (this.state.wizardStatus == WizardStatus.Edit) {
          this.props.onEditGlue42Schedule(baseSchedule as Glue42Schedule);
        } else {
          this.props.onAddGlue42Schedule(baseSchedule as Glue42Schedule);
        }
        break;
      case ScheduleType.OpenFin:
        if (this.state.wizardStatus == WizardStatus.Edit) {
          this.props.onEditOpenFinSchedule(baseSchedule as OpenFinSchedule);
        } else {
          this.props.onAddOpenFinSchedule(baseSchedule as OpenFinSchedule);
        }
        break;
    }

    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let baseSchedule = this.state.editedAdaptableObject as BaseSchedule;
    // todo - need to do the type specific checks...
    // if (reminder.Alert == null) {
    //   return false;
    //  }
    if (baseSchedule.Schedule == null) {
      return false;
    }

    if (baseSchedule.Schedule.Hour == null || baseSchedule.Schedule.Minute == null) {
      return false;
    }
    if (
      baseSchedule.Schedule.OneOffDate == null &&
      ArrayExtensions.IsEmpty(baseSchedule.Schedule.DaysOfWeek)
    ) {
      return false;
    }
    return true;
  }
}

function mapStateToProps(state: AdaptableState): Partial<SchedulePopupProps> {
  return {
    Reminders: state.Schedule.Reminders,
    ReportSchedules: state.Schedule.ReportSchedules,
    IPushPullSchedules: state.Schedule.IPushPullSchedules,
    Glue42Schedules: state.Schedule.Glue42Schedules,
    OpenFinSchedules: state.Schedule.OpenFinSchedules,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SchedulePopupProps> {
  return {
    onAddReminderSchedule: (reminderSchedule: ReminderSchedule) =>
      dispatch(ScheduleRedux.ReminderScheduleAdd(reminderSchedule)),
    onEditReminderSchedule: (reminderSchedule: ReminderSchedule) =>
      dispatch(ScheduleRedux.ReminderScheduleEdit(reminderSchedule)),
    onAddReportSchedule: (reportSchedule: ReportSchedule) =>
      dispatch(ScheduleRedux.ReportScheduleAdd(reportSchedule)),
    onEditReportSchedule: (reportSchedule: ReportSchedule) =>
      dispatch(ScheduleRedux.ReportScheduleEdit(reportSchedule)),
    onAddIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) =>
      dispatch(ScheduleRedux.IPushPullScheduleAdd(iPushPullSchedule)),
    onEditIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) =>
      dispatch(ScheduleRedux.IPushPullScheduleEdit(iPushPullSchedule)),
    onAddGlue42Schedule: (glue42Schedule: Glue42Schedule) =>
      dispatch(ScheduleRedux.Glue42ScheduleAdd(glue42Schedule)),
    onEditGlue42Schedule: (glue42Schedule: Glue42Schedule) =>
      dispatch(ScheduleRedux.Glue42ScheduleEdit(glue42Schedule)),
    onAddOpenFinSchedule: (openFinSchedule: OpenFinSchedule) =>
      dispatch(ScheduleRedux.OpenFinScheduleAdd(openFinSchedule)),
    onEditOpenFinSchedule: (openFinSchedule: OpenFinSchedule) =>
      dispatch(ScheduleRedux.OpenFinScheduleEdit(openFinSchedule)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ScheduleStrategyId, description)
      ),
  };
}

export let SchedulePopup = connect(mapStateToProps, mapDispatchToProps)(SchedulePopupComponent);
