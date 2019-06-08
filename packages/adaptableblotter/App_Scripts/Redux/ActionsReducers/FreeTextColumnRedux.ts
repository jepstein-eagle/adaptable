import { FreeTextColumnState } from './Interface/IState';
import * as Redux from 'redux';
import {
  IFreeTextColumn,
  IFreeTextStoredValue,
} from '../../Utilities/Interface/BlotterObjects/IFreeTextColumn';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const FREE_TEXT_COLUMN_ADD = 'FREE_TEXT_COLUMN_ADD';
export const FREE_TEXT_COLUMN_EDIT = 'FREE_TEXT_COLUMN_EDIT';
export const FREE_TEXT_COLUMN_DELETE = 'FREE_TEXT_COLUMN_DELETE';
export const FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = 'FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE';

export interface FreeTextColumnAction extends Redux.Action {
  freeTextColumn: IFreeTextColumn;
}

export interface FreeTextColumnAddAction extends FreeTextColumnAction {}

export interface FreeTextColumnEditAction extends FreeTextColumnAction {}

export interface FreeTextColumnDeleteAction extends FreeTextColumnAction {}

export interface FreeTextColumnAddEditStoredValueAction extends Redux.Action {
  FreeTextColumn: IFreeTextColumn;
  FreeTextStoredValue: IFreeTextStoredValue;
}

export const FreeTextColumnAdd = (freeTextColumn: IFreeTextColumn): FreeTextColumnAddAction => ({
  type: FREE_TEXT_COLUMN_ADD,
  freeTextColumn,
});

export const FreeTextColumnEdit = (freeTextColumn: IFreeTextColumn): FreeTextColumnEditAction => ({
  type: FREE_TEXT_COLUMN_EDIT,
  freeTextColumn,
});
export const FreeTextColumnDelete = (
  freeTextColumn: IFreeTextColumn
): FreeTextColumnDeleteAction => ({
  type: FREE_TEXT_COLUMN_DELETE,
  freeTextColumn,
});

export const FreeTextColumnAddEditStoredValue = (
  FreeTextColumn: IFreeTextColumn,
  FreeTextStoredValue: IFreeTextStoredValue
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
  let freeTextColumns: IFreeTextColumn[];

  switch (action.type) {
    case FREE_TEXT_COLUMN_ADD: {
      const actionFreeTextColumn: IFreeTextColumn = (action as FreeTextColumnAction).freeTextColumn;

      if (!actionFreeTextColumn.Uuid) {
        actionFreeTextColumn.Uuid = createUuid();
      }
      freeTextColumns = [].concat(state.FreeTextColumns);
      freeTextColumns.push(actionFreeTextColumn);
      return { ...state, FreeTextColumns: freeTextColumns };
    }

    case FREE_TEXT_COLUMN_EDIT:
      const actionFreeTextColumn: IFreeTextColumn = (action as FreeTextColumnAction).freeTextColumn;
      return {
        ...state,
        FreeTextColumns: state.FreeTextColumns.map(abObject =>
          abObject.Uuid === actionFreeTextColumn.Uuid ? actionFreeTextColumn : abObject
        ),
      };

    case FREE_TEXT_COLUMN_DELETE: {
      const actionFreeTextColumn: IFreeTextColumn = (action as FreeTextColumnAction).freeTextColumn;
      return {
        ...state,
        FreeTextColumns: state.FreeTextColumns.filter(
          abObject => abObject.Uuid !== actionFreeTextColumn.Uuid
        ),
      };
    }

    case FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
      let actionTypedAddEditStoredValue = <FreeTextColumnAddEditStoredValueAction>action;

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
