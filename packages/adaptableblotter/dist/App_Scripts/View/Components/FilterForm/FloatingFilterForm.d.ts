import * as React from "react";
import { IColumnFilterContext } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { Expression } from "../../../Api/Expression";
import { IKeyValuePair } from '../../../Api/Interface/Interfaces';
export interface FloatingFilterFormState {
    floatingFilterFormText: string;
    filterExpression: Expression;
    numberOperatorPairs: IKeyValuePair[];
    stringOperatorPairs: IKeyValuePair[];
    dateOperatorPairs: IKeyValuePair[];
    placeholder: string;
}
export declare let FloatingFilterForm: React.ComponentClass<any, any>;
export declare const FloatingFilterFormReact: (FilterContext: IColumnFilterContext) => JSX.Element;
