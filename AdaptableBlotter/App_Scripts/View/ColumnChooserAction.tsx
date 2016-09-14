/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {  Button, Form, Col, Panel, ListGroup, Row, Well} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import {IStrategyViewPopupProps} from '../Core/Interface/IStrategyView'
import {IColumn} from '../Core/Interface/IAdaptableBlotter';
import {DualListBoxEditor} from './DualListBoxEditor'


interface ColumnChooserActionProps extends IStrategyViewPopupProps<ColumnChooserActionComponent> {
    Columns: Array<IColumn>
}

class ColumnChooserActionComponent extends React.Component<ColumnChooserActionProps, {}> {
    render() {

        return <Panel header="Column Chooser" bsStyle="primary">
            <DualListBoxEditor AvailableValues={[]}
                SelectedValues={this.props.Columns}
                HeaderAvailable="Hidden Columns"
                HeaderSelected="Visible Columns"
                DisplayMember="ColumnFriendlyName"
                ValueMember="ColumnId"
                onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues) }></DualListBoxEditor>
        </Panel>
    }
    OnSelectedValuesChange(ColumnList: string[]){

    }
}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

    };
}

export let ColumnChooserAction = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserActionComponent);

