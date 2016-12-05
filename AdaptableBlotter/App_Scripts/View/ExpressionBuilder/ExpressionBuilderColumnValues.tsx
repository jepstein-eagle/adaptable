/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { SingleListBox } from '../SingleListBox'
import { PanelWithButton } from '../PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Form, Row, Col, Button, } from 'react-bootstrap';


interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>
    ColumnValues: Array<any>
    onColumnValuesChange: (SelectedValues: Array<any>) => void
}

export class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {

    render() {
        return <PanelWithButton headerText={"Column Values"} className="no-padding-panel">
            <SingleListBox style={divStyle} Values={this.props.ColumnValues}
                UiSelectedValues={this.props.SelectedValues}
                onSelectedChange={(list) => this.props.onColumnValuesChange(list)}>
            </SingleListBox>
        </PanelWithButton>
    }
}

let divStyle = {
    'overflowY': 'auto',
    'height': '290px',
    'marginBottom' : '0'
}
