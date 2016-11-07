/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {  Button, Form, Col, Panel, ListGroup, Row, Well} from 'react-bootstrap';

import {AdaptableBlotterState} from '../../Redux/Store/Interface/IAdaptableStore'
import {IStrategyViewPopupProps} from '../../Core/Interface/IStrategyView'
import {IColumn} from '../../Core/Interface/IAdaptableBlotter';
import {DualListBoxEditor} from './../DualListBoxEditor'
import * as ColumnChooserRedux from '../../Redux/ActionsReducers/ColumnChooserRedux'


interface ColumnChooserActionProps extends IStrategyViewPopupProps<ColumnChooserActionComponent> {
    Columns: Array<IColumn>
    onNewColumnListOrder : (VisibleColumnList: IColumn[]) => ColumnChooserRedux.SetNewColumnListOrderAction
}

class ColumnChooserActionComponent extends React.Component<ColumnChooserActionProps, {}> {
    render() {

        return <Panel header="Column Chooser" bsStyle="primary">
            <DualListBoxEditor AvailableValues={this.props.Columns.filter(x=>!x.Visible)}
                SelectedValues={this.props.Columns.filter(x=>x.Visible)}
                HeaderAvailable="Hidden Columns"
                HeaderSelected="Visible Columns"
                DisplayMember="ColumnFriendlyName"
                ValueMember="ColumnId"
                onChange={(SelectedValues) => this.props.onNewColumnListOrder(SelectedValues) }></DualListBoxEditor>
        </Panel>
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
        onNewColumnListOrder: (VisibleColumnList: IColumn[]) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList))
    };
}

export let ColumnChooserAction = connect(mapStateToProps, mapDispatchToProps)(ColumnChooserActionComponent);

