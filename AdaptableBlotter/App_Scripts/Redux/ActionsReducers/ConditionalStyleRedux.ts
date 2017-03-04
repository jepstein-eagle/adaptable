/// <reference path="../../../typings/index.d.ts" />
import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ConditionalStyleScope } from '../../Core/Enums';
import { Helper } from '../../Core/Helper';

export const CONDITIONAL_STYLE_ADD_UPDATE = 'CONDITIONAL_STYLE_ADD_UPDATE';
export const CONDITIONAL_STYLE_EDIT_COLUMN = 'CONDITIONAL_STYLE_EDIT_COLUMN';
export const CONDITIONAL_STYLE_EDIT_COLOUR = 'CONDITIONAL_STYLE_EDIT_COLOUR';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddUpdateAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition
}

export const ConditionalStyleAddUpdate = (conditionalStyleCondition: IConditionalStyleCondition): ConditionalStyleAddUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_UPDATE,
    conditionalStyleCondition
})

export interface ConditionalStyleEditColumnAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    columnId: string
}

export const ConditionalStyleEditColumn = (conditionalStyleCondition: IConditionalStyleCondition, columnId: string): ConditionalStyleEditColumnAction => ({
    type: CONDITIONAL_STYLE_EDIT_COLUMN,
    conditionalStyleCondition,
    columnId
})

export interface ConditionalStyleEditColourAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    backColor: string,
    foreColor: string
}

export const ConditionalStyleEditColour = (conditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string): ConditionalStyleEditColourAction => ({
    type: CONDITIONAL_STYLE_EDIT_COLOUR,
    conditionalStyleCondition,
    backColor,
    foreColor
})

export interface ConditionalStyleDeleteAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition
}

export const ConditionalStyleDelete = (conditionalStyleCondition: IConditionalStyleCondition): ConditionalStyleDeleteAction => ({
    type: CONDITIONAL_STYLE_DELETE,
    conditionalStyleCondition
})

const initialCalendarState: ConditionalStyleState = {
    ConditionalStyleConditions: []
}

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (state: ConditionalStyleState = initialCalendarState, action: Redux.Action): ConditionalStyleState => {
    let index: number;
    let conditions: IConditionalStyleCondition[]

    switch (action.type) {
        case CONDITIONAL_STYLE_ADD_UPDATE:
            let actionTypedAddUpdate = (<ConditionalStyleAddUpdateAction>action)
            conditions = [].concat(state.ConditionalStyleConditions)

            index = conditions.findIndex(i => i.Uid == actionTypedAddUpdate.conditionalStyleCondition.Uid)
            if (index != -1) {  // it exists
                actionTypedAddUpdate.conditionalStyleCondition.Uid = Helper.generateUid();
                conditions[index] = actionTypedAddUpdate.conditionalStyleCondition
            } else {
                conditions.push(actionTypedAddUpdate.conditionalStyleCondition)
            }
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })

        case CONDITIONAL_STYLE_EDIT_COLUMN:
            let actionTypedColumn = (<ConditionalStyleEditColumnAction>action)
            let conditionColumn = actionTypedColumn.conditionalStyleCondition;
            conditions = [].concat(state.ConditionalStyleConditions)
            index = conditions.findIndex(i => i.Uid == actionTypedColumn.conditionalStyleCondition.Uid)
            conditions[index] = Object.assign({}, conditionColumn, { ColumnId: actionTypedColumn.columnId, Uid: Helper.generateUid() })
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })

        case CONDITIONAL_STYLE_EDIT_COLOUR:
            let actionTypedColour = (<ConditionalStyleEditColourAction>action)
            let conditionColour = actionTypedColour.conditionalStyleCondition;
            conditions = [].concat(state.ConditionalStyleConditions)
            index = conditions.findIndex(i => i.Uid == actionTypedColour.conditionalStyleCondition.Uid)
            conditions[index] = Object.assign({}, conditionColour, { BackColor: actionTypedColour.backColor, ForeColor: actionTypedColour.foreColor, Uid: Helper.generateUid() })
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })

        case CONDITIONAL_STYLE_DELETE:
            let actionTypedDelete = (<ConditionalStyleDeleteAction>action)
            conditions = [].concat(state.ConditionalStyleConditions)
            index = conditions.findIndex(i => i.Uid == actionTypedDelete.conditionalStyleCondition.Uid)
            conditions.splice(index, 1);
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })
        default:
            return state
    }
}
