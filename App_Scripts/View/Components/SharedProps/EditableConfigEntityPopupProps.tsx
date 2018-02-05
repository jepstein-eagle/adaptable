import { IConfigEntity} from '../../../Core/Interface/IAdaptableBlotter';
/// <reference path="../../typings/.d.ts" />

export interface EditableConfigEntityInternalState {
    EditedConfigEntity: IConfigEntity
    WizardStartIndex: number
    EditedIndexConfigEntity: number
}