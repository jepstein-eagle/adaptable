import { FlashingCellState, FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import * as Redux from 'redux';
import {
  FLASHING_CELLS_DEFAULT_DURATION,
  EMPTY_ARRAY,
} from '../../Utilities/Constants/GeneralConstants';
import { getHexForName, DARK_GREEN, RED } from '../../View/UIHelper';

export const FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
export const FLASHING_CELL_SELECT_ALL = 'FLASHING_CELL_SELECT_ALL';
export const FLASHING_CELL_CHANGE_UP_COLOR = 'FLASHING_CELL_CHANGE_UP_COLOR';
export const FLASHING_CELL_CHANGE_DOWN_COLOR = 'FLASHING_CELL_CHANGE_DOWN_COLOR';
export const FLASHING_CELL_CHANGE_DURATION = 'FLASHING_CELL_CHANGE_DURATION';

export interface FlashingCellSelectAction extends Redux.Action {
  FlashingCell: FlashingCell;
}

export interface FlashingCellSelectAllAction extends Redux.Action {
  FlashingCells: FlashingCell[];
  shouldTurnOn: boolean;
}

export interface FlashingCellChangeDurationAction extends Redux.Action {
  FlashingCell: FlashingCell;
  NewFlashDuration: number;
}

export interface FlashingCellChangeUpColorAction extends Redux.Action {
  FlashingCell: FlashingCell;
  UpColor: string;
}

export interface FlashingCellChangeDownColorAction extends Redux.Action {
  FlashingCell: FlashingCell;
  DownColor: string;
}

export const FlashingCellSelect = (FlashingCell: FlashingCell): FlashingCellSelectAction => ({
  type: FLASHING_CELL_SELECT,
  FlashingCell,
});

export const FlashingCellSelectAll = (
  shouldTurnOn: boolean,
  FlashingCells: FlashingCell[]
): FlashingCellSelectAllAction => ({
  type: FLASHING_CELL_SELECT_ALL,
  shouldTurnOn,
  FlashingCells,
});

export const FlashingCellChangeDuration = (
  FlashingCell: FlashingCell,
  NewFlashDuration: number
): FlashingCellChangeDurationAction => ({
  type: FLASHING_CELL_CHANGE_DURATION,
  FlashingCell,
  NewFlashDuration,
});

export const FlashingCellChangeUpColor = (
  FlashingCell: FlashingCell,
  UpColor: string
): FlashingCellChangeUpColorAction => ({
  type: FLASHING_CELL_CHANGE_UP_COLOR,
  FlashingCell,
  UpColor,
});

export const FlashingCellChangeDownColor = (
  FlashingCell: FlashingCell,
  DownColor: string
): FlashingCellChangeDownColorAction => ({
  type: FLASHING_CELL_CHANGE_DOWN_COLOR,
  FlashingCell,
  DownColor,
});

const initialFlashingCellState: FlashingCellState = {
  FlashingCells: EMPTY_ARRAY,
  DefaultUpColor: getHexForName(DARK_GREEN),
  DefautDownColor: getHexForName(RED),
  DefaultDuration: FLASHING_CELLS_DEFAULT_DURATION,
};

export const FlashingCellReducer: Redux.Reducer<FlashingCellState> = (
  state: FlashingCellState = initialFlashingCellState,
  action: Redux.Action
): FlashingCellState => {
  switch (action.type) {
    case FLASHING_CELL_SELECT: {
      let selectedFlashingCell = (action as FlashingCellSelectAction).FlashingCell;
      let items: Array<FlashingCell> = [].concat(state.FlashingCells);
      selectedFlashingCell = Object.assign({}, selectedFlashingCell, {
        IsLive: !selectedFlashingCell.IsLive,
      });
      let index = items.findIndex(x => x.ColumnId == selectedFlashingCell.ColumnId);
      if (index != -1) {
        // it exists
        items[index] = selectedFlashingCell;
      } else {
        items.push(selectedFlashingCell);
      }
      return Object.assign({}, state, {
        FlashingCells: items,
      });
    }
    case FLASHING_CELL_SELECT_ALL: {
      let flashingCells: Array<FlashingCell> = (action as FlashingCellSelectAllAction)
        .FlashingCells;
      let shouldTurnOn = (action as FlashingCellSelectAllAction).shouldTurnOn;
      let items: Array<FlashingCell> = [].concat(state.FlashingCells);
      flashingCells.forEach(column => {
        let index = items.findIndex(i => i.ColumnId == column.ColumnId);
        if (index != -1) {
          // it exists
          items[index] = Object.assign({}, column, { IsLive: shouldTurnOn });
        } else {
          items.push(Object.assign({}, column, { IsLive: shouldTurnOn }));
        }
      });
      return Object.assign({}, state, {
        FlashingCells: items,
      });
    }
    case FLASHING_CELL_CHANGE_DURATION: {
      const actionTyped = action as FlashingCellChangeDurationAction;
      let flashingCell = actionTyped.FlashingCell;
      let items: Array<FlashingCell> = [].concat(state.FlashingCells);
      let index = items.findIndex(i => i == flashingCell);
      if (index != -1) {
        // it exists
        items[index] = Object.assign({}, flashingCell, {
          FlashingCellDuration: actionTyped.NewFlashDuration,
        });
      } else {
        items.push(
          Object.assign({}, flashingCell, { FlashingCellDuration: actionTyped.NewFlashDuration })
        );
      }
      return Object.assign({}, state, {
        FlashingCells: items,
      });
    }
    //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
    case FLASHING_CELL_CHANGE_UP_COLOR: {
      const actionTyped = action as FlashingCellChangeUpColorAction;
      let flashingCell = actionTyped.FlashingCell;
      let items: Array<FlashingCell> = [].concat(state.FlashingCells);
      let index = items.findIndex(i => i == flashingCell);
      if (index != -1) {
        // it exists
        items[index] = Object.assign({}, flashingCell, { UpColor: actionTyped.UpColor });
      } else {
        items.push(Object.assign({}, flashingCell, { UpColor: actionTyped.UpColor }));
      }
      return Object.assign({}, state, {
        FlashingCells: items,
      });
    }
    //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
    case FLASHING_CELL_CHANGE_DOWN_COLOR: {
      const actionTyped = action as FlashingCellChangeDownColorAction;
      let flashingCell = actionTyped.FlashingCell;
      let items: Array<FlashingCell> = [].concat(state.FlashingCells);
      let index = items.findIndex(i => i == flashingCell);
      if (index != -1) {
        // it exists
        items[index] = Object.assign({}, flashingCell, { DownColor: actionTyped.DownColor });
      } else {
        items.push(Object.assign({}, flashingCell, { DownColor: actionTyped.DownColor }));
      }
      return Object.assign({}, state, {
        FlashingCells: items,
      });
    }
    default:
      return state;
  }
};
