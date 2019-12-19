import { Reducer } from 'react';
import { FileDroppableState } from './FileDroppableState';

export enum ActionTypes {
  DRAG_OVER = 'DRAG_OVER',
  DRAG_OUT = 'DRAG_OUT',
  SET_INVALID_FILE = 'SET_INVALID_FILE',
  DROP_SUCCES = 'DROP_SUCCES',
}

export interface Action {
  type: ActionTypes;
  payload?: any;
}
const reducer: Reducer<FileDroppableState, any> = (state: FileDroppableState, action: Action) => {
  if (action.type === ActionTypes.DRAG_OVER) {
    return {
      ...state,
      dragOver: true,
    };
  }

  if (action.type === ActionTypes.DRAG_OUT) {
    return {
      ...state,
      dragOver: false,
    };
  }

  if (action.type === ActionTypes.SET_INVALID_FILE) {
    return {
      ...state,
      message: action.payload.message,
    };
  }

  if (action.type === ActionTypes.DROP_SUCCES) {
    return {
      ...state,
      dragOver: false,
      message: action.payload.message,
    };
  }

  return state;
};

export default reducer;
