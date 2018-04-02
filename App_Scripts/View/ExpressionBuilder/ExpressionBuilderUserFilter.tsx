import * as React from "react";
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { ListGroupItem, ListGroup } from 'react-bootstrap';
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy';


// this just takes a list of filter names - doesnt care if they are system or user
export interface ExpressionBuilderUserFilterProps extends React.ClassAttributes<ExpressionBuilderUserFilter> {
    AvailableFilterNames: Array<string>
    SelectedFilterNames: Array<string>
    onFilterNameChange: (selectedFilterNames: Array<string>) => void
}

export class ExpressionBuilderUserFilter extends React.Component<ExpressionBuilderUserFilterProps, {}> {

    render(): any {

        var userFilterNames = this.props.AvailableFilterNames.map((ne: string, index: number) => {
            return <ListGroupItem key={index} bsSize={"small"}
                onClick={() => this.onClickColum(ne)}
                active={this.props.SelectedFilterNames.find(f => f==ne)}>

                {ne}
            </ListGroupItem>
        })

        return <PanelWithButton headerText={"Filters"} className="no-padding-panel"  bsStyle="info" style={divStyle}>
            <ListGroup >
                {userFilterNames}
            </ListGroup>
        </PanelWithButton>
    }

    onClickColum(filterName: string) {
        let newArray: string[] = [];
        let existingUserFilterExpression = this.props.SelectedFilterNames.find(f => f == filterName);
        if (existingUserFilterExpression != null) { // it exists
            let index = this.props.SelectedFilterNames.indexOf(existingUserFilterExpression);
            newArray = [...this.props.SelectedFilterNames];
            newArray.splice(index, 1);
        }
        else {
            newArray = [...this.props.SelectedFilterNames];
            newArray.push(filterName)
        }
        this.props.onFilterNameChange(newArray);
    }
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '445px',
    'maxHeight': '445px',
    'marginBottom': '0'
}
