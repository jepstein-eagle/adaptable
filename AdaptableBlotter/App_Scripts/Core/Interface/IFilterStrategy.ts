import { INamedExpression } from '../../Core/interface/IExpression';


// This is not the full filter strategy in the sense that we are not doing filters
// For now all we are doing is creating NamedExpressions that we can persist and then use in other Expressions


export interface IFilterStrategy{

        CreateEmptyFilter(): INamedExpression 
}
   

