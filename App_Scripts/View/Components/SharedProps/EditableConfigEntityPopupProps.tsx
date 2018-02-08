import { IConfigEntity } from '../../../Core/Interface/IAdaptableBlotter';

/// <reference path="../../typings/.d.ts" />

export interface EditableConfigEntityState {
    EditedConfigEntity: IConfigEntity
    WizardStartIndex: number
    EditedIndexConfigEntity: number
}

