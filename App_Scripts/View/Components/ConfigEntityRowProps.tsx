import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { IStyle } from '../../Core/Interface/IStyle';
import { EnumExtensions } from '../../Core/Extensions';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { IColumn , IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../../Core/Interface/IExpression';



// base props
export interface BaseEntityRowProps<View> extends React.ClassAttributes<View> {
    ConfigEntity: IConfigEntity
    onDeleteConfirm: Redux.Action;
    Index: number
    onEdit: (index: number, configEntity: IConfigEntity) => void;
}

// shared props
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
    onShare: () => void;
    TeamSharingActivated: boolean
    onDeleteConfirm: Redux.Action;
}

// Expression props
export interface ExpressionEntityRowProps<View> extends BaseEntityRowProps<View> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

// Shared and Expression Props
export interface SharedEntityExpressionRowProps<View> extends SharedEntityRowProps<View> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}