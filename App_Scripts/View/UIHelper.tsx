import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState'
import { DataType, FontWeight, FontStyle, StatusColour, MessageType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { IAdaptableBlotterOptions } from '../Core/Api/Interface/IAdaptableBlotterOptions';
import { IStyle } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { ExpressionBuilderPageState } from './ExpressionBuilder/ExpressionBuilderPage';
import { Expression } from '../Core/Api/Expression';


export module UIHelper {
    export function EmptyConfigState(): EditableConfigEntityState {
        return {
            EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1,
        }
    }

 
    export function getExpressionBuilderState(expression: Expression): ExpressionBuilderPageState {
        return {
            Expression: expression, SelectedColumnId: "", SelectedTab: null
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
        if (blotterOptions.modalContainer) { // this has been set, so we use the property
            modalContainer = document.getElementById(blotterOptions.modalContainer)
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
                return "danger"
            case StatusColour.Amber:
                return "warning";
            case StatusColour.Green:
                return "success";
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
                return "danger"
            case MessageType.Warning:
                return "warning";
            case MessageType.Info:
                return "info";
        }
    }


 

}