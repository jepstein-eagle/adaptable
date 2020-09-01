import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as IPushPullRedux from '../Redux/ActionReducers/IPushPullRedux';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { EditableConfigEntityState } from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import { IPushPullReport } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';

interface IPushPullPopupProps extends StrategyViewPopupProps<IPushPullPopupComponent> {
  //  SelectedIPushPullReportName: string | undefined;
  onIPushPullSendSnapshot: (
    iPushPulleport: IPushPullReport
  ) => IPushPullRedux.IPushPullSendSnapshotAction;
  onIPushPullStopLiveData: () => IPushPullRedux.IPushPullStopLiveDataAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
    if (this.props.popupParams) {
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'Toolbar';
    }
  }

  render() {
    let infoBody: any[] = ['Create a report to send to ipushpull.', <br />, <br />];

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

function mapStateToProps(state: AdaptableState): Partial<IPushPullPopupProps> {
  return {};
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<IPushPullPopupProps> {
  return {
    onIPushPullSendSnapshot: (report: IPushPullReport) =>
      dispatch(IPushPullRedux.IPushPullSendSnapshot(report)),

    onIPushPullStopLiveData: () => dispatch(IPushPullRedux.IPushPullStopLiveData()),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.IPushPullStrategyId,
          description
        )
      ),
  };
}

export let IPushPullPopup = connect(mapStateToProps, mapDispatchToProps)(IPushPullPopupComponent);
