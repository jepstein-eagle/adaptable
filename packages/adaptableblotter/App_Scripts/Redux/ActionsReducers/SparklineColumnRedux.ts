import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

import { createUuid } from '../../PredefinedConfig/Uuid';
import {
  SparklineColumnState,
  SparklineColumn,
} from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export const SPARKLINE_COLUMNS_SET = 'SPARKLINE_COLUMNS_SET';
export const SPARKLINE_COLUMNS_ADD = 'SPARKLINE_COLUMNS_ADD';
export const SPARKLINE_COLUMNS_EDIT = 'SPARKLINE_COLUMNS_EDIT';
export const SPARKLINE_COLUMNS_DELETE = 'SPARKLINE_COLUMNS_DELETE';

export interface SparklineColumnAction extends Redux.Action {}

export interface SparklineColumnAddAction extends SparklineColumnAction {
  sparklineColumn: SparklineColumn;
}

export interface SparklineColumnEditAction extends SparklineColumnAction {
  sparklineColumn: SparklineColumn;
}

export interface SparklineColumnDeleteAction extends SparklineColumnAction {
  sparklineColumn: SparklineColumn;
}

export interface SparklineColumnsSetAction extends SparklineColumnAction {
  Columns: SparklineColumn[];
}

export const SparklineColumnsSet = (Columns: SparklineColumn[]): SparklineColumnsSetAction => ({
  type: SPARKLINE_COLUMNS_SET,
  Columns,
});

export const SparklineColumnsAdd = (
  sparklineColumn: SparklineColumn
): SparklineColumnAddAction => ({
  type: SPARKLINE_COLUMNS_ADD,
  sparklineColumn,
});

export const SparklineColumnsEdit = (
  sparklineColumn: SparklineColumn
): SparklineColumnAddAction => ({
  type: SPARKLINE_COLUMNS_EDIT,
  sparklineColumn,
});

export const SparklineColumnsDelete = (
  sparklineColumn: SparklineColumn
): SparklineColumnAddAction => ({
  type: SPARKLINE_COLUMNS_DELETE,
  sparklineColumn,
});

const initialFilterState: SparklineColumnState = {
  Columns: EMPTY_ARRAY,
};

export const SparklineColumnReducer: Redux.Reducer<SparklineColumnState> = (
  state: SparklineColumnState = initialFilterState,
  action: Redux.Action
): SparklineColumnState => {
  let sparklineColumns: SparklineColumn[];
  switch (action.type) {
    case SPARKLINE_COLUMNS_SET:
      return Object.assign({}, state, {
        Columns: (<SparklineColumnsSetAction>action).Columns,
      });

    case SPARKLINE_COLUMNS_ADD: {
      const actionSparklineColumn: SparklineColumn = (action as SparklineColumnAddAction)
        .sparklineColumn;

      if (!actionSparklineColumn.Uuid) {
        actionSparklineColumn.Uuid = createUuid();
      }
      sparklineColumns = [].concat(state.Columns);
      sparklineColumns.push(actionSparklineColumn);
      return { ...state, Columns: sparklineColumns };
    }

    case SPARKLINE_COLUMNS_EDIT: {
      const actionSparklineColumn: SparklineColumn = (action as SparklineColumnEditAction)
        .sparklineColumn;
      return {
        ...state,
        Columns: state.Columns.map(abObject =>
          abObject.Uuid === actionSparklineColumn.Uuid ? actionSparklineColumn : abObject
        ),
      };
    }
    case SPARKLINE_COLUMNS_DELETE: {
      const actionSparklineColumn: SparklineColumn = (action as SparklineColumnDeleteAction)
        .sparklineColumn;
      return {
        ...state,
        Columns: state.Columns.filter(abObject => abObject.Uuid !== actionSparklineColumn.Uuid),
      };
    }

    default:
      return state;
  }
};
