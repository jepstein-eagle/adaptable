import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { FormatColumnStrategy } from './FormatColumnStrategy';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter';
export declare class FormatColumnHypergridStrategy extends FormatColumnStrategy implements IFormatColumnStrategy {
    private blotterBypass;
    constructor(blotterBypass: AdaptableBlotter);
    protected InitStyles(): void;
}
