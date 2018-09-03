import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from './FormatColumnStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
export declare class FormatColumnagGridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    private blotterBypass;
    constructor(blotterBypass: AdaptableBlotter);
    protected InitStyles(): void;
}
