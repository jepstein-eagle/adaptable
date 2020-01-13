import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IPushPullReport } from '../../PredefinedConfig/IPushPullState';

interface IPushPullPopupProps extends StrategyViewPopupProps<IPushPullPopupComponent> {
  //  SelectedIPushPullReportName: string | undefined;
  onIPushPullSendSnapshot: (
    iPushPulleport: IPushPullReport
  ) => IPushPullRedux.IPushPullSendSnapshotAction;
  onIPushPullStopLiveData: () => IPushPullRedux.IPushPullStopLiveDataAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class IPushPullPopupComponent extends React.Component<
  IPushPullPopupProps,
  EditableConfigEntityState
> {
  constructor(props: IPushPullPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  shouldClosePopupOnFinishWizard: boolean = false;

  componentDidMount() {
    if (this.props.PopupParams) {
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
    }
  }

  render() {
    let infoBody: any[] = ['Create a report to send to iPushPull.', <br />, <br />];

    //  let iPushPullDomainPages: IPushPullDomain[] = this.props.Adaptable.api.iPushPullApi.getIPushPullDomains();

    return (
      <PanelWithButton
        headerText={StrategyConstants.IPushPullStrategyFriendlyName}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.IPushPullGlyph}
        infoBody={infoBody}
      ></PanelWithButton>
    );
  }

  onApplyExport(iPushPullReport: IPushPullReport) {
    this.props.onIPushPullSendSnapshot(iPushPullReport);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    //   SelectedIPushPullReportName: state.IPushPull.SelectedIPushPullReportName,
    //   LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onIPushPullSendSnapshot: (report: IPushPullReport) =>
      dispatch(IPushPullRedux.IPushPullSendSnapshot(report)),

    onIPushPullStopLiveData: () => dispatch(IPushPullRedux.IPushPullStopLiveData()),

    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.IPushPullStrategyId)),
  };
}

export let IPushPullPopup = connect(mapStateToProps, mapDispatchToProps)(IPushPullPopupComponent);
