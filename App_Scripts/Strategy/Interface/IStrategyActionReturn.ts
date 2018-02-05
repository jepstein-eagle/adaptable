import {  IUIError } from '../../Core/Interface/IMessage'


export interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Error?: IUIError
}

