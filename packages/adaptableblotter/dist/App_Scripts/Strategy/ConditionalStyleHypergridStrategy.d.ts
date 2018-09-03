import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter';
export declare class ConditionalStyleHypergridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    InitStyles(): void;
}
