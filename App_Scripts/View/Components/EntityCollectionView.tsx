import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup } from 'react-bootstrap';


export interface EntityCollectionViewProps extends React.ClassAttributes<EntityCollectionView> {
    ColItems:   IColItem[]
    items: any[]
    bsStyle?: string
}

export class EntityCollectionView extends React.Component<EntityCollectionViewProps, {}> {
    render(): any {

        let bsStyle: string = (this.props.bsStyle )? this.props.bsStyle: "info"
        return <div>
            <PanelWithRow ColItems={this.props.ColItems} bsStyle={bsStyle} />
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

