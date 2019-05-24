import { FormatColumnState } from './Interface/IState';
import * as Redux from 'redux';
import { IFormatColumn } from '../../Utilities/Interface/BlotterObjects/IFormatColumn';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const FORMAT_COLUMN_ADD = 'FORMAT_COLUMN_ADD';
export const FORMAT_COLUMN_EDIT = 'FORMAT_COLUMN_EDIT';
export const FORMAT_COLUMN_DELETE = 'FORMAT_COLUMN_DELETE';

export interface FormatColumnAction extends Redux.Action {
  formatColumn: IFormatColumn;
}

export interface FormatColumnAddAction extends FormatColumnAction {}

export interface FormatColumnEditAction extends FormatColumnAction {}

export interface FormatColumnDeleteAction extends FormatColumnAction {}

export const FormatColumnAdd = (formatColumn: IFormatColumn): FormatColumnAddAction => ({
  type: FORMAT_COLUMN_ADD,
  formatColumn,
});

export const FormatColumnEdit = (formatColumn: IFormatColumn): FormatColumnEditAction => ({
  type: FORMAT_COLUMN_EDIT,
  formatColumn,
});
export const FormatColumnDelete = (formatColumn: IFormatColumn): FormatColumnDeleteAction => ({
  type: FORMAT_COLUMN_DELETE,
  formatColumn,
});

const initialFormatColumnState: FormatColumnState = {
  FormatColumns: EMPTY_ARRAY,
};

export const FormatColumnReducer: Redux.Reducer<FormatColumnState> = (
  state: FormatColumnState = initialFormatColumnState,
  action: Redux.Action
): FormatColumnState => {
  let formatColumns: IFormatColumn[];

  switch (action.type) {
    case FORMAT_COLUMN_ADD: {
      const actionFormatColumn: IFormatColumn = (action as FormatColumnAction).formatColumn;

      if (!actionFormatColumn.Uuid) {
        actionFormatColumn.Uuid = createUuid();
      }
      formatColumns = [].concat(state.FormatColumns);
      formatColumns.push(actionFormatColumn);
      return { ...state, FormatColumns: formatColumns };
    }

    case FORMAT_COLUMN_EDIT:
      const actionFormatColumn: IFormatColumn = (action as FormatColumnAction).formatColumn;
      return {
        ...state,
        FormatColumns: state.FormatColumns.map(abObject =>
          abObject.Uuid === actionFormatColumn.Uuid ? actionFormatColumn : abObject
        ),
      };

    case FORMAT_COLUMN_DELETE: {
      const actionFormatColumn: IFormatColumn = (action as FormatColumnAction).formatColumn;
      return {
        ...state,
        FormatColumns: state.FormatColumns.filter(
          abObject => abObject.Uuid !== actionFormatColumn.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
