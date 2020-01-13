import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { CellSummmary } from '../../Utilities/Interface/Selection/CellSummmary';
import { CellSummaryDetails } from './CellSummaryDetails';

interface CellSummaryPopupProps extends StrategyViewPopupProps<CellSummaryPopupComponent> {
  CellSummary: CellSummmary;
  onSetSelectedCellSummary: () => GridRedux.GridSetCellSummaryAction;
}

class CellSummaryPopupComponent extends React.Component<
  CellSummaryPopupProps,
  EditableConfigEntityState
> {
  public componentDidMount() {
    this.props.onSetSelectedCellSummary();
  }

  render() {
    let infoBody: any[] = [
      'Provides summary information about the (numeric) cells which have been selected.',
    ];

    return (
      <PanelWithButton
        headerText={StrategyConstants.CellSummaryStrategyFriendlyName}
        glyphicon={StrategyConstants.CellSummaryGlyph}
        infoBody={infoBody}
        border="none"
        bodyProps={{ padding: 0 }}
      >
        <CellSummaryDetails CellSummary={this.props.CellSummary} />
      </PanelWithButton>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    CellSummary: state.Grid.CellSummary,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onSetSelectedCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
  };
}

export let CellSummaryPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellSummaryPopupComponent);
