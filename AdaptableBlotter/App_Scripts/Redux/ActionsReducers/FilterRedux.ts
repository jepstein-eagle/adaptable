/// <reference path="../../../typings/index.d.ts" />

import { FilterState } from './Interface/IState';
import { INamedExpression } from '../../Core/interface/IExpression';
import { ColumnType } from '../../Core/Enums'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { StringExtensions } from '../../Core/Extensions';


export const FILTER_ADD_OR_UPDATE = 'FILTER_ADD_OR_UPDATE';
export const FILTER_DELETE = 'FILTER_DELETE';


export interface FilterAddOrUpdateAction extends Redux.Action {
    Filter: INamedExpression
}

export interface FilterDeleteAction extends Redux.Action {
    Filter: INamedExpression
}

export const AddEditFilter = (Filter: INamedExpression): FilterAddOrUpdateAction => ({
    type: FILTER_ADD_OR_UPDATE,
    Filter
})

export const DeleteFilter = (Filter: INamedExpression): FilterDeleteAction => ({
    type: FILTER_DELETE,
    Filter
})

const initialFilterState: FilterState = {
    Filters: []
}

export const FilterReducer: Redux.Reducer<FilterState> = (state: FilterState = initialFilterState, action: Redux.Action): FilterState => {
    let index: number;
    let filters: INamedExpression[]


    switch (action.type) {

        case FILTER_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<FilterAddOrUpdateAction>action)
            filters = [].concat(state.Filters)
            index = filters.findIndex(i => i.Uid == actionTypedAddUpdate.Filter.Uid)
            if (index != -1) {  // it exists
                filters[index] = actionTypedAddUpdate.Filter
            } else {
                filters.push(actionTypedAddUpdate.Filter)
            }
            return Object.assign({}, state, { Filters: filters })
        }

        case FILTER_DELETE: {
            let actionTypedDelete = (<FilterDeleteAction>action)
            filters = [].concat(state.Filters)
            index = filters.findIndex(i => i.Uid == actionTypedDelete.Filter.Uid)
            filters.splice(index, 1);
            return Object.assign({}, state, { Filters: filters })
        }

        default:
            return state
    }





}


export function CreatePredefinedExpressions(): Array<INamedExpression> {

    let _predefinedExpressions: INamedExpression[] = [];

    // Date Predefined Named Expressions
    this._predefinedExpressions.push({
        Uid: "Today",
        FriendlyName: "Today",
        Description: "Is Date Today",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (dateToCheck: Date): boolean => {
            let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
            return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "In Past",
        FriendlyName: "In Past",
        Description: "Is Date In Past",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (dateToCheck: Date): boolean => {
            return +dateToCheck < Date.now();
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "In Future",
        FriendlyName: "In Future",
        Description: "Is Date In Future",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (dateToCheck: Date): boolean => {
            return +dateToCheck > Date.now();
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "Yesterday",
        FriendlyName: "Yesterday",
        Description: "Is Date Yesterday",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (dateToCheck: Date): boolean => {
            let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
            return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "Tomorrow",
        FriendlyName: "Tomorrow",
        Description: "Is Date Tomorrow",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (dateToCheck: Date): boolean => {
            let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
            return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
        },
        IsPredefined: true
    });

    // Numeric Predefined Named Expressions
    this._predefinedExpressions.push({
        Uid: "Positive",
        FriendlyName: "Positive",
        Description: "Is Number Positive",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck > 0);
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "Negative",
        FriendlyName: "Negative",
        Description: "Is Number Negative",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck < 0);
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "Zero",
        FriendlyName: "Zero",
        Description: "Is Number Zero",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck == 0);
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "NumericBlanks",
        FriendlyName: "Blanks",
        Description: "Is Cell Empty",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck == null);
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "NumericNonBlanks",
        FriendlyName: "Non Blanks",
        Description: "Is Cell Populated",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck != null);
        },
        IsPredefined: true
    });


    // String Predefined Named Expressions
    this._predefinedExpressions.push({
        Uid: "StringBlanks",
        FriendlyName: "Blanks",
        Description: "Is Cell Empty",
        ColumnType: ColumnType.String,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (stringToCheck: string): boolean => {
            return (StringExtensions.IsNullOrEmpty(stringToCheck));
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "StringNonBlanks",
        FriendlyName: "Non Blanks",
        Description: "Is Cell Populated",
        ColumnType: ColumnType.String,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (stringToCheck: any): boolean => {
            return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
        },
        IsPredefined: true
    });

    // Boolean Predefined Named Expressions
    this._predefinedExpressions.push({
        Uid: "True",
        FriendlyName: "True",
        Description: "Is Value True",
        ColumnType: ColumnType.Boolean,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (boolToCheck: boolean): boolean => {
            return (boolToCheck);
        },
        IsPredefined: true
    });

    this._predefinedExpressions.push({
        Uid: "False",
        FriendlyName: "False",
        Description: "Is Value False",
        ColumnType: ColumnType.Boolean,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        isExpressionSatisfied: (boolToCheck: boolean): boolean => {
            return (!boolToCheck);
        },
        IsPredefined: true
    });


    return this._predefinedExpressions;

}