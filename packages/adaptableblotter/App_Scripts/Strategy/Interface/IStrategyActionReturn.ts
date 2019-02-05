import { IAdaptableAlert } from "../../Utilities/Interface/IMessage";

export interface IStrategyActionReturn<T> {
    ActionReturn?: T,
    Alert?: IAdaptableAlert
}

