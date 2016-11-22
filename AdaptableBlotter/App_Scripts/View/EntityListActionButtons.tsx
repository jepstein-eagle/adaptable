/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { ButtonToolbar, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';



interface EntityListActionButtonsProps extends React.ClassAttributes<EntityListActionButtons> {
    editClick?: () => void;
    deleteClick?: () => void;
    showEdit?: boolean
    showDelete?: boolean
    editDisabled? : boolean
    deleteDisabled? : boolean
}

export class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    public static defaultProps: EntityListActionButtonsProps = {
        showEdit: true,
        showDelete: true,
        editDisabled: false,
        deleteDisabled: false
    };
    render() {
        return <ButtonToolbar>
            {this.props.showEdit &&
                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit</Tooltip>}>
                    <Button disabled={this.props.editDisabled} onClick={() => this.props.editClick()}><Glyphicon glyph="edit" /></Button>
                </OverlayTrigger>}
            {this.props.showDelete &&
                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                    <Button disabled={this.props.deleteDisabled} onClick={() => this.props.deleteClick()}><Glyphicon glyph="trash" /></Button>
                </OverlayTrigger>}
        </ButtonToolbar>;
    }
}