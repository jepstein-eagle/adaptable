import * as React from "react";
import * as Redux from "redux";
import { ListGroupProps } from 'react-bootstrap';
import { IMenuItem } from "../../../Api/Interface/IMenu";
export interface ListBoxMenuProps extends ListGroupProps {
    ContextMenuItems: IMenuItem[];
    onContextMenuItemClick: (action: Redux.Action) => Redux.Action;
}
export interface ListBoxMenuState extends React.ClassAttributes<ListBoxMenu> {
}
export declare class ListBoxMenu extends React.Component<ListBoxMenuProps, ListBoxMenuState> {
    constructor(props: ListBoxMenuProps);
    render(): JSX.Element;
    onClick(menuItem: IMenuItem): void;
}
