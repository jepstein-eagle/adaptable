import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import {CustomSortEditor} from './CustomSortEditor'
import {IStrategyViewPopupProps} from '../Core/Interface/IStrategyView'
import {IColumn} from '../Core/Interface/IAdaptableBlotter';


interface CustomSortConfigProps extends IStrategyViewPopupProps<CustomSortConfigComponent> {
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction
    onDeleteCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortDeleteAction
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction
    CustomSorts: Array<ICustomSort>
}

interface CustomSortConfigInternalState {
    isEditing: boolean;
}

class CustomSortConfigComponent extends React.Component<CustomSortConfigProps, CustomSortConfigInternalState> {
    constructor() {
        super();
        this.state = { isEditing: false }
    }
    render() {
        let customSorts = this.props.CustomSorts.map((customSort: ICustomSort) => {
            return <CustomSortConfigItem CustomSort={customSort} key={customSort.ColumnId}
                onEdit={(customSort) => this.onEditCustomSort(customSort) }
                onDelete={(customSort) => this.props.onDeleteCustomSort(customSort) }></CustomSortConfigItem>
        });
        var menuColItems = this.props.AdaptableBlotter.getColumns().map((col: IColumn) => {
            if (!this.props.CustomSorts.find(x => x.ColumnId == col.ColumnId)) {
                return <MenuItem key={col.ColumnId} onClick={() => this.CreateCustomSort(col.ColumnId) }>{col.ColumnFriendlyName}</MenuItem>
            }
        });

        let header = <Form horizontal>
            <Row>
                <Col xs={7}>Custom Sorts</Col>
                <Col xs={5}>
                    <SplitButton title="Create Custom Sort" id="Create_Custom_Sort">
                        {menuColItems}
                    </SplitButton>
                </Col>
            </Row>
        </Form>;
        return <Panel header={header} bsStyle="primary">
            <ListGroup>
                {customSorts}
            </ListGroup>
            <Modal show={this.state.isEditing} onHide={() => this.closeEditing() }  >
                {/*<Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>*/}
                <Modal.Body style={divStyle}>
                    <CustomSortEditor CustomSort={this._editedCustomSort}
                        ColumnValues={this._columnValues}
                        onChange={(selectedValues) => this.onCustomSortChange(selectedValues) }
                        ></CustomSortEditor>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.closeEditing() }>Close</Button>
                </Modal.Footer>
            </Modal>
        </Panel>
    }
    private _columnValues: any[];
    private _editedCustomSort: ICustomSort;

    closeEditing() {
        if (this.props.CustomSorts.find(x => x.ColumnId == this._editedCustomSort.ColumnId)) {
            this.props.onEditCustomSort(this._editedCustomSort)
        }
        else {
            this.props.onAddCustomSort(this._editedCustomSort)
        }


        this.setState({ isEditing: false }, () => { this._editedCustomSort = null;this._columnValues = [];});
    }

    private onEditCustomSort(customSort: ICustomSort) {
        //I'm unsure if we should do it like that or do the whole Redux roundtrip,.......
        this._editedCustomSort = customSort;
        this._columnValues = Array.from(new Set(this.props.AdaptableBlotter.getColumnValueString(customSort.ColumnId)));
        this.setState({ isEditing: true });
    }

    CreateCustomSort(ColumnId: string) {
        this._editedCustomSort = { ColumnId: ColumnId, CustomSortItems: [] };
        this._columnValues = Array.from(new Set(this.props.AdaptableBlotter.getColumnValueString(ColumnId)));
        this.setState({ isEditing: true });
    }

    onCustomSortChange(selectedValues: Array<string>) {
        this._editedCustomSort.CustomSortItems = selectedValues;
        //we don't update store at this time since it will update the sort in the grid and it takes a bit of time as we need to reinint the fucking grid......
    }
}

interface CustomSortConfigItemProps extends React.ClassAttributes<CustomSortConfigItem> {
    CustomSort: ICustomSort
    onEdit: (CustomSort: ICustomSort) => void;
    onDelete: (CustomSort: ICustomSort) => void;
}
export class CustomSortConfigItem extends React.Component<CustomSortConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row>
                <Col xs={2}>{this.props.CustomSort.ColumnId}</Col>
                <Col xs={6} style={divStyle}>
                    {this.props.CustomSort.CustomSortItems.join() }
                </Col>
                <Col xs={2}>
                    <Button onClick={() => this.props.onEdit(this.props.CustomSort) }>Edit</Button>
                </Col>
                <Col xs={2}>
                    <Button onClick={() => this.props.onDelete(this.props.CustomSort) }>Delete</Button>
                </Col>
            </Row>
        </li>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CustomSorts: state.CustomSort.CustomSorts,
        AdaptableBlotter: ownProps.AdaptableBlotter
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.AddCustomSort(customSort)),
        onDeleteCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.DeleteCustomSort(customSort)),
        onEditCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.EditCustomSort(customSort))
    };
}

export let CustomSortConfig = connect(mapStateToProps, mapDispatchToProps)(CustomSortConfigComponent);

var divStyle = {
    wordWrap: 'break-word'
};