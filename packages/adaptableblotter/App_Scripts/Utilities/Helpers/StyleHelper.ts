import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { AB_HEADER } from "../../Utilities/Constants/StyleConstants";

export module StyleHelper {

    export function CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string {
        return AB_HEADER + strategyId + "-" + blotter.BlotterOptions.blotterId.trim().replace(/\s/g, "").replace('.', "")
    }

    export function CreateIndexedStyleName(strategyId: string, index: number, blotter: IAdaptableBlotter): string {
        return AB_HEADER + strategyId + "-" + index + "-" + blotter.BlotterOptions.blotterId.trim().replace(/\s/g, "").replace('.', "")
    }

}