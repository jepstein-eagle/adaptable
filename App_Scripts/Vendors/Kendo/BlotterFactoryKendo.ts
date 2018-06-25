import { AdaptableBlotter } from "./AdaptableBlotter";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";

export module BlotterFactoryKendo {

    export function CreateAdaptableBlotter(blotterOptions: IAdaptableBlotterOptions): AdaptableBlotter {
        return new AdaptableBlotter(blotterOptions)
    }

}