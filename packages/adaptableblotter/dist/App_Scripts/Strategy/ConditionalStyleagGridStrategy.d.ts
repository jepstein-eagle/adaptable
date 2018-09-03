import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
export declare class ConditionalStyleagGridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    InitStyles(): void;
}
