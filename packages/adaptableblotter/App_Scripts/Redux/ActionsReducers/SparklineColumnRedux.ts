import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import {
  SparklineColumnState,
  SparklineColumn,
} from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export const SPARKLINE_COLUMNS_SET = 'SPARKLINE_COLUMNS_SET';

export interface SparklineColumnsSetAction extends Redux.Action {
  Columns: SparklineColumn[];
}

export const SparklineColumnsSet = (Columns: SparklineColumn[]): SparklineColumnsSetAction => ({
  type: SPARKLINE_COLUMNS_SET,
  Columns,
});

const initialFilterState: SparklineColumnState = {
  Columns: EMPTY_ARRAY,
};

export const SparklineColumnReducer: Redux.Reducer<SparklineColumnState> = (
  state: SparklineColumnState = initialFilterState,
  action: Redux.Action
): SparklineColumnState => {
  switch (action.type) {
    case SPARKLINE_COLUMNS_SET:
      return Object.assign({}, state, {
        Columns: (<SparklineColumnsSetAction>action).Columns,
      });

    default:
      return state;
  }
};
