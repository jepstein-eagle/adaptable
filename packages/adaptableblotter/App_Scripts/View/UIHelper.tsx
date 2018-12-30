import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState'
import { DataType, FontWeight, FontStyle, StatusColour, MessageType } from '../Utilities/Enums';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterOptions } from '../Api/Interface/IAdaptableBlotterOptions';
import { IStyle } from '../Api/Interface/IAdaptableBlotterObjects';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../Api/Expression';
import { PRIMARY_BSSTYLE, SUCCESS_BSSTYLE, WARNING_BSSTYLE, DANGER_BSSTYLE, INFO_BSSTYLE } from '../Utilities/Constants/StyleConstants';


export module UIHelper {
    export function getEmptyConfigState(): EditableConfigEntityState {
        return {
            EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1,
        }
    }

 
    export function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState {
        return {
            Expression: expression, SelectedColumnId: "", SelectedTab: null
        }
    }

    export function getExpressionBuilderStateWithColumn(expression: Expression, columnId: string): ExpressionBuilderPageState {
        return {
            Expression: expression, SelectedColumnId: columnId, SelectedTab: null
        }
    }

    export function getDescriptionForDataType(dataType: DataType) {
        switch (dataType) {
            case DataType.String:
                return "string"
            case DataType.Number:
                return "number"
            case DataType.Date:
                return "date"
        }
    }

    export function getPlaceHolderforDataType(dataType: DataType) {
        switch (dataType) {
            case DataType.String:
                return "Enter Value"
            case DataType.Number:
                return "Enter Number"
            case DataType.Date:
                return "Enter Date"
        }
    }


    export function getModalContainer(blotterOptions: IAdaptableBlotterOptions, document: Document): HTMLElement {
        let modalContainer: HTMLElement;
        if (blotterOptions.containerOptions.modalContainer) { // this has been set, so we use the property
            modalContainer = document.getElementById(blotterOptions.containerOptions.modalContainer)
            if (modalContainer) {
                const modalContainerClassName: string = " modal-container"
                if (!modalContainer.className.includes(modalContainerClassName)) {
                    modalContainer.className += modalContainerClassName;
                }
            }
        }
        if (!modalContainer) {
            modalContainer = document.body
        }
        return modalContainer;
    }

    export function IsNotEmptyStyle(style: IStyle): boolean {
        return style.BackColor != null || style.ForeColor != null || style.FontWeight != FontWeight.Normal || style.FontStyle != FontStyle.Normal || style.FontSize != null || StringExtensions.IsNotNullOrEmpty(style.ClassName)

    }


    export function getMessageTypeByStatusColour(statusColour: StatusColour): MessageType {
        switch (statusColour) {
            case StatusColour.Red:
                return MessageType.Error;
            case StatusColour.Amber:
                return MessageType.Warning;
            case StatusColour.Green:
                return MessageType.Info;
        }
    }

    export function getStyleNameByStatusColour(statusColour: StatusColour): string {
        switch (statusColour) {
            case StatusColour.Red:
                return DANGER_BSSTYLE
            case StatusColour.Amber:
                return WARNING_BSSTYLE;
            case StatusColour.Green:
                return SUCCESS_BSSTYLE;
        }
    }

    export function getGlyphByMessageType(messageType: MessageType): string {
        switch (messageType) {
            case MessageType.Info:
                return "info-sign"
            case MessageType.Warning:
                return "warning-sign";
            case MessageType.Error:
                return "exclamation-sign";
        }
    }

    export function getStyleNameByMessageType(messageType: MessageType): string {
        switch (messageType) {
            case MessageType.Error:
                return DANGER_BSSTYLE;
            case MessageType.Warning:
                return WARNING_BSSTYLE;
            case MessageType.Info:
                return INFO_BSSTYLE;
        }
    }


 

}