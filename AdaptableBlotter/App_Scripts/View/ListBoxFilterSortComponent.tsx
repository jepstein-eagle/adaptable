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
                    <InputGroup.Button>
                        {this.props.SortOrder == SortOrder.Ascending ?
                            <Button onClick={() => this.props.sortColumnValues()} ><Glyphicon glyph="sort-by-alphabet" /></Button> :
                            <Button onClick={() => this.props.sortColumnValues()} ><Glyphicon glyph="sort-by-alphabet-alt" /></Button>
                        }
                    </InputGroup.Button>
                </InputGroup>
                <InputGroup>

                </InputGroup>
            </FormGroup>
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