/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactBootstrap from 'react-bootstrap';

interface CustomSortEditorProps extends React.ClassAttributes<CustomSortEditor> {

}

export class CustomSortEditor extends React.Component<CustomSortEditorProps, {}> {
    render() {
        return (
            //we use a container instead of the Grid as we do not want a full width table
            //<ReactBootstrap.Grid >
            <div class="container">
                <ReactBootstrap.Row>
                    <ReactBootstrap.Col md={4} mdOffset={1}>
                        <ReactBootstrap.ListGroup  style={divStyle}>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                        </ReactBootstrap.ListGroup>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col md={2}>
                        <ReactBootstrap.ListGroup>
                            <ReactBootstrap.Button >Right</ReactBootstrap.Button>
                            <ReactBootstrap.Button >Left</ReactBootstrap.Button>
                            <ReactBootstrap.Button >Top</ReactBootstrap.Button>
                            <ReactBootstrap.Button >Bottom</ReactBootstrap.Button>
                        </ReactBootstrap.ListGroup>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col md={4} mdOffset={2}>
                        <ReactBootstrap.ListGroup>
                            <ReactBootstrap.ListGroupItem href="" active>Link 1</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem type="button">Link 2</ReactBootstrap.ListGroupItem>
                            <ReactBootstrap.ListGroupItem href="#" disabled>Link 3</ReactBootstrap.ListGroupItem>
                        </ReactBootstrap.ListGroup>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </div>
            //</ReactBootstrap.Grid>
        );
    }
}

class AdaptableListGroupItem extends React.Component<ReactBootstrap.ListGroupItemProps, {}> {
    render() {
        return (
            <ReactBootstrap.ListGroupItem active>{this.props.children}</ReactBootstrap.ListGroupItem>
        );
    }
}

var divStyle = {
    'overflow-y': 'auto',
    'max-height': '300px'
};