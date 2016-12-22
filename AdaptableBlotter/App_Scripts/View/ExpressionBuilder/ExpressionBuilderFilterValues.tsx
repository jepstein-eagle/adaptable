/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { SingleListBox } from '../SingleListBox'
import { PanelWithButton } from '../PanelWithButton'
import { ListGroupItem, ListGroup, Panel, Form, Row, Col, Button, } from 'react-bootstrap';
import { ColumnType } from '../../Core/Enums'
import { IExpressionFilter } from '../../Core/Interface/IExpression';


interface ExpressionBuilderFilterValuesProps extends React.ClassAttributes<ExpressionBuilderFilterValues> {
    Filters: Array<IExpressionFilter>
    SelectedFilters: Array<IExpressionFilter>
    onFilterValuesChange: (SelectedFilters: Array<IExpressionFilter>) => void
}

export class ExpressionBuilderFilterValues extends React.Component<ExpressionBuilderFilterValuesProps, {}> {

    render(): any {

        // testing if round trip works..
        var test: any = this.props.SelectedFilters;

        var filters = this.props.Filters.map((filter: IExpressionFilter, index: number) => {
            return <ListGroupItem key={index}
                onClick={() => this.onClickColum(filter)}
                active={this.props.SelectedFilters.find(f => f.ExpressionName == filter.ExpressionName)}>
                {filter.ExpressionName}
            </ListGroupItem>
        })

        return <PanelWithButton headerText={"Filters"} className="no-padding-panel">
            <ListGroup style={listGroupStyle}>
                {filters}
            </ListGroup>
        </PanelWithButton>
    }

    onClickColum(filter: IExpressionFilter) {
        let newArray: IExpressionFilter[] = [];
        let existingFilter = this.props.SelectedFilters.find(f => f.ExpressionName == filter.ExpressionName);
        if (existingFilter != null) { // it exists
            let index = this.props.SelectedFilters.indexOf(existingFilter);
            newArray = [...this.props.SelectedFilters];
            newArray.splice(index, 1);
        }
        else {
            newArray = [...this.props.SelectedFilters];
            newArray.push(filter)
        }
        this.props.onFilterValuesChange(newArray);
    }
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};