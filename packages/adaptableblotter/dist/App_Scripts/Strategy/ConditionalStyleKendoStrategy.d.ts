import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService';
import { AdaptableBlotter } from '../Vendors/Kendo/AdaptableBlotter';
export declare class ConditionalStyleKendoStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    InitStyles(): void;
}
