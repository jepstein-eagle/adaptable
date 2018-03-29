import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ListGroup } from 'react-bootstrap';
import { IColItem } from "../UIInterfaces";


export interface AdaptableObjectCollectionProps extends React.ClassAttributes<AdaptableObjectCollection> {
    ColItems:   IColItem[]
    items: any[]
    bsStyle?: string
    reducedPanel?: boolean
}

export class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
    render(): any {

        let bsStyle: string = (this.props.bsStyle )? this.props.bsStyle: "info"
        let className: string = (this.props.reducedPanel==true )? "adaptaleblotter_object_list_item_medium": "adaptaleblotter_object_list_item"
        return <div>
            <PanelWithRow ColItems={this.props.ColItems} bsStyle={bsStyle} />
            <ListGroup className={className}>
                {this.props.items}
            </ListGroup>
        </div>
    }
}


