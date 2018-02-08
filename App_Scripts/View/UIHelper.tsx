import { EditableConfigEntityInternalState } from './Components/SharedProps/EditableConfigEntityPopupProps'
import { PopupMode } from '../Core/Enums'


export module UIHelper {
    export function EmptyConfigState(): EditableConfigEntityInternalState {
        return {
            EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1,
        }
    }
}
