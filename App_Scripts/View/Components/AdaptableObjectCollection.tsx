import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ListGroup } from 'react-bootstrap';
import { IColItem } from "../UIInterfaces";


export interface AdaptableObjectCollectionProps extends React.ClassAttributes<AdaptableObjectCollection> {
    ColItems:   IColItem[]
    items: any[]
    bsStyle?: string
}

export class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
    render(): any {

        let bsStyle: string = (this.props.bsStyle )? this.props.bsStyle: "info"
        return <div>
            <PanelWithRow ColItems={this.props.ColItems} bsStyle={bsStyle} />
            <ListGroup className="adaptaleblotter_object_list_item">
                {this.props.items}
            </ListGroup>
        </div>
    }
}


