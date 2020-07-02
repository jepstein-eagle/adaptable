import * as React from 'react';
import * as Redux from 'redux';

import ListGroupItem from '../../../components/List/ListGroupItem';
import ListGroup, { ListGroupProps } from '../../../components/List/ListGroup';
import { Icon } from '../../../components/icons';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';

export interface ListBoxMenuProps extends ListGroupProps {
  MenuItems: AdaptableMenuItem[];
  onMenuItemClick: (menuItem: AdaptableMenuItem) => AdaptableMenuItem;
}

export interface ListBoxMenuState extends React.ClassAttributes<ListBoxMenu> {}

export class ListBoxMenu extends React.Component<ListBoxMenuProps, ListBoxMenuState> {
  constructor(props: ListBoxMenuProps) {
    super(props);

    this.state = {};
  }

  render() {
    let menuItems = this.props.MenuItems.map((menuItem: AdaptableMenuItem, index: number) => {
      return (
        <ListGroupItem key={index} onClick={() => this.onClick(menuItem)}>
          {menuItem.Icon && <Icon name={menuItem.Icon} />}
          {menuItem.Label}
        </ListGroupItem>
      );
    });

    return (
      <div style={divStyle}>
        <ListGroup>{menuItems}</ListGroup>
      </div>
    );
  }

  onClick(menuItem: AdaptableMenuItem) {
    this.props.onMenuItemClick(menuItem);
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '450px',
  marginBottom: '0',
};
