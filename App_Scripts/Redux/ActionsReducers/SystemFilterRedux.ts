import * as Redux from 'redux';
import { GridState, SystemFilterState } from './Interface/IState'
import { ICellInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';

const initialSystemFilterState: SystemFilterState = {
    SystemFilters: FilterHelper.CreateSystemFilters()
}

export const SystemFilterReducer: Redux.Reducer<SystemFilterState> = (state: SystemFilterState = initialSystemFilterState, action: Redux.Action): SystemFilterState => {
    switch (action.type) {
        default:
            return state
    }
}