import * as Redux from 'redux';
import { CellRendererState } from './Interface/IState'
import { IPercentCellRenderer } from '../../Core/Api/Interface/IAdaptableBlotterObjects';

export const CELL_RENDERER_ADD_UPDATE = 'CELL_RENDERER_ADD_UPDATE';
export const CELL_RENDERER_DELETE = 'CELL_RENDERER_DELETE';
export const CELL_RENDERER_CHANGE_POSITIVE_COLOR = 'CELL_RENDERER_CHANGE_POSITIVE_COLOR';
export const CELL_RENDERER_CHANGE_NEGATIVE_COLOR = 'CELL_RENDERER_CHANGE_NEGATIVE_COLOR';

export interface CellRendererAddUpdateAction extends Redux.Action {
    Index: number,
    CellRenderer: IPercentCellRenderer
}

export interface CellRendererDeleteAction extends Redux.Action {
    Index: number,
}

export interface CellRendererChangePositiveColorAction extends Redux.Action {
   CellRenderer: IPercentCellRenderer,
   PositiveColor: string
}

export interface CellRendererChangeNegativeColorAction extends Redux.Action {
   CellRenderer: IPercentCellRenderer,
  NegativeColor: string
}

export const CellRendererAddUpdate = (Index: number, CellRenderer: IPercentCellRenderer): CellRendererAddUpdateAction => ({
    type: CELL_RENDERER_ADD_UPDATE,
    Index,
    CellRenderer
})

export const CellRendererDelete = (Index: number): CellRendererDeleteAction => ({
    type: CELL_RENDERER_DELETE,
    Index,
})

export const CellRendererChangePositiveColor= (CellRenderer: IPercentCellRenderer, PositiveColor: string): CellRendererChangePositiveColorAction => ({
    type: CELL_RENDERER_CHANGE_POSITIVE_COLOR,
    CellRenderer,
    PositiveColor
})

export const CellRendererChangeNegativeColor= (CellRenderer: IPercentCellRenderer, NegativeColor: string): CellRendererChangeNegativeColorAction => ({
    type: CELL_RENDERER_CHANGE_NEGATIVE_COLOR,
    CellRenderer,
    NegativeColor
})

const initialCellRendererState: CellRendererState   = {
    PercentCellRenderers: []
}

export const CellRendererReducer: Redux.Reducer<CellRendererState> = (state: CellRendererState = initialCellRendererState, action: Redux.Action): CellRendererState => {
    let PercentCellRenderers: IPercentCellRenderer[]

    switch (action.type) {

        case CELL_RENDERER_ADD_UPDATE: {
            let actionTyped = (<CellRendererAddUpdateAction>action)
            PercentCellRenderers = [].concat(state.PercentCellRenderers)
            if (actionTyped.Index == -1) {
                PercentCellRenderers.push(actionTyped.CellRenderer)
            } else {
                PercentCellRenderers[actionTyped.Index] = actionTyped.CellRenderer
            }
            return Object.assign({}, state, { PercentCellRenderers: PercentCellRenderers })
        }

        case CELL_RENDERER_DELETE: {
            PercentCellRenderers = [].concat(state.PercentCellRenderers)
            PercentCellRenderers.splice((<CellRendererDeleteAction>action).Index, 1)
            return Object.assign({}, state, { PercentCellRenderers: PercentCellRenderers })
        }

        case CELL_RENDERER_CHANGE_POSITIVE_COLOR: {
          let actionTyped = <CellRendererChangePositiveColorAction>action
           let percentCellRenderer = actionTyped.CellRenderer
           let items: Array<IPercentCellRenderer> = [].concat(state.PercentCellRenderers);
           let index = items.findIndex(i => i == percentCellRenderer)
           if (index != -1) {  // it exists
               items[index] = Object.assign({}, percentCellRenderer, { PositiveColor: actionTyped.PositiveColor })
           } else {
               items.push(Object.assign({}, percentCellRenderer, { PositiveColor: actionTyped.PositiveColor }));
           }
           return Object.assign({}, state, {
               PercentCellRenderers: items
           });
        }

        case CELL_RENDERER_CHANGE_NEGATIVE_COLOR: {
            let actionTyped = <CellRendererChangeNegativeColorAction>action
            let percentCellRenderer = actionTyped.CellRenderer
            let items: Array<IPercentCellRenderer> = [].concat(state.PercentCellRenderers);
            let index = items.findIndex(i => i == percentCellRenderer)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, percentCellRenderer, { NegativeColor: actionTyped.NegativeColor })
            } else {
                items.push(Object.assign({}, percentCellRenderer, { NegativeColor: actionTyped.NegativeColor }));
            }
            return Object.assign({}, state, {
                PercentCellRenderers: items
            });
        }

          default:
            return state
    }
}