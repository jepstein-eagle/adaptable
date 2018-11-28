import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState';
import { DataType, StatusColour, MessageType } from '../Core/Enums';
import { IAdaptableBlotterOptions } from '../Api/Interface/IAdaptableBlotterOptions';
import { IStyle } from '../Api/Interface/IAdaptableBlotterObjects';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../Api/Expression';
export declare module UIHelper {
    function EmptyConfigState(): EditableConfigEntityState;
    function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState;
    function getExpressionBuilderStateWithColumn(expression: Expression, columnId: string): ExpressionBuilderPageState;
    function getDescriptionForDataType(dataType: DataType): "date" | "number" | "string";
    function getPlaceHolderforDataType(dataType: DataType): "Enter Number" | "Enter Date" | "Enter Value";
    function getModalContainer(blotterOptions: IAdaptableBlotterOptions, document: Document): HTMLElement;
    function IsNotEmptyStyle(style: IStyle): boolean;
    function getMessageTypeByStatusColour(statusColour: StatusColour): MessageType;
    function getStyleNameByStatusColour(statusColour: StatusColour): string;
    function getGlyphByMessageType(messageType: MessageType): string;
    function getStyleNameByMessageType(messageType: MessageType): string;
}
