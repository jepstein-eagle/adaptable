import * as React from "react";
import { IColumnFilterContext } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { Expression } from "../../../Core/Api/Expression";
import { KeyValuePair } from '../../UIInterfaces';
export interface FloatingFilterFormState {
    floatingFilterFormText: string;
    filterExpression: Expression;
    numberOperatorPairs: KeyValuePair[];
    stringOperatorPairs: KeyValuePair[];
    placeholder: string;
}
export declare let FloatingFilterForm: React.ComponentClass<any, any>;
export declare const FloatingFilterFormReact: (FilterContext: IColumnFilterContext) => JSX.Element;
