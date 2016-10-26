/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IExpression } from '../../Core/Interface/IExpression'
import { SingleListBox } from '../SingleListBox'
import { ListGroupItem, ListGroup, Panel } from 'react-bootstrap';


interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>
    ColumnValues: Array<any>
    onColumnValuesChange: (SelectedValues: Array<any>) => void
}

export class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {
    render() {
        return <Panel header="Column Values" >
            <SingleListBox style={divStyle} Values={this.props.ColumnValues}
                UiSelectedValues={this.props.SelectedValues}
                onSelectedChange={(list) => this.props.onColumnValuesChange(list)}>
            </SingleListBox>
        </Panel>
    }
}

let divStyle = {
    'overflowY': 'auto',
    'height': '300px'
}