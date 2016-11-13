/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { IExpression } from '../../Core/Interface/IExpression'
import { SingleListBox } from '../SingleListBox'
import { ListGroupItem, ListGroup, Panel, Form, Row, Col, Button, } from 'react-bootstrap';


interface ExpressionBuilderColumnValuesProps extends React.ClassAttributes<ExpressionBuilderColumnValues> {
    SelectedValues: Array<any>
    ColumnValues: Array<any>
    onColumnValuesChange: (SelectedValues: Array<any>) => void
}

export class ExpressionBuilderColumnValues extends React.Component<ExpressionBuilderColumnValuesProps, {}> {

    render() {


        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={8}>{"Column Values"}</Col>
                {/* Would be better to have one button only visible, depending on which 'state' its in, but for now 2 buttons is better than none */}
                <Col xs={4}>
                    <Button bsSize='small' onClick={() => this.SortAz()} >Az</Button>
                    <Button bsSize="small" onClick={() => this.SortZa()} style={{ float: 'right' }}>Za</Button>
                </Col>
            </Row>
        </Form>;

        return <Panel header={header}  >
            <SingleListBox style={divStyle} Values={this.props.ColumnValues}
                UiSelectedValues={this.props.SelectedValues}
                onSelectedChange={(list) => this.props.onColumnValuesChange(list)}>
            </SingleListBox>
        </Panel>
    }

    private SortAz() {
        this.props.ColumnValues.sort();
        this.setState(this.state);
    }

    private SortZa() {
        this.props.ColumnValues.sort().reverse();
        this.setState(this.state);
    }
}

let divStyle = {
    'overflowY': 'auto',
    'height': '300px'
}