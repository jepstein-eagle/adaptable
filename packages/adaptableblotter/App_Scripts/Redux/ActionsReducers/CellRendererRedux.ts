import * as Redux from 'redux';
import { CellRendererState } from './Interface/IState'
import { ICellRenderer, IPercentCellRenderer } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';

export const CELL_RENDERER_ADD_UPDATE = 'CELL_RENDERER_ADD_UPDATE';
export const CELL_RENDERER_DELETE = 'CELL_RENDERER_DELETE';

export interface CellRendererAddUpdateAction extends Redux.Action {
    Index: number,
    CellRenderer: IPercentCellRenderer
}

export interface CellRendererDeleteAction extends Redux.Action {
    Index: number,
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


const initialCellRendererState: CellRendererState   = {
    PercentCellRenderers: FilterHelper.TestGetCellRenderers()
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

          default:
            return state
    }
}