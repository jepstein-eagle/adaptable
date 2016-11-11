import { IExpression } from '../Interface/IExpression';
import { EmptyExpression } from './EmptyExpression';
import { Expression } from './Expression';
import {  ConditionalStyleColour, LeafExpressionOperator } from '../Enums';


export interface IPredefinedExpressionInfo {
    Id: string
    FriendlyName: string
    ConditionalStyleColour: ConditionalStyleColour
    Operator: LeafExpressionOperator
    Operand1: string
    Operand2: string
}

export class PredefinedExpression  {
    
    

FriendlyName: string

    
   // some kind of string
}


