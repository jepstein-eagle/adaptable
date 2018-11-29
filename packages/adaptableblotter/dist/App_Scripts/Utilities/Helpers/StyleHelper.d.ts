import { IAdaptableBlotter } from "../../api/Interface/IAdaptableBlotter";
export declare module StyleHelper {
    function CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string;
    function CreateIndexedStyleName(strategyId: string, index: number, blotter: IAdaptableBlotter): string;
}
