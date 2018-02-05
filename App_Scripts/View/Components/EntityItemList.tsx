import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup } from 'react-bootstrap';


export interface EntityItemListProps extends React.ClassAttributes<EntityItemList> {
  entityRowInfo:   IEntityRowInfo[]
    items: any[]
    styleName?: string
}

export class EntityItemList extends React.Component<EntityItemListProps, {}> {
    render(): any {

        let bsStyle: string = (this.props.styleName )? this.props.styleName: "info"
        return <div>
            <PanelWithRow entityRowInfo={this.props.entityRowInfo} bsStyle={bsStyle} />
            <ListGroup style={listGroupStyle}>
                {this.props.items}
            </ListGroup>
        </div>
    }
}

let listGroupStyle: React.CSSProperties = {
    overflowY: 'auto',
    minHeight: '80px',
    maxHeight: '300px'
};

