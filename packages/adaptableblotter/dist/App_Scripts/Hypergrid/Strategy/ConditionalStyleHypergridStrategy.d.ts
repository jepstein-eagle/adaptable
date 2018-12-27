import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
export declare class ConditionalStyleHypergridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void;
    InitStyles(): void;
}
