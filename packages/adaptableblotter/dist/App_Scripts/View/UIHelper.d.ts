import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState';
import { DataType, StatusColour, MessageType } from '../Utilities/Enums';
import { IAdaptableBlotterOptions } from '../Utilities/Interface/BlotterOptions/IAdaptableBlotterOptions';
import { IStyle } from "../Utilities/Interface/IStyle";
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../Utilities/Expression';
export declare module UIHelper {
    function getDefaultColors(): string[];
    function getEmptyConfigState(): EditableConfigEntityState;
    function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState;
    function getExpressionBuilderStateWithColumn(expression: Expression, columnId: string): ExpressionBuilderPageState;
    function getDescriptionForDataType(dataType: DataType): "string" | "number" | "date";
    function getPlaceHolderforDataType(dataType: DataType): "Enter Value" | "Enter Number" | "Enter Date";
    function getModalContainer(blotterOptions: IAdaptableBlotterOptions, document: Document): HTMLElement;
    function getChartContainer(blotterOptions: IAdaptableBlotterOptions, document: Document, showModal: boolean): HTMLElement;
    function isValidUserChartContainer(blotterOptions: IAdaptableBlotterOptions, document: Document): boolean;
    function IsNotEmptyStyle(style: IStyle): boolean;
    function getMessageTypeByStatusColour(statusColour: StatusColour): MessageType;
    function getStyleNameByStatusColour(statusColour: StatusColour): string;
    function getGlyphByMessageType(messageType: MessageType): string;
    function getStyleNameByMessageType(messageType: MessageType): string;
    function getStyleForSystemStatusButton(statusColour: StatusColour): string;
    function getGlyphForSystemStatusButton(statusColour: StatusColour): string;
}
