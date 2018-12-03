import { IAdaptableBlotterOptions } from "./../api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../api/Interface/IAdaptableBlotter";
export declare module BlotterFactory {
    function CreateAdaptableBlotter(adaptableBlotterOptions: IAdaptableBlotterOptions, vendorGridName: 'agGrid' | 'Hypergrid'): IAdaptableBlotter;
}
