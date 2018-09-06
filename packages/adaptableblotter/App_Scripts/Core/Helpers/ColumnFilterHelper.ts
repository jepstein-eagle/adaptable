import { ExpressionHelper } from './ExpressionHelper'
import { IUserFilter, IColumnFilter } from '../Api/Interface/AdaptableBlotterObjects';


export module ColumnFilterHelper {

    export function CreateColumnFilterFromUserFilter(userFilter: IUserFilter): IColumnFilter {
        return {
            ColumnId: userFilter.ColumnId,
            Filter: ExpressionHelper.CreateSingleColumnExpression(userFilter.ColumnId, [],[], [userFilter.Name], []),
            IsReadOnly: false
        }
    }

}

