import { IRange } from '../../Core/Interface/IRangeStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { RangeScope } from '../../Core/Enums';

export interface RangeConfigItemProps extends React.ClassAttributes<RangeConfigItem> {
    Range: IRange
    UserFilters: IUserFilter[]
    onEdit: (Range: IRange) => void;
    onDeleteConfirm: Redux.Action;
    Columns: Array<IColumn>
}

export class RangeConfigItem extends React.Component<RangeConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={2}><span style={expressionFontSizeStyle}>
                    {this.props.Range.Name}
                </span>
                </Col>
                <Col xs={3} >
                    {this.props.Range.RangeScope == RangeScope.AllColumns ?
                        "All Columns" :
                        <span style={expressionFontSizeStyle}>
                            {this.props.Range.Columns.map(c =>
                                this.props.Columns.find(col => col.ColumnId == c).FriendlyName).join(', ')}
                        </span>
                    }
                </Col>
                <Col xs={4} >
                    <span style={expressionFontSizeStyle}>
                        {ExpressionHelper.ConvertExpressionToString(this.props.Range.Expression, this.props.Columns, this.props.UserFilters)}
                    </span>
                </Col>
                <Col xs={3}>
                    <EntityListActionButtons
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        editClick={() => this.props.onEdit(this.props.Range)}
                        ConfigEntity={this.props.Range}
                        EntityName="Range">
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li>
    }
}


var expressionFontSizeStyle = {
    fontSize: 'small'
};