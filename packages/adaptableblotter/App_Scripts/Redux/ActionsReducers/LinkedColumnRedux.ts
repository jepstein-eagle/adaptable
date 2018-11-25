import * as Redux from 'redux';
import { LinkedColumnState } from './Interface/IState'
import { InputAction } from '../../Core/Interface/IMessage';

export const LinkedColumn_SELECT = 'LinkedColumn_SELECT';



const initialLinkedColumnState: LinkedColumnState = {
     LinkedColumns: []
}

export const LinkedColumnReducer: Redux.Reducer<LinkedColumnState> = (state: LinkedColumnState = initialLinkedColumnState, action: Redux.Action): LinkedColumnState => {
    switch (action.type) {
             default:
            return state
    }
}