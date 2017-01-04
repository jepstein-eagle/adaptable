import { IShortcut } from '../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, Checkbox } from 'react-bootstrap';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { PanelWithRow } from './PanelWithRow';
import { PanelWithButton } from './PanelWithButton';





interface FilterFormProps extends React.ClassAttributes<FilterFormComponent> {

}

interface FilterFormState {
    isEditing: boolean;
}

class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
    constructor() {
        super();
        this.state = { isEditing: false }
    }

    render() {

        let cellInfo: [string, number][] = [["Live", 1], ["Key", 2], ["Columns", 2], ["Action", 3], ["Result", 3], ["", 1]];


        return <PanelWithButton headerText="Shortcuts"
            buttonContent={"Create Shortcut"} bsStyle="primary" style={panelStyle}>
            <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
        </PanelWithButton>
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {

    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

    };
}

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (AdaptableBlotter: IAdaptableBlotter) => <Provider store={AdaptableBlotter.AdaptableBlotterStore.TheStore}>
    <FilterForm  />
</Provider>;

let panelStyle = {
    width: '800px'
}
