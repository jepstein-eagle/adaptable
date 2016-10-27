/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { IExpression } from '../../Core/Interface/IExpression'
import { SingleListBox } from '../SingleListBox'
import { ListGroupItem, ListGroup, Panel, Button } from 'react-bootstrap';
import { ExpressionString } from '../../Core/Expression/ExpressionString';

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
        let previewLists = this.props.Expression.ColumnValuesExpression.map(x => {
            let listgroupItems = x.Values.map(y => {
                return <ListGroupItem key={y}>
                    {y}
                </ListGroupItem>
            })
            return <div key={x.ColumnName + "div"}>
                <Button block style={panelHeaderStyle}
                    bsStyle="success"
                    key={x.ColumnName + "header"}
                    ref={x.ColumnName}
                    onClick={() => this.props.onSelectedColumnChange(x.ColumnName)} >
                    {x.ColumnName}
                </Button>
                <ListGroup key={x.ColumnName} >
                    {listgroupItems}
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