import { IConditionalStyleStrategy } from '../../App_Scripts/Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../App_Scripts/Strategy/ConditionalStyleStrategy';
import { IDataChangedEvent } from '../../App_Scripts/Core/Services/Interface/IAuditService';
import { AdaptableBlotter } from '../AdaptableBlotter';
export declare class ConditionalStyleHypergridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter);
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;
    InitStyles(): void;
}
