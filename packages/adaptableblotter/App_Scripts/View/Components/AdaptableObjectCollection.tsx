import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from './Panels/PanelWithRow';
import { ListGroup } from 'react-bootstrap';
import { IColItem } from "../UIInterfaces";
import { SmartEditApply } from "../../Redux/ActionsReducers/SmartEditRedux";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';


export interface AdaptableObjectCollectionProps extends React.ClassAttributes<AdaptableObjectCollection> {
    colItems: IColItem[]
    items: any[]
    bsStyle?: string
    reducedPanel?: boolean
    allowOverflow?: boolean
     cssClassName: string
     bsSize?: string
}

export class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
    render(): any {
        let allowOverflow: any = this.props.allowOverflow ? "visible" : "auto";
        let bsStyle: string = (this.props.bsStyle) ? this.props.bsStyle : "info"
        let className: string = (this.props.reducedPanel == true) ? "ab_object_list_item_small" : "ab_object_list_item"
        let bsSize: any = (this.props.bsSize)? this.props.bsSize: "small"
        return <div className={this.props.cssClassName + StyleConstants.ITEMS_TABLE}>
            <PanelWithRow cssClassName={this.props.cssClassName} colItems={this.props.colItems} bsStyle={bsStyle} bsSize={bsSize} />
            <div className={this.props.cssClassName + StyleConstants.ITEMS_TABLE_BODY}>
                <ListGroup className={className} style={{ overflowY: allowOverflow }}>
                    {this.props.items}
                </ListGroup>
            </div>
        </div>
    }
}


