import {
  CalculatedColumnState,
  CalculatedColumn,
} from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const CALCULATEDCOLUMN_ADD = 'CALCULATEDCOLUMN_ADD';
export const CALCULATEDCOLUMN_EDIT = 'CALCULATEDCOLUMN_EDIT';
export const CALCULATEDCOLUMN_DELETE = 'CALCULATEDCOLUMN_DELETE';

export interface CalculatedColumnAction extends Redux.Action {
  calculatedColumn: CalculatedColumn;
}

export interface CalculatedColumnAddAction extends CalculatedColumnAction {}

export interface CalculatedColumnEditAction extends CalculatedColumnAction {}

export interface CalculatedColumnDeleteAction extends CalculatedColumnAction {}

export const CalculatedColumnAdd = (
  calculatedColumn: CalculatedColumn
): CalculatedColumnAddAction => ({
  type: CALCULATEDCOLUMN_ADD,
  calculatedColumn,
});

export const CalculatedColumnEdit = (
  calculatedColumn: CalculatedColumn
): CalculatedColumnEditAction => ({
  type: CALCULATEDCOLUMN_EDIT,
  calculatedColumn,
});

export const CalculatedColumnDelete = (
  calculatedColumn: CalculatedColumn
): CalculatedColumnDeleteAction => ({
  type: CALCULATEDCOLUMN_DELETE,
  calculatedColumn,
});

const initialCalculatedColumnState: CalculatedColumnState = {
  CalculatedColumns: EMPTY_ARRAY,
};

export const CalculatedColumnReducer: Redux.Reducer<CalculatedColumnState> = (
  state: CalculatedColumnState = initialCalculatedColumnState,
  action: Redux.Action
): CalculatedColumnState => {
  let calculatedColumns: CalculatedColumn[];

  switch (action.type) {
    case CALCULATEDCOLUMN_ADD: {
      const actionCalculatedColumn: CalculatedColumn = (action as CalculatedColumnAction)
        .calculatedColumn;

      if (!actionCalculatedColumn.Uuid) {
        actionCalculatedColumn.Uuid = createUuid();
      }
      calculatedColumns = [].concat(state.CalculatedColumns);
      calculatedColumns.push(actionCalculatedColumn);
      return { ...state, CalculatedColumns: calculatedColumns };
    }

    case CALCULATEDCOLUMN_EDIT: {
      const actionCalculatedColumn: CalculatedColumn = (action as CalculatedColumnAction)
        .calculatedColumn;
      return {
        ...state,
        CalculatedColumns: state.CalculatedColumns.map(abObject =>
          abObject.Uuid === actionCalculatedColumn.Uuid ? actionCalculatedColumn : abObject
        ),
      };
    }

    case CALCULATEDCOLUMN_DELETE: {
      const actionCalculatedColumn: CalculatedColumn = (action as CalculatedColumnAction)
        .calculatedColumn;
      return {
        ...state,
        CalculatedColumns: state.CalculatedColumns.filter(
          abObject => abObject.Uuid !== actionCalculatedColumn.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
