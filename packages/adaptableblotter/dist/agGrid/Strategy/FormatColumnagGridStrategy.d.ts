import { IFormatColumnStrategy } from '../../App_Scripts/Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../App_Scripts/Strategy/FormatColumnStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
export declare class FormatColumnagGridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    private blotterBypass;
    constructor(blotterBypass: AdaptableBlotter);
    protected InitStyles(): void;
}
