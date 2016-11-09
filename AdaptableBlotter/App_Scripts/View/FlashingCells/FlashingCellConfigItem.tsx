import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, FormControl, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { ColumnType, FlashingCellDuration } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper, EnumEx } from '../../Core/Helper';


interface FlashingCellConfigItemProps extends React.ClassAttributes<FlashingCellConfigItem> {
    FlashingColumn: IFlashingColumn;
    Columns: IColumn[];
    onSelect: (flashingColumn: IFlashingColumn) => void;
    onChangeFlashingDuration: (flashingColumn: IFlashingColumn, NewFlashDuration: any) => void;
}

export class FlashingCellConfigItem extends React.Component<FlashingCellConfigItemProps, {}> {

    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={3} >
                    <Checkbox onChange={() => this.props.onSelect(this.props.FlashingColumn)} checked={this.props.FlashingColumn.IsLive}></Checkbox>
                </Col>
                <Col md={4} >
                    {this.props.Columns.find(f => f.ColumnId == this.props.FlashingColumn.ColumnName).ColumnFriendlyName}
                </Col>
                <Col md={5} >
                    {
                        <FormControl componentClass="select" value={this.props.FlashingColumn.FlashingCellDuration.toString()} onChange={(x) => this.onActionChange(x)} >
                            {
                                EnumEx.getValues(FlashingCellDuration).map((flashingCellDuration: FlashingCellDuration) => {
                                    return <option key={FlashingCellDuration[flashingCellDuration]} value={flashingCellDuration.toString()}>{FlashingCellDuration[flashingCellDuration]}</option>
                                })
                            }
                        </FormControl>
                    }
                </Col>

            </Row>
        </li>
    }


    onActionChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeFlashingDuration(this.props.FlashingColumn, Number.parseInt(e.value));
    }
}


interface FlashingCellConfigHeaderProps extends React.ClassAttributes<FlashingCellConfigHeader> {
}

export class FlashingCellConfigHeader extends React.Component<FlashingCellConfigHeaderProps, {}> {
    render(): any {
        return <Panel style={panelHeaderStyle} >
            <Row >
                <Col md={3} style={headerStyle}>Live</Col>
                <Col md={4} style={headerStyle}>Column Name</Col>
                <Col md={5} style={headerStyle}>Flash Duration</Col>
            </Row>
        </Panel>
    }
}

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle: React.CSSProperties = {
    marginBottom: '0px'
}
