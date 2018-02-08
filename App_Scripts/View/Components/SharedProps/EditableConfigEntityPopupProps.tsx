import { IConfigEntity } from '../../../Core/Interface/IAdaptableBlotter';
import { PopupMode } from '../../../Core/Enums'

/// <reference path="../../typings/.d.ts" />

export interface EditableConfigEntityInternalState {
    EditedConfigEntity: IConfigEntity
    WizardStartIndex: number
    EditedIndexConfigEntity: number
}

