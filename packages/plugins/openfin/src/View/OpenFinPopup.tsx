import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as OpenFinRedux from '../Redux/ActionReducers/OpenFinRedux';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { EditableConfigEntityState } from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { UIHelper } from '@adaptabletools/adaptable/src/View/UIHelper';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';

interface OpenFinPopupProps extends StrategyViewPopupProps<OpenFinPopupComponent> {
  //  SelectedOpenFinReportName: string | undefined;
  onOpenFinSendSnapshot: (OpenFineport: OpenFinReport) => OpenFinRedux.OpenFinSendSnapshotAction;
  // onOpenFinStopLiveData: () => OpenFinRedux.OpenFinStopLiveDataAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class OpenFinPopupComponent extends React.Component<OpenFinPopupProps, EditableConfigEntityState> {
  constructor(props: OpenFinPopupProps) {
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
    let infoBody: any[] = ['Create a report to send to OpenFin.', <br />, <br />];

    //  let OpenFinDomainPages: OpenFinDomain[] = this.props.Adaptable.api.OpenFinApi.getOpenFinDomains();

    return (
      <PanelWithButton
        headerText={StrategyConstants.OpenFinStrategyFriendlyName}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.OpenFinGlyph}
        infoBody={infoBody}
      ></PanelWithButton>
    );
  }

  onApplyExport(OpenFinReport: OpenFinReport) {
    this.props.onOpenFinSendSnapshot(OpenFinReport);
  }
}

function mapStateToProps(state: AdaptableState): Partial<OpenFinPopupProps> {
  return {
    //   SelectedOpenFinReportName: state.OpenFin.SelectedOpenFinReportName,
    //   LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<OpenFinPopupProps> {
  return {
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.OpenFinStrategyId, description)
      ),
  };
}

export let OpenFinPopup = connect(mapStateToProps, mapDispatchToProps)(OpenFinPopupComponent);
