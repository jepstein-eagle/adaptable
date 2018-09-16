import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState';
import { DataType, StatusColour, MessageType } from '../Core/Enums';
import { IAdaptableBlotterOptions } from '../Core/Api/Interface/IAdaptableBlotterOptions';
import { IStyle } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../Core/Api/Expression';
export declare module UIHelper {
    function EmptyConfigState(): EditableConfigEntityState;
    function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState;
    function getExpressionBuilderStateWithColumn(expression: Expression, columnId: string): ExpressionBuilderPageState;
    function getDescriptionForDataType(dataType: DataType): "string" | "number" | "date";
    function getPlaceHolderforDataType(dataType: DataType): "Enter Value" | "Enter Number" | "Enter Date";
    function getModalContainer(blotterOptions: IAdaptableBlotterOptions, document: Document): HTMLElement;
    function IsNotEmptyStyle(style: IStyle): boolean;
    function getMessageTypeByStatusColour(statusColour: StatusColour): MessageType;
    function getStyleNameByStatusColour(statusColour: StatusColour): string;
    function getGlyphByMessageType(messageType: MessageType): string;
    function getStyleNameByMessageType(messageType: MessageType): string;
}
