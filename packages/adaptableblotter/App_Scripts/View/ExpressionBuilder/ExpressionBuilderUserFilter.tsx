import * as React from 'react';

import Panel from '../../components/Panel';
import ListGroupItem from '../../components/List/ListGroupItem';
import ListGroup from '../../components/List/ListGroup';

// this just takes a list of filter names - doesnt care if they are system or user
export interface ExpressionBuilderUserFilterProps
  extends React.ClassAttributes<ExpressionBuilderUserFilter> {
  AvailableSystemFilterNames: Array<string>;
  AvailableUserFilterNames: Array<string>;
  SelectedFilterNames: Array<string>;
  onFilterNameChange: (selectedFilterNames: Array<string>) => void;
  cssClassName: string;
}

export class ExpressionBuilderUserFilter extends React.Component<
  ExpressionBuilderUserFilterProps,
  {}
> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + '__queryuserfilters';

    var systemFilterNames = this.props.AvailableSystemFilterNames.map(
      (sf: string, index: number) => {
        return (
          <ListGroupItem
            key={index}
            onClick={() => this.onClickColum(sf)}
            active={!!this.props.SelectedFilterNames.find(f => f == sf)}
          >
            {sf}
          </ListGroupItem>
        );
      }
    );

    var userFilterNames = this.props.AvailableUserFilterNames.map((uf: string, index: number) => {
      return (
        <ListGroupItem
          key={index}
          onClick={() => this.onClickColum(uf)}
          active={!!this.props.SelectedFilterNames.find(f => f == uf)}
        >
          <i>{uf}</i>
        </ListGroupItem>
      );
    });

    return (
      <div className={cssClassName}>
        <Panel
          className="ab_no-padding-anywhere-panel ab_small-padding-panel-header"
          style={divStyle}
        >
          <ListGroup>
            {systemFilterNames}
            {userFilterNames}
          </ListGroup>
        </Panel>
      </div>
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

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
};
