import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

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

import { ScheduleEntityRow } from './ScheduleEntityRow';
import { ScheduleWizard } from './Wizard/ScheduleWizard';
import { AccessLevel, ScheduleType } from '../../PredefinedConfig/Common/Enums';
import { ChartType } from '../../PredefinedConfig/Common/ChartEnums';
import DropdownButton from '../../components/DropdownButton';
import PlusIcon from '../../components/icons/plus';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
interface SchedulePopupProps extends StrategyViewPopupProps<SchedulePopupComponent> {
  ReminderSchedules: ReminderSchedule[];
  ReportSchedules: ReportSchedule[];
  IPushPullSchedules: IPushPullSchedule[];

  onAddReminderSchedule: (
    reminderchedule: ReminderSchedule
  ) => ReminderRedux.ReminderScheduleAddAction;
  onEditReminderSchedule: (
    reminderSchedule: ReminderSchedule
  ) => ReminderRedux.ReminderScheduleEditAction;
  onAddReportSchedule: (reportSchedule: ReportSchedule) => ExportRedux.ReportScheduleAddAction;
  onEditReportSchedule: (reportSchedule: ReportSchedule) => ExportRedux.ReportScheduleEditAction;
  onAddIPushPullSchedule: (
    iPushPullSchedule: IPushPullSchedule
  ) => IPushPullRedux.IPushPullScheduleAddAction;
  onEditIPushPullSchedule: (
    iPushPullSchedule: IPushPullSchedule
  ) => IPushPullRedux.IPushPullScheduleEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
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
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.value) {
        if (this.props.PopupParams.action == 'New') {
          let baseSchedule: BaseSchedule = this.props.PopupParams.value as BaseSchedule;
          if (baseSchedule) {
            this.onNew(baseSchedule);
          }
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Schedule are alerts that you set by schdedule.',
      <br />,
      'You can choose to show the alert on a given date or on a recurring basis.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Type', Size: 2 },
      { Content: 'Details', Size: 5 },
      { Content: 'Schedule', Size: 3 },
      { Content: '', Size: 2 },
    ];

    // we need to do this for all 3 schedule types and then concact them into one array
    let allSchedules: BaseSchedule[] = [];
    allSchedules.push(...this.props.ReminderSchedules);
    allSchedules.push(...this.props.ReportSchedules);
    if (this.props.Adaptable.api.iPushPullApi.isIPushPullAvailable()) {
      allSchedules.push(...this.props.IPushPullSchedules);
    }

    let allScheduleRows = allSchedules.map((baseSchedule: BaseSchedule, index) => {
      let deleteAction: Redux.Action<any>;
      switch (baseSchedule.ScheduleType) {
        case ScheduleType.Reminder:
          deleteAction = ReminderRedux.ReminderScheduleDelete(baseSchedule as ReminderSchedule);
          break;
        case ScheduleType.Report:
          deleteAction = ExportRedux.ReportScheduleDelete(baseSchedule as ReportSchedule);
          break;
        case ScheduleType.iPushPull:
          deleteAction = IPushPullRedux.IPushPullScheduleDelete(baseSchedule as IPushPullSchedule);
          break;
      }

      return (
        <ScheduleEntityRow
          AdaptableObject={baseSchedule}
          colItems={colItems}
          key={'CS' + index}
          onShare={() => this.props.onShare(baseSchedule)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          UserFilters={this.props.UserFilters}
          Columns={this.props.Columns}
          onEdit={() => this.onEdit(baseSchedule)}
          onDeleteConfirm={deleteAction}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let reminderMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () => this.onCreateSchedule(ScheduleType.Reminder),
      label: 'Reminder',
    };
    let reportMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () => this.onCreateSchedule(ScheduleType.Report),
      label: 'Report',
    };

    let iPushPullMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () => this.onCreateSchedule(ScheduleType.iPushPull),
      label: 'iPushPull',
    };

    let scheduleMenuItems = [reminderMenuItem, reportMenuItem];
    if (this.props.Adaptable.api.iPushPullApi.isIPushPullAvailable()) {
      scheduleMenuItems.push(iPushPullMenuItem);
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
          {this.props.ReportSchedules.length == 0 ? (
            <EmptyContent>Click 'New' to create a new Schedule.</EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={allScheduleRows} />
          )}

          {this.state.EditedAdaptableObject != null && (
            <ScheduleWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as BaseSchedule}
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
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

  onCreateSchedule(scheduleType: ScheduleType) {
    let baseSchedule: BaseSchedule;
    switch (scheduleType) {
      case ScheduleType.Reminder:
        baseSchedule = ObjectFactory.CreateEmptyReminderSchedule();
        break;
      case ScheduleType.Report:
        baseSchedule = ObjectFactory.CreateEmptyReportSchedule();
        break;
      case ScheduleType.iPushPull:
        baseSchedule = ObjectFactory.CreateEmptyIPushPullSchedule();
        break;
    }
    this.onNew(baseSchedule);
  }

  onNew(baseSchedule: BaseSchedule) {
    this.setState({
      EditedAdaptableObject: baseSchedule,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(baseSchedule: BaseSchedule) {
    let clonedObject = Helper.cloneObject(baseSchedule);
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

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let baseSchedule = this.state.EditedAdaptableObject as BaseSchedule;

    switch (baseSchedule.ScheduleType) {
      case ScheduleType.Reminder:
        if (this.state.WizardStatus == WizardStatus.Edit) {
          this.props.onEditReminderSchedule(baseSchedule as ReminderSchedule);
        } else {
          this.props.onAddReminderSchedule(baseSchedule as ReminderSchedule);
        }
        break;
      case ScheduleType.Report:
        if (this.state.WizardStatus == WizardStatus.Edit) {
          this.props.onEditReportSchedule(baseSchedule as ReportSchedule);
        } else {
          this.props.onAddReportSchedule(baseSchedule as ReportSchedule);
        }
        break;
      case ScheduleType.iPushPull:
        if (this.state.WizardStatus == WizardStatus.Edit) {
          this.props.onEditIPushPullSchedule(baseSchedule as IPushPullSchedule);
        } else {
          this.props.onAddIPushPullSchedule(baseSchedule as IPushPullSchedule);
        }
        break;
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let baseSchedule = this.state.EditedAdaptableObject as BaseSchedule;
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

function mapStateToProps(state: AdaptableState) {
  return {
    ReminderSchedules: state.Reminder.Reminders,
    ReportSchedules: state.Export.ReportSchedules,
    IPushPullSchedules: state.IPushPull.IPushPullSchedules,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddReminderSchedule: (reminderSchedule: ReminderSchedule) =>
      dispatch(ReminderRedux.ReminderScheduleAdd(reminderSchedule)),
    onEditReminderSchedule: (reminderSchedule: ReminderSchedule) =>
      dispatch(ReminderRedux.ReminderScheduleEdit(reminderSchedule)),
    onAddReportSchedule: (reportSchedule: ReportSchedule) =>
      dispatch(ExportRedux.ReportScheduleAdd(reportSchedule)),
    onEditReportSchedule: (reportSchedule: ReportSchedule) =>
      dispatch(ExportRedux.ReportScheduleEdit(reportSchedule)),
    onAddIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) =>
      dispatch(IPushPullRedux.IPushPullScheduleAdd(iPushPullSchedule)),
    onEditIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) =>
      dispatch(IPushPullRedux.IPushPullScheduleEdit(iPushPullSchedule)),

    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ScheduleStrategyId)),
  };
}

export let SchedulePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePopupComponent);
