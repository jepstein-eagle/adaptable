import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as FlashingCellRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IColItem } from '../UIInterfaces';
import { FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import { FlashingCellState } from '../../PredefinedConfig/FlashingCellState';
import SimpleButton from '../../components/SimpleButton';
import { FormatColumnSummaryProps } from '../FormatColumn/FormatColumnSummary';

export interface FlashingCellSummaryProps
  extends StrategySummaryProps<FlashingCellSummaryComponent> {
  FlashingCells: FlashingCell[];
  onSelectFlashingCell: (flashingCell: FlashingCell) => FlashingCellRedux.FlashingCellSelectAction;
}

export class FlashingCellSummaryComponent extends React.Component<
  FlashingCellSummaryProps,
  EditableConfigEntityState
> {
  render(): any {
    let flashingCell: FlashingCell = this.props.FlashingCells.find(
      fc => fc.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let isFlashingCellColumn: boolean = flashingCell && flashingCell.IsLive;

    let message: string = isFlashingCellColumn ? 'Flashing on' : 'Flashing off';
    let showFlashingButton = isFlashingCellColumn ? (
      <SimpleButton
        onClick={() => this.onFlashingSelectedChanged(flashingCell)}
        variant="raised"
        tone="neutral"
      >
        Turn Off
      </SimpleButton>
    ) : (
      <SimpleButton
        onClick={() => this.onFlashingSelectedChanged(flashingCell)}
        variant="raised"
        tone="neutral"
      >
        Turn On
      </SimpleButton>
    );

    let colItems: IColItem[] = [];
    colItems.push({
      Size: 3,
      Content: <b>{StrategyConstants.FlashingCellsStrategyFriendlyName}</b>,
    });
    colItems.push({ Size: 7, Content: message });
    colItems.push({ Size: 2, Content: showFlashingButton });

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onFlashingSelectedChanged(flashingCell: FlashingCell) {
    let existingfc = this.props.FlashingCells.find(
      e => e.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    if (!existingfc) {
      let flashingCellState: FlashingCellState = this.props.Api.configApi.configGetFlashingCellState(
        false
      );
      let col: AdaptableColumn = this.props.Api.gridApi.getColumnFromId(
        this.props.SummarisedColumn.ColumnId
      );
      existingfc = ObjectFactory.CreateDefaultFlashingCell(
        col,
        flashingCellState.DefaultUpColor,
        flashingCellState.DefautDownColor,
        flashingCellState.DefaultDuration
      );
      this.props.onSelectFlashingCell(existingfc);
    }
    this.props.onSelectFlashingCell(existingfc);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FlashingCellSummaryProps> {
  return {
    FlashingCells: state.FlashingCell.FlashingCells,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FlashingCellSummaryProps> {
  return {
    onSelectFlashingCell: (flashingCell: FlashingCell) =>
      dispatch(FlashingCellRedux.FlashingCellSelect(flashingCell)),
  };
}

export let FlashingCellSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashingCellSummaryComponent);
