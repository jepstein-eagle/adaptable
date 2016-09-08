import {IShortcut} from '../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, Checkbox} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import {IStrategyViewPopupProps} from '../Core/Interface/IStrategyView'
import {IColumn} from '../Core/Interface/IAdaptableBlotter';


interface ShortcutConfigProps extends IStrategyViewPopupProps<ShortcutConfigComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onDeleteShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutDeleteAction
    onEditShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutEditAction
    onSelectShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutSelectAction
    Shortcuts: Array<IShortcut>
}

interface ShortcutConfigInternalState {
    isEditing: boolean;
}

class ShortcutConfigComponent extends React.Component<ShortcutConfigProps, ShortcutConfigInternalState> {
    constructor() {
        super();
        this.state = { isEditing: false }
    }
    render() {
        let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut) => {
            return <ShortcutConfigItem Shortcut={shortcut} key={shortcut.ShortcutId}
                onSelect={(shortcut) => this.props.onSelectShortcut(shortcut) }
                onEdit={(shortcut) => this.onEditShortcut(shortcut) }
                onDelete={(shortcut) => this.props.onDeleteShortcut(shortcut) }>
            </ShortcutConfigItem>
        });
        let header = <Form horizontal>
            <Row>
                <Col xs={7}>Shortcuts</Col>
                <Col xs={5}>
                    <Button title="Create Shortcut" id="Create_Shortcut" content="Create Shortcut">Create Shortcut</Button>
                </Col>
            </Row>
        </Form>;

        let row = <Row>
            <Col md={2} style={headerStyle}>Active</Col>
            <Col md={2} style={headerStyle}>Key</Col>
            <Col md={3} style={headerStyle}>Result</Col>
            <Col md={5} style={headerStyle}>Actions</Col>
        </Row>


        return <Panel header={header} bsStyle="primary">
            {row}
            <ListGroup>
                {shortcuts}
            </ListGroup>

            <Modal show={this.state.isEditing} onHide={() => this.closeEditing() }  >
                {/*<Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>*/}
                <Modal.Body style={divStyle}>



                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.closeEditing() }>Close</Button>
                </Modal.Footer>
            </Modal>

        </Panel>
    }

    private _editedShortcut: IShortcut;

    closeEditing() {
        if (this.props.Shortcuts.find(x => x.ShortcutId == this._editedShortcut.ShortcutId)) {
            this.props.onEditShortcut(this._editedShortcut)
        }
        else {
            this.props.onEditShortcut(this._editedShortcut)
        }
        this.setState({ isEditing: false }, () => { this._editedShortcut = null; });
    }

    private onEditShortcut(shortcut: IShortcut) {
        //I'm unsure if we should do it like that or do the whole Redux roundtrip,.......
        this._editedShortcut = shortcut;
        this.setState({ isEditing: true });
    }

    CreateShortcut(ShortcutId: string) {
        this._editedShortcut = null; // probably rubbish
        this.setState({ isEditing: true });
    }

}

interface ShortcutConfigItemProps extends React.ClassAttributes<ShortcutConfigItem> {
    Shortcut: IShortcut
    onSelect: (Shortcut: IShortcut) => void;
    onEdit: (Shortcut: IShortcut) => void;
    onDelete: (Shortcut: IShortcut) => void;
}
export class ShortcutConfigItem extends React.Component<ShortcutConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <Checkbox inline onClick={() => this.props.onSelect(this.props.Shortcut) } checked={this.props.Shortcut.IsLive}></Checkbox>
                    </FormGroup>
                </Col>
                <Col md={2} style={divStyle}>
                    {this.props.Shortcut.ShortcutKey }
                </Col>
                <Col md={3} style={divStyle}>
                    {this.props.Shortcut.ShortcutResult }
                </Col>
                <Col md={5}>
                    <Button onClick={() => this.props.onEdit(this.props.Shortcut) }>Edit</Button>
                    <Button disabled={this.props.Shortcut.IsPredefined} onClick={() => this.props.onDelete(this.props.Shortcut) }>Delete</Button>
                </Col>

            </Row>
        </li>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Shortcuts: state.Shortcut.Shortcuts,
        AdaptableBlotter: ownProps.AdaptableBlotter
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.SelectShortcut(shortcut)),
        onAddShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.AddShortcut(shortcut)),
        onDeleteShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.DeleteShortcut(shortcut)),
        onEditShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.EditShortcut(shortcut))
    };
}

export let ShortcutConfig = connect(mapStateToProps, mapDispatchToProps)(ShortcutConfigComponent);

var headerStyle = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

var divStyle = {
    wordWrap: 'break-word'
};