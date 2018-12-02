import { IFormatColumnStrategy } from '../../Strategy/Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from '../../Strategy/FormatColumnStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
export declare class FormatColumnagGridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    private blotterBypass;
    constructor(blotterBypass: AdaptableBlotter);
    protected InitStyles(): void;
}
