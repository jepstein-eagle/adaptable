import {  IAlert } from '../../Api/Interface/IMessage'


export interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Alert?: IAlert
}

