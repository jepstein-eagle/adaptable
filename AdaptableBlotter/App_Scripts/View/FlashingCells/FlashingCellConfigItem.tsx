import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Col, Panel, Row, Checkbox, FormControl } from 'react-bootstrap';
import { ColumnType } from '../../Core/Enums'
import { IFlashingColumn, IFlashingCellDuration } from '../../Core/Interface/IFlashingCellsStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { EnumExtensions } from '../../Core/Extensions';
import { ColorPicker } from '../ColorPicker';

interface FlashingCellConfigItemProps extends React.ClassAttributes<FlashingCellConfigItem> {
    FlashingColumn: IFlashingColumn;
    Columns: IColumn[];
    FlashingCellDurations: IFlashingCellDuration[];
    onSelect: (flashingColumn: IFlashingColumn) => void;
    onChangeFlashingDuration: (flashingColumn: IFlashingColumn, NewFlashDuration: IFlashingCellDuration) => void;
    onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => void;
    onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => void;
}

export class FlashingCellConfigItem extends React.Component<FlashingCellConfigItemProps, {}> {

    render(): any {
        let isDisabled = this.props.FlashingColumn.IsPredefined
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={1} >
                    <Checkbox disabled={isDisabled} onChange={() => this.props.onSelect(this.props.FlashingColumn)} checked={this.props.FlashingColumn.IsLive}></Checkbox>
                </Col>
                <Col md={4} >
                    {this.props.Columns.find(f => f.ColumnId == this.props.FlashingColumn.ColumnName).FriendlyName}
                </Col>
                <Col md={3} >
                    {
                        <FormControl disabled={isDisabled} componentClass="select" value={this.props.FlashingColumn.FlashingCellDuration.Name} onChange={(x) => this.onActionChange(x)} >
                            {
                                this.props.FlashingCellDurations.map((flashingCellDuration: IFlashingCellDuration) => {
                                    return <option key={flashingCellDuration.Name} value={flashingCellDuration.Name}>{flashingCellDuration.Name}</option>
                                })
                            }
                        </FormControl>
                    }
                </Col>
                <Col md={2} >
                    <ColorPicker disabled={isDisabled} value={this.props.FlashingColumn.UpBackColor} onChange={(x) => this.onUpColorChange(x)} />
                </Col>
                <Col md={2} >
                    <ColorPicker disabled={isDisabled} value={this.props.FlashingColumn.DownBackColor} onChange={(x) => this.onDownColorChange(x)} />
                </Col>
            </Row>
        </li>
    }


    onActionChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeFlashingDuration(this.props.FlashingColumn, this.props.FlashingCellDurations.find(f => f.Name == e.value));
    }

    onDownColorChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeDownColorFlashingColumn(this.props.FlashingColumn, e.value);
    }

    onUpColorChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeUpColorFlashingColumn(this.props.FlashingColumn, e.value);
    }
}

