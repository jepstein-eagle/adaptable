import { AdaptableBlotter } from "./AdaptableBlotter";
import { IAdaptableBlotterOptions } from "../App_Scripts/Api/Interface/IAdaptableBlotterOptions";

export module BlotterFactoryAgGrid {

    export function CreateAdaptableBlotter(blotterOptions: IAdaptableBlotterOptions, renderGrid: boolean): AdaptableBlotter {
        return new AdaptableBlotter(blotterOptions, renderGrid)
    }

}

