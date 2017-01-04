/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { PanelWithButton } from '../PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Button, Form, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions } from '../../Core/Extensions';
import { INamedExpression } from '../../Core/Interface/IExpression';

//I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
                    // since html cannot render a button within a button.
                    // https://github.com/react-bootstrap/react-bootstrap/issues/1445
                    // I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
                    // but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like shit

interface ExpressionBuilderPreviewProps extends React.ClassAttributes<ExpressionBuilderPreview> {
    Blotter: IAdaptableBlotter
    Expression: Expression
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
    ColumnsList: Array<IColumn>
    DeleteRange: (ColumnId: string, index: number) => void
    DeleteNamedExpression: (ColumnId: string, index: number) => void
    DeleteColumnValue: (ColumnId: string, ColumnValue: any) => void
    ShowPanel: boolean
}

export class ExpressionBuilderPreview extends React.Component<ExpressionBuilderPreviewProps, {}> {
    componentWillReceiveProps(nextProps: ExpressionBuilderPreviewProps, nextContext: any) {
        this.ensureSelectedColumnVisible(nextProps.SelectedColumnId)
    }
    render() {
        let columnList = ExpressionHelper.GetColumnListFromExpression(this.props.Expression)
        let previewLists = columnList.map(columnId => {

            // First lets do the column values
            let columnValues = this.props.Expression.ColumnValuesExpressions.find(colValues => colValues.ColumnName == columnId)
            let columnValuesListgroupItems: JSX.Element[]
            if (columnValues) {
                columnValuesListgroupItems = columnValues.ColumnValues.map(y => {
                    //I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
                    // since html cannot render a button within a button.
                    // https://github.com/react-bootstrap/react-bootstrap/issues/1445
                    // I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
                    // but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like shit
                    return <ListGroupItem key={y} >
                        <div onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                            <Form inline>
                                {y}
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                    <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteColumnValue(columnId, y)}><Glyphicon glyph="trash" /></Button>
                                </OverlayTrigger>
                            </Form>
                        </div>
                    </ListGroupItem>
                })
            }

            // Next do the named expressions

            let columnNamedExpressions = this.props.Expression.NamedExpressions.find(ne => ne.ColumnName == columnId)
            let columnNamedExpressionsListgroupItems: JSX.Element[]
            if (columnNamedExpressions) {
                let namedExpressions = ExpressionHelper.GetNamedExpressions(columnNamedExpressions.Named, this.props.Blotter);
                if (namedExpressions) {
                    columnNamedExpressionsListgroupItems = namedExpressions.map((ne, index) => {
                        return <ListGroupItem key={ne.Uid}>
                            <div onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                <Form inline>
                                    {ne.FriendlyName}
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                        <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteNamedExpression(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </Form>
                            </div>
                        </ListGroupItem>
                    })
                }
            }
            // Finally do the column ranges
            let columnRanges = this.props.Expression.RangeExpressions.find(colValues => colValues.ColumnName == columnId)
            let columnRangesListgroupItems: JSX.Element[]
            if (columnRanges) {
                columnRangesListgroupItems = columnRanges.Ranges.map((y, index) => {
                    if (y.Operator == LeafExpressionOperator.Between) {

                        if (StringExtensions.IsEmpty(y.Operand1) || StringExtensions.IsEmpty(y.Operand2)) {
                            return <ListGroupItem key={columnId + index} bsStyle="danger" >
                                <div onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <Form inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}{' '}And{' '}{y.Operand2}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                        </OverlayTrigger>
                                    </Form>
                                </div>
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                <div onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <Form inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}{' '}And{' '}{y.Operand2}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                        </OverlayTrigger>
                                    </Form>
                                </div>
                            </ListGroupItem>
                        }
                    }
                    else {
                        if (StringExtensions.IsEmpty(y.Operand1) || y.Operator == LeafExpressionOperator.Unknown) {
                            return <ListGroupItem key={columnId + index} bsStyle="danger" >
                                <div onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <Form inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                        </OverlayTrigger>
                                    </Form>
                                </div>
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                <div onClick={() => this.props.onSelectedColumnChange(columnId)} style={{ cursor: 'pointer' }}>
                                    <Form inline>
                                        {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                            <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                        </OverlayTrigger>
                                    </Form>
                                </div>
                            </ListGroupItem>
                        }
                    }
                })
            }

            let columnFriendlyName = this.props.ColumnsList.find(x => x.ColumnId == columnId).FriendlyName
            return <div key={columnId + "div"}>
                <Button block style={panelHeaderStyle}
                    bsStyle="success"
                    key={columnId + "header"}
                    ref={columnId}
                    onClick={() => this.props.onSelectedColumnChange(columnId)} >
                    {columnFriendlyName}
                </Button>
                <ListGroup>
                    {columnValuesListgroupItems}
                    {columnNamedExpressionsListgroupItems}
                    {columnRangesListgroupItems}
                </ListGroup>
            </div>
        })
        return <div>
            {this.props.ShowPanel &&

                <PanelWithButton headerText="Preview" bsStyle="primary" style={{ height: '575px' }} >
                    <div style={divStyle}>
                        {previewLists}
                    </div>
                </PanelWithButton>
            }

            {!this.props.ShowPanel &&

                <div >
                    {previewLists}
                </div>
            }
        </div>
    }

    ensureSelectedColumnVisible(columnId: string) {
        var itemComponent = this.refs[columnId];
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent) as HTMLElement;
            domNode.scrollIntoView(true);
        }
    }



}

let divStyle = {
    'overflowY': 'auto',
    'height': '490px'
}

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}