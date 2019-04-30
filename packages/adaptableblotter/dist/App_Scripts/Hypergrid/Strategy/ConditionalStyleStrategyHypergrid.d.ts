import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IDataChangedInfo } from '../../Utilities/Interface/IDataChangedInfo';
export declare class ConditionalStyleStrategyHypergrid extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void;
    InitStyles(): void;
}
