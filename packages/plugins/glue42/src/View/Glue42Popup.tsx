import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as Glue42Redux from '../Redux/ActionReducers/Glue42Redux';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { EditableConfigEntityState } from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import { Glue42Report } from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';

interface Glue42PopupProps extends StrategyViewPopupProps<Glue42PopupComponent> {
  //  SelectedGlue42ReportName: string | undefined;
  onGlue42SendSnapshot: (Glue42eport: Glue42Report) => Glue42Redux.Glue42SendSnapshotAction;
  // onGlue42StopLiveData: () => Glue42Redux.Glue42StopLiveDataAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class Glue42PopupComponent extends React.Component<Glue42PopupProps, EditableConfigEntityState> {
  constructor(props: Glue42PopupProps) {
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
    let infoBody: any[] = ['Create a report to send to Glue42.', <br />, <br />];

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

function mapStateToProps(state: AdaptableState): Partial<Glue42PopupProps> {
  return {
    //   SelectedGlue42ReportName: state.Glue42.SelectedGlue42ReportName,
    //   LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<Glue42PopupProps> {
  return {
    onGlue42SendSnapshot: (report: Glue42Report) =>
      dispatch(Glue42Redux.Glue42SendSnapshot(report)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.Glue42StrategyId, description)
      ),
  };
}

export let Glue42Popup = connect(mapStateToProps, mapDispatchToProps)(Glue42PopupComponent);
