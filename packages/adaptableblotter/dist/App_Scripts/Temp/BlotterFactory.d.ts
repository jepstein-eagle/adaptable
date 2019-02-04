import { IAdaptableBlotterOptions } from "../Utilities/Interface/BlotterOptions/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../Utilities/Interface/IAdaptableBlotter";
export declare module BlotterFactory {
    function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions, vendorGridName: 'agGrid' | 'Hypergrid'): IAdaptableBlotter;
}
