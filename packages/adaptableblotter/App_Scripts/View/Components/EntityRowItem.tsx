

import * as React from "react";
/// <reference path="../../typings/.d.ts" />

export interface EntityRowItemProps extends React.ClassAttributes<EntityRowItem> {
    Content: any
}

export class EntityRowItem extends React.Component<EntityRowItemProps, {}> {
    render(): any {
        return <span style={{ fontSize: 'small' }}> {this.props.Content}</span>;
    }

}
