import { FormatColumnStrategy } from './FormatColumnStrategy';
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class FormatColumnKendoStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected InitStyles(): void;
}
