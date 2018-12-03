import { IAlert } from '../../api/Interface/IMessage';
export interface IStrategyActionReturn<T> {
    ActionReturn?: T;
    Alert?: IAlert;
}
