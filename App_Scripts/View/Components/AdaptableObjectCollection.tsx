import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ListGroup } from 'react-bootstrap';
import { IColItem } from "../UIInterfaces";
import { SmartEditApply } from "../../Redux/ActionsReducers/SmartEditRedux";


export interface AdaptableObjectCollectionProps extends React.ClassAttributes<AdaptableObjectCollection> {
    ColItems: IColItem[]
    items: any[]
    bsStyle?: string
    reducedPanel?: boolean
    allowOverflow?: boolean
}

export class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
    render(): any {

        let allowOverflow: any = this.props.allowOverflow ? "visible" : "auto";
        let bsStyle: string = (this.props.bsStyle) ? this.props.bsStyle : "info"
        let className: string = (this.props.reducedPanel == true) ? "adaptale_blotter_object_list_item_medium" : "adaptale_blotter_object_list_item"
        return <div >
            <PanelWithRow ColItems={this.props.ColItems} bsStyle={bsStyle} bsSize={"small"} />
            <ListGroup className={className} style={{ overflowY: allowOverflow }}>
                {this.props.items}
            </ListGroup>
        </div>
    }
}


