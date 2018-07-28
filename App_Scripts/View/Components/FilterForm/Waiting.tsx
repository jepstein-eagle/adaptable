import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Glyphicon, Col, Row } from 'react-bootstrap';


export interface WaitingProps extends React.ClassAttributes<Waiting> {
    WaitingMessage: string
}

export class Waiting extends React.Component<WaitingProps, {}> {
    render(): any {
        return <div>
            <Row>
                <Col xs={4} />
                <Col xs={6}>
                    <h1>
                        <Glyphicon glyph={"refresh"} />
                    </h1>
                </Col>
                <Col xs={2} />
            </Row>

            <Row>
                <Col xs={1} />
                <Col xs={11}>
                    <h5>
                       {' '} {this.props.WaitingMessage}
                    </h5>
                </Col>
            </Row>

        </div>



    }
}
