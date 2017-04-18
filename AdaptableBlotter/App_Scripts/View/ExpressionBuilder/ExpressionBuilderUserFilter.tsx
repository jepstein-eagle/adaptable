import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Form, Row, Col, Button, } from 'react-bootstrap';
import { IUserFilter } from '../../Core/Interface/IExpression';


interface ExpressionBuilderUserFilterProps extends React.ClassAttributes<ExpressionBuilderUserFilter> {
    UserFilterExpressions: Array<IUserFilter>
    SelectedUserFilterExpressions: Array<IUserFilter>
    onUserFilterExpressionChange: (SelectedUserFilterExpressions: Array<IUserFilter>) => void
}

export class ExpressionBuilderUserFilter extends React.Component<ExpressionBuilderUserFilterProps, {}> {

    render(): any {

        var userFilterExpressions = this.props.UserFilterExpressions.map((ne: IUserFilter, index: number) => {
            return <ListGroupItem key={index}
                onClick={() => this.onClickColum(ne)}
                active={this.props.SelectedUserFilterExpressions.find(f => f.Uid == ne.Uid)}>
                {ne.FriendlyName}
            </ListGroupItem>
        })

        return <PanelWithButton headerText={"Filters"} className="no-padding-panel"  bsStyle="info">
            <ListGroup style={listGroupStyle}>
                {userFilterExpressions}
            </ListGroup>
        </PanelWithButton>
    }

    onClickColum(userFilterExpression: IUserFilter) {
        let newArray: IUserFilter[] = [];
        let existingUserFilterExpression = this.props.SelectedUserFilterExpressions.find(f => f.Uid == userFilterExpression.Uid);
        if (existingUserFilterExpression != null) { // it exists
            let index = this.props.SelectedUserFilterExpressions.indexOf(existingUserFilterExpression);
            newArray = [...this.props.SelectedUserFilterExpressions];
            newArray.splice(index, 1);
        }
        else {
            newArray = [...this.props.SelectedUserFilterExpressions];
            newArray.push(userFilterExpression)
        }
        this.props.onUserFilterExpressionChange(newArray);
    }
}

var listGroupStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '350px',
    'height': '350px'
};
