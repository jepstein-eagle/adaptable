/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Form, Row, Col, FormGroup, InputGroup, FormControl, Glyphicon, Button } from 'react-bootstrap';
import { SortOrder } from '../Core/Enums'


interface ListBoxFilterSortComponentProps extends React.ClassAttributes<ListBoxFilterSortComponent> {
    FilterValue: string
    SortOrder: SortOrder
    handleChangeFilterValue: (value: string) => void
    sortColumnValues: () => void
}

export class ListBoxFilterSortComponent extends React.Component<ListBoxFilterSortComponentProps, {}> {
    render() {
        return <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={10}>
                    <FormGroup style={{ margin: 0 }}>
                        <InputGroup>
                            <FormControl
                                type="text"
                                value={this.props.FilterValue}
                                placeholder="Search"
                                onChange={(e) => this.handleChangeFilterValue(e)}
                                />
                            <InputGroup.Button>
                                <Button onClick={() => this.clearFilter()}><Glyphicon glyph="remove" /></Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>

                </Col>
                <Col xs={2}>
                    {this.props.SortOrder == SortOrder.Ascending ?
                        <Button bsSize="small" onClick={() => this.props.sortColumnValues()} style={{ float: "right" }}><Glyphicon className="scale-lg" glyph="sort-by-alphabet" /></Button> :
                        <Button bsSize="small" onClick={() => this.props.sortColumnValues()} style={{ float: "right" }}><Glyphicon className="scale-lg" glyph="sort-by-alphabet-alt" /></Button>
                    }
                </Col>
            </Row>
        </Form>
    }

    handleChangeFilterValue(x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        this.props.handleChangeFilterValue(e.value)
    }

    clearFilter() {
        this.props.handleChangeFilterValue("")
    }
}