import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, Button, Form, Col, Panel, Row, FormControl, HelpBlock, Checkbox, Label } from 'react-bootstrap';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IFormatColumn } from '../../Core/Interface/IFormatColumnStrategy';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { EnumExtensions } from '../../Core/Extensions';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ColorPicker } from '../ColorPicker';
import { IUserFilter } from '../../Core/Interface/IExpression';
import * as StrategyConstants from '../../Core/StrategyConstants'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';

export interface FormatColumnConfigItemProps extends React.ClassAttributes<FormatColumnConfigItem> {
    FormatColumn: IFormatColumn;
    Columns: IColumn[];
    onDeleteConfirm: Redux.Action;
    onEdit: (FormatColumn: IFormatColumn) => void;
    onShare: () => void;
}

export class FormatColumnConfigItem extends React.Component<FormatColumnConfigItemProps, {}> {

    render(): any {
        let isDisabled = this.props.FormatColumn.IsPredefined
        let column = this.props.Columns.find(x => x.ColumnId == this.props.FormatColumn.ColumnId)

        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: this.props.Columns.find(c => c.ColumnId == this.props.FormatColumn.ColumnId).FriendlyName });
        myCols.push({ size: 6, content: <StyleVisualItem Style={this.props.FormatColumn.Style} /> });
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.FormatColumn)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={this.props.FormatColumn}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyConstants.FormatColumnStrategyFriendlyName} />
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRow
            items={myCols}
            />
    }
}

var expressionFontSizeStyle = {
    fontSize: 'small'
};