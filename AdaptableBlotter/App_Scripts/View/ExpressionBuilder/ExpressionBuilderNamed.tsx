/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { SingleListBox } from '../SingleListBox'
import { PanelWithButton } from '../PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Form, Row, Col, Button, } from 'react-bootstrap';
import { ColumnType } from '../../Core/Enums'
import { INamedExpression } from '../../Core/Interface/IExpression';


interface ExpressionBuilderNamedProps extends React.ClassAttributes<ExpressionBuilderNamed> {
    NamedExpressions: Array<INamedExpression>
    SelectedNamedExpressions: Array<INamedExpression>
    onNamedExpressionChange: (SelectedNamedExpressions: Array<INamedExpression>) => void
}

export class ExpressionBuilderNamed extends React.Component<ExpressionBuilderNamedProps, {}> {

    render(): any {

        // testing if round trip works..
        var test: any = this.props.SelectedNamedExpressions;

        var namedExpressions = this.props.NamedExpressions.map((ne: INamedExpression, index: number) => {
            return <ListGroupItem key={index}
                onClick={() => this.onClickColum(ne)}
                active={this.props.SelectedNamedExpressions.find(f => f.Uid == ne.Uid)}>
                {ne.FriendlyName}
            </ListGroupItem>
        })

        return <PanelWithButton headerText={"Filters"} className="no-padding-panel" bsStyle="info">
            <ListGroup style={listGroupStyle}>
                {namedExpressions}
            </ListGroup>
        </PanelWithButton>
    }

    onClickColum(namedExpression: INamedExpression) {
        let newArray: INamedExpression[] = [];
        let existingNamedExpression = this.props.SelectedNamedExpressions.find(f => f.Uid == namedExpression.Uid);
        if (existingNamedExpression != null) { // it exists
            let index = this.props.SelectedNamedExpressions.indexOf(existingNamedExpression);
            newArray = [...this.props.SelectedNamedExpressions];
            newArray.splice(index, 1);
        }
        else {
            newArray = [...this.props.SelectedNamedExpressions];
            newArray.push(namedExpression)
        }
        this.props.onNamedExpressionChange(newArray);
    }
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '350px',
    'height': '350px'
};
