import { AdaptableBlotter } from "./AdaptableBlotter";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";

export module BlotterFactoryAgGrid {

    export function CreateAdaptableBlotter(blotterOptions: IAdaptableBlotterOptions, renderGrid: boolean): AdaptableBlotter {
        return new AdaptableBlotter(blotterOptions, renderGrid)
    }

}

