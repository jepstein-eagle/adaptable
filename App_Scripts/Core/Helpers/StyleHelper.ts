import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { DataType } from '../Enums'
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { StringExtensions } from '../Extensions/StringExtensions'
import { Helper } from './Helper';
import { IColumn } from '../Interface/IColumn';
import { IUserFilter } from '../Api/Interface/AdaptableBlotterObjects';


export module StyleHelper {



    export function CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string {
        return "Ab-" + strategyId + "-" + blotter.BlotterOptions.blotterId.trim().replace(" ", "")
    }


    export function CreateIndexedStyleName(strategyId: string, index: number, blotter: IAdaptableBlotter): string {
        return "Ab-" + strategyId + "-" + index + "-" + blotter.BlotterOptions.blotterId.trim().replace(" ", "")
    }

}