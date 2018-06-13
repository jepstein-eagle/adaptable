import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';

export module StyleHelper {



    export function CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string {
        return "Ab-" + strategyId + "-" + blotter.BlotterOptions.blotterId.trim().replace(/\s/g, "")
    }


    export function CreateIndexedStyleName(strategyId: string, index: number, blotter: IAdaptableBlotter): string {
        return "Ab-" + strategyId + "-" + index + "-" + blotter.BlotterOptions.blotterId.trim().replace(/\s/g, "")
    }

}