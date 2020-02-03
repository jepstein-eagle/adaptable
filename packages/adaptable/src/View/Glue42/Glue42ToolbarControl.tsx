import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Report } from '../../PredefinedConfig/ExportState';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import join from '../../components/utils/join';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { LiveDataChangedEventArgs, LiveDataChangedInfo } from '../../Api/Events/LiveDataChanged';
import { Glue42Report, Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { ButtonExport } from '../Components/Buttons/ButtonExport';
import { ButtonLogin } from '../Components/Buttons/ButtonLogin';
import { ButtonPlay } from '../Components/Buttons/ButtonPlay';
import { ButtonSchedule } from '../Components/Buttons/ButtonSchedule';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { ButtonPause } from '../Components/Buttons/ButtonPause';
import ObjectFactory from '../../Utilities/ObjectFactory';
import { ButtonNewPage } from '../Components/Buttons/ButtonNewPage';
import { ButtonLogout } from '../Components/Buttons/ButtonLogout';

interface Glue42ToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<Glue42ToolbarControlComponent> {
  onGlue42SendSnapshot: (glue42report: Glue42Report) => Glue42Redux.Glue42SendSnapshotAction;

  onGlue42StartLiveData: (glue42report: Glue42Report) => Glue42Redux.Glue42StartLiveDataAction;

  onGlue42StopLiveData: () => Glue42Redux.Glue42StopLiveDataAction;

  onNewGlue42Schedule: (glue42Schedule: Glue42Schedule) => PopupRedux.PopupShowScreenAction;

  Columns: AdaptableColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentLiveGlue42Report: Glue42Report | undefined;
  IsGlue42Running: boolean;
  IsGlue42Available: boolean;
}

interface Glue42ToolbarControlComponentState {
  ReportName: string;
}

class Glue42ToolbarControlComponent extends React.Component<
  Glue42ToolbarControlComponentProps,
  Glue42ToolbarControlComponentState
> {
  constructor(props: Glue42ToolbarControlComponentProps) {
    super(props);
    this.state = {
      ReportName: '',
    };
  }

  public componentDidMount() {
    if (this.props.Adaptable) {
      this.props.Adaptable.api.eventApi.on(
        'LiveDataChanged',
        (liveDataChangedEventArgs: LiveDataChangedEventArgs) => {
          let liveDataChangedInfo: LiveDataChangedInfo = liveDataChangedEventArgs.data[0].id;
          if (
            liveDataChangedInfo.ReportDestination == 'Glue42' &&
            (liveDataChangedInfo.LiveDataTrigger == 'Connected' ||
              liveDataChangedInfo.LiveDataTrigger == 'Disconnected')
          ) {
            this.forceUpdate();
          }
        }
      );
    }
  }

  render(): any {
    let allReports: Report[] = this.props
      .SystemReports!.filter(s => this.props.Adaptable.ReportService.IsSystemReportActive(s))
      .concat(this.props.Reports);

    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });

    // this is clearly ridiculous!
    // im getting tired...
    let isCompletedReport: boolean = StringExtensions.IsNotNullOrEmpty(this.state.ReportName);

    let isLiveGlue42Report: boolean =
      isCompletedReport &&
      this.props.CurrentLiveGlue42Report &&
      this.state.ReportName == this.props.CurrentLiveGlue42Report.ReportName;

    let content = this.props.IsGlue42Available ? (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Glue42__wrap">
        <Dropdown
          disabled={allReports.length == 0 || isLiveGlue42Report}
          style={{ minWidth: 140 }}
          options={availableReports}
          className="ab-DashboardToolbar__Glue42__select"
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={this.state.ReportName} // do props and update after we change????
          showClearButton
          marginRight={2}
        ></Dropdown>
        <ButtonExport
          marginLeft={1}
          className="ab-DashboardToolbar__Glue42__export"
          onClick={() => this.onGlue42SendSnapshot()}
          tooltip="Send Snapshot to Glue42"
          disabled={isLiveGlue42Report || !isCompletedReport}
          AccessLevel={this.props.AccessLevel}
        />
        {isLiveGlue42Report ? (
          <ButtonPause
            marginLeft={1}
            className="ab-DashboardToolbar__Glue42__pause"
            onClick={() => this.props.onGlue42StopLiveData()}
            tooltip="Stop sync with Glue42"
            disabled={!isLiveGlue42Report}
            AccessLevel={this.props.AccessLevel}
          />
        ) : (
          <ButtonPlay
            marginLeft={1}
            className="ab-DashboardToolbar__Glue42__play"
            onClick={() => this.onGlue42StartLiveData()}
            tooltip="Start sync with Glue42"
            disabled={isLiveGlue42Report || !isCompletedReport}
            AccessLevel={this.props.AccessLevel}
          />
        )}
        {isCompletedReport && (
          <Flex
            className={join(
              this.props.AccessLevel == AccessLevel.ReadOnly
                ? GeneralConstants.READ_ONLY_STYLE
                : '',
              'ab-DashboardToolbar__Glue42__controls'
            )}
            alignItems="stretch"
          >
            <ButtonSchedule
              marginLeft={1}
              className="ab-DashboardToolbar__Glue42__schedule"
              onClick={() => this.onNewGlue42Schedule()}
              tooltip="Schedule"
              disabled={isLiveGlue42Report || !isCompletedReport}
              AccessLevel={this.props.AccessLevel}
            />
          </Flex>
        )}{' '}
      </Flex>
    ) : (
      <span>some kind of login button?</span>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__Glue42"
        headerText={StrategyConstants.Glue42StrategyFriendlyName}
        glyphicon={StrategyConstants.Glue42Glyph}
        onClose={() => this.props.onClose(StrategyConstants.Glue42StrategyId)}
        showConfigureButton={false} // later : isGlue42Running
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedReportChanged(reportName: string) {
    if (StringExtensions.IsNotNullOrEmpty(reportName) && reportName !== 'Select Report') {
      this.setState({ ReportName: reportName });
    } else {
      this.setState({ ReportName: EMPTY_STRING });
    }
  }

  private onGlue42SendSnapshot() {
    this.props.onGlue42SendSnapshot(this.createGlue42ReportFromState());
  }

  private onGlue42StartLiveData() {
    this.props.onGlue42StartLiveData(this.createGlue42ReportFromState());
  }

  private onNewGlue42Schedule() {
    let Glue42Schedule: Glue42Schedule = ObjectFactory.CreateGlue42Schedule(
      this.createGlue42ReportFromState()
    );
    this.props.onNewGlue42Schedule(Glue42Schedule);
  }

  // perhaps this should be props and in real state?
  private createGlue42ReportFromState(): Glue42Report {
    return {
      ReportName: this.state.ReportName,
    };
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    CurrentLiveGlue42Report: state.Glue42.CurrentLiveGlue42Report,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    IsGlue42Available: state.Glue42.IsGlue42Available,
    IsGlue42Running: state.Glue42.IsGlue42Running,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onGlue42SendSnapshot: (glue42report: Glue42Report) =>
      dispatch(Glue42Redux.Glue42SendSnapshot(glue42report)),

    onGlue42StartLiveData: (glue42report: Glue42Report) =>
      dispatch(Glue42Redux.Glue42StartLiveData(glue42report)),
    onGlue42StopLiveData: () => dispatch(Glue42Redux.Glue42StopLiveData()),

    onNewGlue42Schedule: (Glue42Schedule: Glue42Schedule) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ScheduleStrategyId,
          ScreenPopups.SchedulePopup,
          {
            action: 'New',
            source: 'Toolbar',
            value: Glue42Schedule,
          }
        )
      ),

    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),

    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.Glue42StrategyId, ScreenPopups.Glue42Popup)
      ),
  };
}

export let Glue42ToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Glue42ToolbarControlComponent);
