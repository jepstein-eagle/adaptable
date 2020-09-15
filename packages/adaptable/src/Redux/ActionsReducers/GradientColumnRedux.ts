import { GradientColumnState, GradientColumn } from '../../PredefinedConfig/GradientColumnState';
import * as Redux from 'redux';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const GRADIENT_COLUMN_ADD = 'GRADIENT_COLUMN_ADD';
export const GRADIENT_COLUMN_EDIT = 'GRADIENT_COLUMN_EDIT';
export const GRADIENT_COLUMN_DELETE = 'GRADIENT_COLUMN_DELETE';

export interface GradientColumnAction extends Redux.Action {
  gradientColumn: GradientColumn;
}

export interface GradientColumnAddAction extends GradientColumnAction {}

export interface GradientColumnEditAction extends GradientColumnAction {}

export interface GradientColumnDeleteAction extends GradientColumnAction {}

export const GradientColumnAdd = (gradientColumn: GradientColumn): GradientColumnAddAction => ({
  type: GRADIENT_COLUMN_ADD,
  gradientColumn,
});

export const GradientColumnEdit = (gradientColumn: GradientColumn): GradientColumnEditAction => ({
  type: GRADIENT_COLUMN_EDIT,
  gradientColumn,
});
export const GradientColumnDelete = (
  gradientColumn: GradientColumn
): GradientColumnDeleteAction => ({
  type: GRADIENT_COLUMN_DELETE,
  gradientColumn,
});

const initialGradientColumnState: GradientColumnState = {
  GradientColumns: EMPTY_ARRAY,
};

export const GradientColumnReducer: Redux.Reducer<GradientColumnState> = (
  state: GradientColumnState = initialGradientColumnState,
  action: Redux.Action
): GradientColumnState => {
  let GradientColumns: GradientColumn[];

  switch (action.type) {
    case GRADIENT_COLUMN_ADD: {
      const actionGradientColumn: GradientColumn = (action as GradientColumnAction).gradientColumn;

      if (!actionGradientColumn.Uuid) {
        actionGradientColumn.Uuid = createUuid();
      }
      GradientColumns = [].concat(state.GradientColumns);
      GradientColumns.push(actionGradientColumn);
      return { ...state, GradientColumns: GradientColumns };
    }

    case GRADIENT_COLUMN_EDIT: {
      const actionGradientColumn: GradientColumn = (action as GradientColumnAction).gradientColumn;
      return {
        ...state,
        GradientColumns: state.GradientColumns.map(abObject =>
          abObject.Uuid === actionGradientColumn.Uuid ? actionGradientColumn : abObject
        ),
      };
    }
    case GRADIENT_COLUMN_DELETE: {
      const actionGradientColumn: GradientColumn = (action as GradientColumnAction).gradientColumn;
      return {
        ...state,
        GradientColumns: state.GradientColumns.filter(
          abObject => abObject.Uuid !== actionGradientColumn.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
