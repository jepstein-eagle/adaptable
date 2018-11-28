import { IConditionalStyleStrategy } from '../../App_Scripts/Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../App_Scripts/Strategy/ConditionalStyleStrategy';
import { IDataChangedEvent } from '../../App_Scripts/Utilities/Services/Interface/IAuditService';
import { AdaptableBlotter } from '../AdaptableBlotter';
export declare class ConditionalStyleagGridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    InitStyles(): void;
}
