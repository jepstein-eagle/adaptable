/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { SingleListBox } from '../SingleListBox'
import { PanelWithButton } from '../PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Form, Row, Col, Button, } from 'react-bootstrap';
import { ColumnType } from '../../Core/Enums'


interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>
    ColumnValues: Array<any>
      ColumnValuesDataType: ColumnType // need to change name of this enum
    onColumnValuesChange: (SelectedValues: Array<any>) => void
}

export class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {

    render() {
        return <PanelWithButton headerText={"Values"} className="no-padding-panel">
            <SingleListBox style={divStyle} Values={this.props.ColumnValues}
                UiSelectedValues={this.props.SelectedValues}
                onSelectedChange={(list) => this.props.onColumnValuesChange(list)}
                ValuesDataType={this.props.ColumnValuesDataType}>
            </SingleListBox>
        </PanelWithButton>
    }
}

let divStyle = {
    'overflowY': 'auto',
    'height': '296px',
    'marginBottom' : '0'
}
