import { AdaptableBlotter } from "./AdaptableBlotter";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";

export module BlotterFactoryAdaptableGrid {

    export function CreateAdaptableBlotter(blotterOptions: IAdaptableBlotterOptions): AdaptableBlotter {
        return new AdaptableBlotter(null, null, null)
    }

}