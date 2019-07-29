import * as React from 'react';

import Panel from '../../components/Panel';
import ListGroupItem from '../../components/List/ListGroupItem';
import ListGroup from '../../components/List/ListGroup';

// this just takes a list of filter names - doesnt care if they are system or user or named
export interface ExpressionBuilderUserFilterProps
  extends React.ClassAttributes<ExpressionBuilderUserFilter> {
  AvailableSystemFilterNames: Array<string>;
  AvailableUserFilterNames: Array<string>;
  AvailableNamedFilterNames: Array<string>;
  SelectedFilterNames: Array<string>;
  onFilterNameChange: (selectedFilterNames: Array<string>) => void;
  cssClassName: string;
}

export class ExpressionBuilderUserFilter extends React.Component<
  ExpressionBuilderUserFilterProps,
  {}
> {
  render(): any {
    const filters = [
      ...this.props.AvailableSystemFilterNames,
      ...this.props.AvailableUserFilterNames,
      ...this.props.AvailableNamedFilterNames,
    ];
    var filterItems = filters.map((sf: string, index: number) => {
      return (
        <ListGroupItem
          key={index}
          onClick={() => this.onClickColum(sf)}
          active={this.props.SelectedFilterNames.some(f => f == sf)}
        >
          {sf}
        </ListGroupItem>
      );
    });

    return (
      <Panel style={{ flex: 1 }} bodyScroll>
        <ListGroup>{filterItems}</ListGroup>
      </Panel>
    );
  }

  onClickColum(filterName: string) {
    let newArray: string[] = [];
    let existingUserFilterExpression = this.props.SelectedFilterNames.find(f => f == filterName);
    if (existingUserFilterExpression != null) {
      // it exists
      let index = this.props.SelectedFilterNames.indexOf(existingUserFilterExpression);
      newArray = [...this.props.SelectedFilterNames];
      newArray.splice(index, 1);
    } else {
      newArray = [...this.props.SelectedFilterNames];
      newArray.push(filterName);
    }
    this.props.onFilterNameChange(newArray);
  }
}
