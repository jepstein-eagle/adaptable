import { EditableConfigEntityState } from './Components/SharedProps/EditableConfigEntityState'


export module UIHelper {
    export function EmptyConfigState(): EditableConfigEntityState {
        return {
            EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1,
        }
    }


}
