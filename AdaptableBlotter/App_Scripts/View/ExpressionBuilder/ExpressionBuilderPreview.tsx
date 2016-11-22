/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { IColumn } from '../../Core/Interface/IAdaptableBlotter'
import { SingleListBox } from '../SingleListBox'
import { PanelWithButton } from '../PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Button, Form, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { LeafExpressionOperator } from '../../Core/Enums';

interface ExpressionBuilderPreviewProps extends React.ClassAttributes<ExpressionBuilderPreview> {
    Expression: Expression
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
    ColumnsList: Array<IColumn>
    DeleteRange: (ColumnId: string, index: number) => void
    DeleteColumnValue: (ColumnId: string, ColumnValue: any) => void
}

export class ExpressionBuilderPreview extends React.Component<ExpressionBuilderPreviewProps, {}> {
    componentWillReceiveProps(nextProps: ExpressionBuilderPreviewProps, nextContext: any) {
        this.ensureSelectedColumnVisible(nextProps.SelectedColumnId)
    }
    render() {
        let columnList = ExpressionHelper.GetColumnListFromExpression(this.props.Expression)
        let previewLists = columnList.map(columnId => {
            let columnValues = this.props.Expression.ColumnValuesExpression.find(colValues => colValues.ColumnName == columnId)
            let columnValuesListgroupItems: JSX.Element[]
            if (columnValues) {
                columnValuesListgroupItems = columnValues.Values.map(y => {
                    return <ListGroupItem key={y}>
                        <Form inline>
                            {y}
                            <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteColumnValue(columnId, y)}><Glyphicon glyph="trash" /></Button>
                            </OverlayTrigger>
                        </Form>
                    </ListGroupItem>
                })
            }
            let columnRanges = this.props.Expression.RangeExpression.find(colValues => colValues.ColumnName == columnId)
            let columnRangesListgroupItems: JSX.Element[]
            if (columnRanges) {
                columnRangesListgroupItems = columnRanges.Ranges.map((y, index) => {
                    if (y.Operator == LeafExpressionOperator.Between) {

                        if (y.Operand1 == "" || y.Operand2 == "") {
                            return <ListGroupItem key={columnId + index} bsStyle="danger">
                                <Form inline>
                                    {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}{' '}And{' '}{y.Operand2}
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                        <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </Form>
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                <Form inline>
                                    {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}{' '}And{' '}{y.Operand2}
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                        <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </Form>
                            </ListGroupItem>
                        }
                    }
                    else {
                        if (y.Operand1 == "" || y.Operator == LeafExpressionOperator.Unknown) {
                            return <ListGroupItem key={columnId + index} bsStyle="danger">
                                <Form inline>
                                    {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                        <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </Form>
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                <Form inline>
                                    {ExpressionHelper.OperatorToFriendlyString(y.Operator)}{' '}{y.Operand1}
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Remove</Tooltip>}>
                                        <Button bsSize="xsmall" style={{ float: 'right' }} onClick={() => this.props.DeleteRange(columnId, index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </Form>
                            </ListGroupItem>
                        }
                    }
                })
            }
            let columnFriendlyName = this.props.ColumnsList.find(x => x.ColumnId == columnId).ColumnFriendlyName
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
                    {columnRangesListgroupItems}
                </ListGroup>
            </div>
        })
        return <PanelWithButton headerText="Preview" bsStyle="primary" style={{ height: '575px' }} >
            <div style={divStyle}>
                {previewLists}
            </div>
        </PanelWithButton>

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