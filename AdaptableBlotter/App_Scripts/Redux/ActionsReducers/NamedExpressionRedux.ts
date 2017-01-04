/// <reference path="../../../typings/index.d.ts" />

import { NamedExpressionState } from './Interface/IState';
import { INamedExpression } from '../../Core/interface/IExpression';
import { ColumnType } from '../../Core/Enums'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { StringExtensions } from '../../Core/Extensions';


export const NAMED_EXPRESSION_ADD_OR_UPDATE = 'NAMED_EXPRESSION_ADD_OR_UPDATE';
export const NAMED_EXPRESSION_DELETE = 'NAMED_EXPRESSION_DELETE';


export interface NamedExpressionAddOrUpdateAction extends Redux.Action {
    NamedExpression: INamedExpression
}

export interface NamedExpressionDeleteAction extends Redux.Action {
    NamedExpression: INamedExpression
}

export const AddEditNamedExpression = (NamedExpression: INamedExpression): NamedExpressionAddOrUpdateAction => ({
    type: NAMED_EXPRESSION_ADD_OR_UPDATE,
    NamedExpression
})

export const DeleteNamedExpression = (NamedExpression: INamedExpression): NamedExpressionDeleteAction => ({
    type: NAMED_EXPRESSION_DELETE,
    NamedExpression
})

const initialNamedExpressionState:
    NamedExpressionState = {
        NamedExpressions: CreatePredefinedExpressions(),
    }

export const NamedExpressionReducer: Redux.Reducer<NamedExpressionState> = (state: NamedExpressionState = initialNamedExpressionState, action: Redux.Action): NamedExpressionState => {
    let index: number;
    let namedExpressions: INamedExpression[]


    switch (action.type) {

        case NAMED_EXPRESSION_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<NamedExpressionAddOrUpdateAction>action)
            namedExpressions = [].concat(state.NamedExpressions)
            index = namedExpressions.findIndex(i => i.Uid == actionTypedAddUpdate.NamedExpression.Uid)
            if (index != -1) {  // it exists
                namedExpressions[index] = actionTypedAddUpdate.NamedExpression
            } else {
                namedExpressions.push(actionTypedAddUpdate.NamedExpression)
            }
            return Object.assign({}, state, { NamedExpressions: namedExpressions })
        }

        case NAMED_EXPRESSION_DELETE: {
            let actionTypedDelete = (<NamedExpressionDeleteAction>action)
            namedExpressions = [].concat(state.NamedExpressions)
            index = namedExpressions.findIndex(i => i.Uid == actionTypedDelete.NamedExpression.Uid)
            namedExpressions.splice(index, 1);
            return Object.assign({}, state, { NamedExpressions: namedExpressions })
        }

        default:
            return state
    }





}


export function CreatePredefinedExpressions(): Array<INamedExpression> {

    let _predefinedExpressions: INamedExpression[] = [];

    // Date Predefined Named Expressions
    _predefinedExpressions.push({
        Uid: "Today",
        FriendlyName: "Today",
        Description: "Is Date Today",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date);
            return (today.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "In Past",
        FriendlyName: "In Past",
        Description: "Is Date In Past",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return +dateToCheck < Date.now();
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "In Future",
        FriendlyName: "In Future",
        Description: "Is Date In Future",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return +dateToCheck > Date.now();
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "Yesterday",
        FriendlyName: "Yesterday",
        Description: "Is Date Yesterday",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date);
            return (yesterday.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "Tomorrow",
        FriendlyName: "Tomorrow",
        Description: "Is Date Tomorrow",
        ColumnType: ColumnType.Date,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date);
            return (tomorrow.setHours(0, 0, 0, 0) == dateToCheck.setHours(0, 0, 0, 0))
        },
        IsPredefined: true
    });

    // Numeric Predefined Named Expressions
    _predefinedExpressions.push({
        Uid: "Positive",
        FriendlyName: "Positive",
        Description: "Is Number Positive",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck > 0);
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "Negative",
        FriendlyName: "Negative",
        Description: "Is Number Negative",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck < 0);
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "Zero",
        FriendlyName: "Zero",
        Description: "Is Number Zero",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck == 0);
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "NumericBlanks",
        FriendlyName: "Blanks",
        Description: "Is Cell Empty",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck == null);
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "NumericNonBlanks",
        FriendlyName: "Non Blanks",
        Description: "Is Cell Populated",
        ColumnType: ColumnType.Number,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return (numberToCheck != null);
        },
        IsPredefined: true
    });


    // String Predefined Named Expressions
    _predefinedExpressions.push({
        Uid: "StringBlanks",
        FriendlyName: "Blanks",
        Description: "Is Cell Empty",
        ColumnType: ColumnType.String,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (stringToCheck: string): boolean => {
            return (StringExtensions.IsNullOrEmpty(stringToCheck));
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "StringNonBlanks",
        FriendlyName: "Non Blanks",
        Description: "Is Cell Populated",
        ColumnType: ColumnType.String,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (stringToCheck: any): boolean => {
            return (StringExtensions.IsNotNullOrEmpty(stringToCheck));
        },
        IsPredefined: true
    });

    // Boolean Predefined Named Expressions
    _predefinedExpressions.push({
        Uid: "True",
        FriendlyName: "True",
        Description: "Is Value True",
        ColumnType: ColumnType.Boolean,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
            return (boolToCheck);
        },
        IsPredefined: true
    });

    _predefinedExpressions.push({
        Uid: "False",
        FriendlyName: "False",
        Description: "Is Value False",
        ColumnType: ColumnType.Boolean,
        Expression: ExpressionHelper.CreateEmptyExpression(),
        IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
            return (!boolToCheck);
        },
        IsPredefined: true
    });


    return _predefinedExpressions;

}