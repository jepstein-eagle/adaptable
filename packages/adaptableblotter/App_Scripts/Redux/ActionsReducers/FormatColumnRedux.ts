import { FormatColumnState, FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const FORMAT_COLUMN_ADD = 'FORMAT_COLUMN_ADD';
export const FORMAT_COLUMN_EDIT = 'FORMAT_COLUMN_EDIT';
export const FORMAT_COLUMN_DELETE = 'FORMAT_COLUMN_DELETE';

export interface FormatColumnAction extends Redux.Action {
  formatColumn: FormatColumn;
}

export interface FormatColumnAddAction extends FormatColumnAction {}

export interface FormatColumnEditAction extends FormatColumnAction {}

export interface FormatColumnDeleteAction extends FormatColumnAction {}

export const FormatColumnAdd = (formatColumn: FormatColumn): FormatColumnAddAction => ({
  type: FORMAT_COLUMN_ADD,
  formatColumn,
});

export const FormatColumnEdit = (formatColumn: FormatColumn): FormatColumnEditAction => ({
  type: FORMAT_COLUMN_EDIT,
  formatColumn,
});
export const FormatColumnDelete = (formatColumn: FormatColumn): FormatColumnDeleteAction => ({
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
  let formatColumns: FormatColumn[];

  switch (action.type) {
    case FORMAT_COLUMN_ADD: {
      const actionFormatColumn: FormatColumn = (action as FormatColumnAction).formatColumn;

      if (!actionFormatColumn.Uuid) {
        actionFormatColumn.Uuid = createUuid();
      }
      formatColumns = [].concat(state.FormatColumns);
      formatColumns.push(actionFormatColumn);
      return { ...state, FormatColumns: formatColumns };
    }

    case FORMAT_COLUMN_EDIT:
      const actionFormatColumn: FormatColumn = (action as FormatColumnAction).formatColumn;
      return {
        ...state,
        FormatColumns: state.FormatColumns.map(abObject =>
          abObject.Uuid === actionFormatColumn.Uuid ? actionFormatColumn : abObject
        ),
      };

    case FORMAT_COLUMN_DELETE: {
      const actionFormatColumn: FormatColumn = (action as FormatColumnAction).formatColumn;
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
