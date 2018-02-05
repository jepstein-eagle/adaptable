import {  IUIError } from '../../Core/Interface/IMessage'
import * as Redux from 'redux';


export interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Error?: IUIError
}

