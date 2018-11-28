import { IAlert } from '../../Core/Interface/IMessage';
export interface IStrategyActionReturn<T> {
    ActionReturn?: T;
    Alert?: IAlert;
}
