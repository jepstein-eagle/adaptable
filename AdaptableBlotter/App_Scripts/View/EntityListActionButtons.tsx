/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { ButtonToolbar, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import {  IUIError } from '../Core/Interface/IStrategy';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'



interface EntityListActionButtonsProps extends React.ClassAttributes<EntityListActionButtons> {
    editClick?: () => void;
    deleteClick?: () => void;
    shareClick?: () => void;
    showEdit?: boolean
    showDelete?: boolean
    showShare?: boolean
    disableEdit? : boolean
    disableDelete? : boolean
    disableShare? : boolean
}

export class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    public static defaultProps: EntityListActionButtonsProps = {
        showEdit: true,
        showDelete: true,
        disableEdit: false,
        disableDelete: false,
        showShare: true,
        disableShare: false
    };
    render() {
        return <ButtonToolbar>
            {this.props.showEdit &&
                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit</Tooltip>}>
                    <Button disabled={this.props.disableEdit} onClick={() => this.props.editClick()}><Glyphicon glyph="edit" /></Button>
                </OverlayTrigger>}
            {this.props.showDelete &&
                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                    <Button disabled={this.props.disableDelete} onClick={() => this.props.deleteClick()}><Glyphicon glyph="trash" /></Button>
                </OverlayTrigger>}
            {this.props.showShare &&
                <OverlayTrigger overlay={<Tooltip id="tooltipShare">Share With Team - disabled in this demo</Tooltip>}>
                    <Button disabled={this.props.disableShare} ><Glyphicon glyph="share" /></Button>
                </OverlayTrigger>}
        </ButtonToolbar>;
    }




}