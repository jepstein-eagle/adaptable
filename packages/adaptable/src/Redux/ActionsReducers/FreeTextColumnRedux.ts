import {
  FreeTextColumnState,
  FreeTextColumn,
  FreeTextStoredValue,
} from '../../PredefinedConfig/FreeTextColumnState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const FREE_TEXT_COLUMN_ADD = 'FREE_TEXT_COLUMN_ADD';
export const FREE_TEXT_COLUMN_SET = 'FREE_TEXT_COLUMN_SET';
export const FREE_TEXT_COLUMN_EDIT = 'FREE_TEXT_COLUMN_EDIT';
export const FREE_TEXT_COLUMN_DELETE = 'FREE_TEXT_COLUMN_DELETE';
export const FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = 'FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE';

export interface FreeTextColumnAction extends Redux.Action {
  freeTextColumn: FreeTextColumn;
}

export interface FreeTextColumnAddAction extends FreeTextColumnAction {}
export interface FreeTextColumnSetAction extends Redux.Action {
  freeTextColumns: FreeTextColumn[];
}
export interface FreeTextColumnEditAction extends Redux.Action {
  freeTextColumn: Partial<FreeTextColumn> & { ColumnId: string };
}

export interface FreeTextColumnDeleteAction extends FreeTextColumnAction {}

export interface FreeTextColumnAddEditStoredValueAction extends Redux.Action {
  FreeTextColumn: FreeTextColumn;
  FreeTextStoredValue: FreeTextStoredValue;
}

export const FreeTextColumnAdd = (freeTextColumn: FreeTextColumn): FreeTextColumnAddAction => ({
  type: FREE_TEXT_COLUMN_ADD,
  freeTextColumn,
});

export const FreeTextColumnSet = (freeTextColumns: FreeTextColumn[]): FreeTextColumnSetAction => ({
  type: FREE_TEXT_COLUMN_SET,
  freeTextColumns,
});

export const FreeTextColumnEdit = (
  freeTextColumn: Partial<FreeTextColumn> & { ColumnId: string }
): FreeTextColumnEditAction => ({
  type: FREE_TEXT_COLUMN_EDIT,
  freeTextColumn,
});
export const FreeTextColumnDelete = (
  freeTextColumn: FreeTextColumn
): FreeTextColumnDeleteAction => ({
  type: FREE_TEXT_COLUMN_DELETE,
  freeTextColumn,
});

export const FreeTextColumnAddEditStoredValue = (
  FreeTextColumn: FreeTextColumn,
  FreeTextStoredValue: FreeTextStoredValue
): FreeTextColumnAddEditStoredValueAction => ({
  type: FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
  FreeTextColumn,
  FreeTextStoredValue,
});

const initialFreeTextColumnState: FreeTextColumnState = {
  FreeTextColumns: EMPTY_ARRAY,
};

export const FreeTextColumnReducer: Redux.Reducer<FreeTextColumnState> = (
  state: FreeTextColumnState = initialFreeTextColumnState,
  action: Redux.Action
): FreeTextColumnState => {
  let freeTextColumns: FreeTextColumn[];

  switch (action.type) {
    case FREE_TEXT_COLUMN_ADD: {
      const actionFreeTextColumn: FreeTextColumn = (action as FreeTextColumnAction).freeTextColumn;

      if (!actionFreeTextColumn.Uuid) {
        actionFreeTextColumn.Uuid = createUuid();
      }
      freeTextColumns = [].concat(state.FreeTextColumns);
      freeTextColumns.push(actionFreeTextColumn);
      return { ...state, FreeTextColumns: freeTextColumns };
    }

    case FREE_TEXT_COLUMN_EDIT:
      const actionFreeTextColumn: FreeTextColumn = (action as FreeTextColumnAction).freeTextColumn;
      return {
        ...state,
        FreeTextColumns: state.FreeTextColumns.map(abObject =>
          abObject.Uuid === actionFreeTextColumn.Uuid
            ? // we need to assign and return the same object
              // in order to make working with aggrid easier, as the col getter
              // references this object
              Object.assign(abObject, actionFreeTextColumn)
            : abObject
        ),
      };

    case FREE_TEXT_COLUMN_SET:
      const actionFreeTextColumns: FreeTextColumn[] = (action as FreeTextColumnSetAction)
        .freeTextColumns;
      return {
        ...state,
        FreeTextColumns: actionFreeTextColumns,
      };

    case FREE_TEXT_COLUMN_DELETE: {
      const actionFreeTextColumn: FreeTextColumn = (action as FreeTextColumnAction).freeTextColumn;
      return {
        ...state,
        FreeTextColumns: state.FreeTextColumns.filter(
          abObject => abObject.Uuid !== actionFreeTextColumn.Uuid
        ),
      };
    }

    case FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
      const actionTypedAddEditStoredValue = action as FreeTextColumnAddEditStoredValueAction;

      let existingIndex: number = actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues.findIndex(
        ftsv => ftsv.PrimaryKey == actionTypedAddEditStoredValue.FreeTextStoredValue.PrimaryKey
      );
      if (existingIndex != -1) {
        actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues[existingIndex] =
          actionTypedAddEditStoredValue.FreeTextStoredValue;
      } else {
        actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues.push(
          actionTypedAddEditStoredValue.FreeTextStoredValue
        );
      }
      freeTextColumns = [].concat(state.FreeTextColumns);
      let index = freeTextColumns.findIndex(
        x => x.ColumnId == actionTypedAddEditStoredValue.FreeTextColumn.ColumnId
      );
      freeTextColumns[index] = actionTypedAddEditStoredValue.FreeTextColumn;
      return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
    }
    default:
      return state;
  }
};
