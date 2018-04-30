import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState'
import { DataType, FontWeight, FontStyle } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { IAdaptableBlotterOptions } from '../Core/Api/Interface/IAdaptableBlotterOptions';
import { IStyle } from '../Core/Api/Interface/AdaptableBlotterObjects';


export module UIHelper {
    export function EmptyConfigState(): EditableConfigEntityState {
        return {
            EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1,
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

}