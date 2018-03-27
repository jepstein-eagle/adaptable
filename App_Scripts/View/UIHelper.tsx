import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState'
import { DataType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IAdaptableBlotterOptions } from '../Core/Interface/IAdaptableBlotterOptions';


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


    export function getModalContainer(blotterOptions:IAdaptableBlotterOptions, document: Document):HTMLElement{
        let modalContainer: HTMLElement;
        if (blotterOptions.modalContainer == "Grid") {
          modalContainer = document.getElementById("grid")
          if (modalContainer) {
            const modalContainerClassName: string = " modal-container"
            if (!modalContainer.className.includes(modalContainerClassName)) {
              modalContainer.className += modalContainerClassName;
            }
          }
        } else {
          modalContainer = document.body
        }
        return modalContainer;
    }

}
