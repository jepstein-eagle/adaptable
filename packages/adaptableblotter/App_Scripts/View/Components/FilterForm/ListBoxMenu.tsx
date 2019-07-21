import * as React from 'react';
import * as Redux from 'redux';
import { ListGroupItem, ListGroup, ListGroupProps, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterMenuItem } from '../../../Utilities/Interface/AdaptableBlotterMenu';

export interface ListBoxMenuProps extends ListGroupProps {
  MenuItems: AdaptableBlotterMenuItem[];
  onMenuItemClick: (action: Redux.Action) => Redux.Action;
}

export interface ListBoxMenuState extends React.ClassAttributes<ListBoxMenu> {}

export class ListBoxMenu extends React.Component<ListBoxMenuProps, ListBoxMenuState> {
  constructor(props: ListBoxMenuProps) {
    super(props);

    this.state = {};
  }

  render() {
    let menuItems = this.props.MenuItems.map((menuItem: AdaptableBlotterMenuItem) => {
      return (
        <ListGroupItem key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
          <Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}
        </ListGroupItem>
      );
    });

    return (
      <div style={divStyle}>
        <ListGroup>{menuItems}</ListGroup>
      </div>
    );
  }

  onClick(menuItem: AdaptableBlotterMenuItem) {
    this.props.onMenuItemClick(menuItem.Action);
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '450px',
  marginBottom: '0',
};
