import * as React from "react";
import * as Redux from "redux";
import { ListGroupItem, ListGroup, ListGroupProps, Glyphicon } from 'react-bootstrap';
import { IMenuItem } from "../../../Utilities/Interface/IMenu";

export interface ListBoxMenuProps extends ListGroupProps {
    ContextMenuItems: IMenuItem[]
    onContextMenuItemClick: (action: Redux.Action) => Redux.Action,
}

export interface ListBoxMenuState extends React.ClassAttributes<ListBoxMenu> {
}

export class ListBoxMenu extends React.Component<ListBoxMenuProps, ListBoxMenuState> {
        constructor(props: ListBoxMenuProps) {
        super(props);

        this.state = {
           
        };
    }
 

    render() {

        let menuItems = this.props.ContextMenuItems.map((menuItem: IMenuItem) => {
            return <ListGroupItem  key={menuItem.Label} onClick={() => this.onClick(menuItem)}>
                <Glyphicon glyph={menuItem.GlyphIcon} /> {menuItem.Label}
            </ListGroupItem>
        });

        return <div style={divStyle}>
        <ListGroup   >
           {menuItems}
            </ListGroup>
        </div>;
    }

    onClick(menuItem: IMenuItem) {
        this.props.onContextMenuItemClick(menuItem.Action)
    }
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '450px',
    'marginBottom': '0'
}
