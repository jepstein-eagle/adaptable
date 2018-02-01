import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { IColumn , IConfigEntity , IEntityRowInfo} from '../../../Core/Interface/IAdaptableBlotter';

export interface EditableConfigEntityInternalState {
    EditedConfigEntity: IConfigEntity
    WizardStartIndex: number
    EditedIndexConfigEntity: number
}