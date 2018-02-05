import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl, HelpBlock, Checkbox, Label } from 'react-bootstrap';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ColorPicker } from '../ColorPicker';
import { IUserFilter } from '../../Core/Interface/IExpression';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { FormatColumnEditAction } from "../../Redux/ActionsReducers/FormatColumnRedux";

export class FormatColumnEntityRow extends React.Component<SharedEntityExpressionRowProps<FormatColumnEntityRow>, {}> {

    render(): any {
     let formatColumn = this.props.ConfigEntity as IFormatColumn;
        let isDisabled = formatColumn.IsPredefined
        let column = this.props.Columns.find(x => x.ColumnId == formatColumn.ColumnId)

        let myCols: IColItem[] = []
        myCols.push({ size: this.props.EntityRowInfo[0].Width, content: this.props.Columns.find(c => c.ColumnId == formatColumn.ColumnId).FriendlyName });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: <StyleVisualItem Style={formatColumn.Style} /> });
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, formatColumn)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={formatColumn}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.FormatColumnStrategyName} />
        myCols.push({ size: this.props.EntityRowInfo[2].Width, content: buttons });

        return <ConfigEntityRowItem
            items={myCols}
            />
    }
}
