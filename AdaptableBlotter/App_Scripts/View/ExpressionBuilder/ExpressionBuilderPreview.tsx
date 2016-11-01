/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { IExpression } from '../../Core/Interface/IExpression'
import { SingleListBox } from '../SingleListBox'
import { ListGroupItem, ListGroup, Panel, Button } from 'react-bootstrap';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { LeafExpressionOperator } from '../../Core/Enums';

interface ExpressionBuilderPreviewProps extends React.ClassAttributes<ExpressionBuilderPreview> {
    Expression: ExpressionString
    onSelectedColumnChange: (ColumnName: string) => void
    SelectedColumnId: string
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
                        {y}
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
                                {ExpressionHelper.OperatorToFriendlyString(y.Operator)} {y.Operand1} And {y.Operand2}
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                {ExpressionHelper.OperatorToFriendlyString(y.Operator)} {y.Operand1} And {y.Operand2}
                            </ListGroupItem>
                        }
                    }
                    else {
                        if (y.Operand1 == "" || y.Operator == LeafExpressionOperator.Unknown) {
                            return <ListGroupItem key={columnId + index} bsStyle="danger">
                                {ExpressionHelper.OperatorToFriendlyString(y.Operator)} {y.Operand1}
                            </ListGroupItem>
                        }
                        else {
                            return <ListGroupItem key={columnId + index}>
                                {ExpressionHelper.OperatorToFriendlyString(y.Operator)} {y.Operand1}
                            </ListGroupItem>
                        }
                    }
                })
            }
            return <div key={columnId + "div"}>
                <Button block style={panelHeaderStyle}
                    bsStyle="success"
                    key={columnId + "header"}
                    ref={columnId}
                    onClick={() => this.props.onSelectedColumnChange(columnId)} >
                    {columnId}
                </Button>
                <ListGroup>
                    {columnValuesListgroupItems}
                    {columnRangesListgroupItems}
                </ListGroup>
            </div>
        })
        return <Panel header="Preview" bsStyle="primary" style={{ height: '575px' }} >
            <div style={divStyle}>
                {previewLists}
            </div>
        </Panel>

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