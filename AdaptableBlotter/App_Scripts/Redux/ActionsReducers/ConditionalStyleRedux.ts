/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import * as React from 'react';
import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ConditionalStyleScope, ConditionalStyleColour } from '../../Core/Enums';
import { Helper, EnumEx } from '../../Core/Helper';


export const CONDITIONAL_STYLE_ADD_OR_UPDATE = 'CONDITIONAL_STYLE_ADD_OR_UPDATE';
export const CONDITIONAL_STYLE_EDIT_COLUMN = 'CONDITIONAL_STYLE_EDIT_COLUMN';
export const CONDITIONAL_STYLE_EDIT_COLOUR = 'CONDITIONAL_STYLE_EDIT_COLOUR';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddOrUpdateAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    index: number
}

export const AddOrUpdateConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, index: number): ConditionalStyleAddOrUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_OR_UPDATE,
    conditionalStyleCondition,
    index,
})

export interface ConditionalStyleEditColumnAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    columnId: string
    index: number
}

export const EditColumnConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, columnId: string, index: number): ConditionalStyleEditColumnAction => ({
    type: CONDITIONAL_STYLE_EDIT_COLUMN,
    conditionalStyleCondition,
    columnId,
    index,
})


export interface ConditionalStyleEditColourAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    colour: ConditionalStyleColour
    index: number
}

export const EditColourConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, colour: ConditionalStyleColour, index: number): ConditionalStyleEditColourAction => ({
    type: CONDITIONAL_STYLE_EDIT_COLOUR,
    conditionalStyleCondition,
    colour,
    index,
})

export interface ConditionalStyleDeleteAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition
    Index: number
}

export const DeleteConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, Index: number): ConditionalStyleDeleteAction => ({
    type: CONDITIONAL_STYLE_DELETE,
    conditionalStyleCondition,
    Index
})

const initialCalendarState: ConditionalStyleState = {
    ConditionalStyleConditions: []
    //  { ColumnId: "bid", StyleName: "Red", ConditionalStyleScope: ConditionalStyleScope.Column, Expression: ExpressionHelper.CreateEmptyExpression() },
    //  { ColumnId: "ask", StyleName: "Blue", ConditionalStyleScope: ConditionalStyleScope.Row, Expression: ExpressionHelper.CreateEmptyExpression() }     ]
}

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (state: ConditionalStyleState = initialCalendarState, action: Redux.Action): ConditionalStyleState => {
    switch (action.type) {
        case CONDITIONAL_STYLE_ADD_OR_UPDATE:
            let actionTypedAddUpdate = (<ConditionalStyleAddOrUpdateAction>action)
            let collectionAddUpdate: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            if (actionTypedAddUpdate.index == -1) {
                collectionAddUpdate.push(actionTypedAddUpdate.conditionalStyleCondition)
            }
            else {
                actionTypedAddUpdate.conditionalStyleCondition.Uid = Helper.generateUuid();
                collectionAddUpdate[actionTypedAddUpdate.index] = actionTypedAddUpdate.conditionalStyleCondition
            }
            return Object.assign({}, state, { ConditionalStyleConditions: collectionAddUpdate })

        case CONDITIONAL_STYLE_EDIT_COLUMN:
            let actionTypedColumn = (<ConditionalStyleEditColumnAction>action)
            let conditionColumn = actionTypedColumn.conditionalStyleCondition;
            let collectionColumn: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            collectionColumn[actionTypedColumn.index] = Object.assign({}, conditionColumn, { ColumnId: actionTypedColumn.columnId, Uid: Helper.generateUuid() })
            return Object.assign({}, state, { ConditionalStyleConditions: collectionColumn })

        case CONDITIONAL_STYLE_EDIT_COLOUR:
            let actionTypedColour = (<ConditionalStyleEditColourAction>action)
            let conditionColour = actionTypedColour.conditionalStyleCondition;
            let collectionColour: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            conditionColour.Uid = Helper.generateUuid();
            collectionColour[actionTypedColour.index] = Object.assign({}, conditionColour, { ConditionalStyleColour: actionTypedColour.colour, Uid: Helper.generateUuid() })
            return Object.assign({}, state, { ConditionalStyleConditions: collectionColour })

        case CONDITIONAL_STYLE_DELETE:
            let newCol: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            newCol.splice((<ConditionalStyleDeleteAction>action).Index, 1)
            return Object.assign({}, state, { ConditionalStyleConditions: newCol })
        default:
            return state
    }
}