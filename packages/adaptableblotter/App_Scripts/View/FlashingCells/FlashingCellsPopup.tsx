import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as FlashingCellsRedux from '../../Redux/ActionsReducers/FlashingCellsRedux';

import { DataType, SortOrder } from '../../PredefinedConfig/Common/Enums';
import { FlashingCellEntityRow } from './FlashingCellEntityRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';

import { FlashingCell } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { FlashingCellState } from '../../PredefinedConfig/RunTimeState/FlashingCellState';
import { CalculatedColumn } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import Checkbox from '../../components/CheckBox';
import { Flex, Box } from 'rebass';

interface FlashingCellsPopupProps extends StrategyViewPopupProps<FlashingCellsPopupComponent> {
  FlashingCells: FlashingCell[] | undefined;
  CalculatedColumns: CalculatedColumn[] | undefined;
  onSelectColumn: (flashingCell: FlashingCell) => FlashingCellsRedux.FlashingCellSelectAction;
  onSelectAllColumns: (
    shouldTurnOn: boolean,
    numericColumns: FlashingCell[]
  ) => FlashingCellsRedux.FlashingCellSelectAllAction;
  onChangeFlashDuration: (
    flashingCell: FlashingCell,
    newFlashDuration: number
  ) => FlashingCellsRedux.FlashingCellChangeDurationAction;
  onChangeDownColorFlashingCell: (
    flashingCell: FlashingCell,
    DownColor: string
  ) => FlashingCellsRedux.FlashingCellChangeDownColorAction;
  onChangeUpColorFlashingCell: (
    flashingCell: FlashingCell,
    UpColor: string
  ) => FlashingCellsRedux.FlashingCellChangeUpColorAction;
}

class FlashingCellsPopupComponent extends React.Component<FlashingCellsPopupProps, {}> {
  constructor(props: FlashingCellsPopupProps) {
    super(props);
  }

  render() {
    let infoBody: any[] = [
      'Make numeric cells flash briefly as their value changes',
      <br />,
      <br />,
      "Click the 'Live' checkbox to turn on flashing for a particular column; or the 'All Columns' checkbox to turn on flashing for all Columns",
      <br />,
      <br />,
      'Defaults are Green for positive change, Red for negative change and a Duration of 0.5 seconds, but these can be amended for each column.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Live', Size: 1 },
      { Content: 'Column', Size: 4 },
      { Content: 'Flash Duration', Size: 3 },
      { Content: 'Up Colour', Size: 2 },
      { Content: 'Down Colour', Size: 2 },
    ];

    let flashingCellDurations: number[] = [250, 500, 750, 1000];

    let calculatedColumns: string[] = this.props.CalculatedColumns.map(c => c.ColumnId);
    let numericColumns = this.props.Columns.filter(c => c.DataType == DataType.Number);
    let numericNonCalcColumns = numericColumns.filter(c =>
      ArrayExtensions.NotContainsItem(calculatedColumns, c.ColumnId)
    );
    numericNonCalcColumns = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      numericNonCalcColumns,
      'FriendlyName'
    );

    let allPotentialFlashingCells: FlashingCell[] = [];
    let flashingCellState: FlashingCellState = this.props.Blotter.api.configApi.configGetFlashingCellState(
      false
    );
    numericNonCalcColumns.forEach(nc => {
      let existingfc = this.props.FlashingCells.find(e => e.ColumnId == nc.ColumnId);
      if (!existingfc) {
        allPotentialFlashingCells.push(
          ObjectFactory.CreateDefaultFlashingCell(
            nc,
            flashingCellState.DefaultUpColor,
            flashingCellState.DefautDownColor,
            flashingCellState.DefaultDuration
          )
        );
      } else {
        allPotentialFlashingCells.push(existingfc);
      }
    });

    let allFlashingCells = allPotentialFlashingCells.map((flashingcell: FlashingCell, index) => {
      return (
        <FlashingCellEntityRow
          AdaptableBlotterObject={flashingcell}
          key={flashingcell.ColumnId}
          Columns={this.props.Columns}
          UserFilters={null}
          colItems={colItems}
          FlashingCellDurations={flashingCellDurations}
          ColorPalette={this.props.ColorPalette}
          onSelect={flashingcell => this.props.onSelectColumn(flashingcell)}
          onChangeFlashingDuration={(flashingcell, newFlashDuration) =>
            this.props.onChangeFlashDuration(flashingcell, newFlashDuration)
          }
          onChangeDownColorFlashingCell={(flashingcell, DownColor) =>
            this.props.onChangeDownColorFlashingCell(flashingcell, DownColor)
          }
          onChangeUpColorFlashingCell={(flashingcell, UpColor) =>
            this.props.onChangeUpColorFlashingCell(flashingcell, UpColor)
          }
          TeamSharingActivated={false}
          onShare={null}
          onEdit={null}
          onDeleteConfirm={null}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let areAllLive: boolean = allPotentialFlashingCells.every(f => f.IsLive);
    let setAllOption = (
      <Box>
        <Checkbox
          marginLeft={2}
          onChange={() => this.props.onSelectAllColumns(!areAllLive, allPotentialFlashingCells)}
          checked={areAllLive}
        >
          All Columns
        </Checkbox>
      </Box>
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithImage
          variant="primary"
          header={StrategyConstants.FlashingCellsStrategyName}
          glyphicon={StrategyConstants.FlashingCellGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {setAllOption}
          <AdaptableObjectCollection
            colItems={colItems}
            items={allFlashingCells}
            reducedPanel={true}
          />
        </PanelWithImage>
      </Flex>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    FlashingCells: state.FlashingCell.FlashingCells,
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onSelectColumn: (flashingCell: FlashingCell) =>
      dispatch(FlashingCellsRedux.FlashingCellSelect(flashingCell)),
    onSelectAllColumns: (shouldTurnOn: boolean, numericColumns: FlashingCell[]) =>
      dispatch(FlashingCellsRedux.FlashingCellSelectAll(shouldTurnOn, numericColumns)),
    onChangeFlashDuration: (flashingCell: FlashingCell, newFlashDuration: number) =>
      dispatch(FlashingCellsRedux.FlashingCellChangeDuration(flashingCell, newFlashDuration)),
    onChangeDownColorFlashingCell: (flashingCell: FlashingCell, DownColor: string) =>
      dispatch(FlashingCellsRedux.FlashingCellChangeDownColor(flashingCell, DownColor)),
    onChangeUpColorFlashingCell: (flashingCell: FlashingCell, UpColor: string) =>
      dispatch(FlashingCellsRedux.FlashingCellChangeUpColor(flashingCell, UpColor)),
  };
}

export let FlashingCellsPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashingCellsPopupComponent);
