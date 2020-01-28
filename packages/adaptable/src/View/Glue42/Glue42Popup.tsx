import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Glue42Report } from '../../PredefinedConfig/Glue42State';

interface Glue42PopupProps extends StrategyViewPopupProps<Glue42PopupComponent> {
  //  SelectedGlue42ReportName: string | undefined;
  onGlue42SendSnapshot: (Glue42eport: Glue42Report) => Glue42Redux.Glue42SendSnapshotAction;
  // onGlue42StopLiveData: () => Glue42Redux.Glue42StopLiveDataAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class Glue42PopupComponent extends React.Component<Glue42PopupProps, EditableConfigEntityState> {
  constructor(props: Glue42PopupProps) {
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
    let infoBody: any[] = ['Create a report to send to Glue42.', <br />, <br />];

    //  let Glue42DomainPages: Glue42Domain[] = this.props.Adaptable.api.Glue42Api.getGlue42Domains();

    return (
      <PanelWithButton
        headerText={StrategyConstants.Glue42StrategyFriendlyName}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.Glue42Glyph}
        infoBody={infoBody}
      ></PanelWithButton>
    );
  }

  onApplyExport(Glue42Report: Glue42Report) {
    this.props.onGlue42SendSnapshot(Glue42Report);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    //   SelectedGlue42ReportName: state.Glue42.SelectedGlue42ReportName,
    //   LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onGlue42SendSnapshot: (report: Glue42Report) =>
      dispatch(Glue42Redux.Glue42SendSnapshot(report)),

    //    onGlue42StopLiveData: () => dispatch(Glue42Redux.Glue42StopLiveData()),

    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.Glue42StrategyId)),
  };
}

export let Glue42Popup = connect(mapStateToProps, mapDispatchToProps)(Glue42PopupComponent);
