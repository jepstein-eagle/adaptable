/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { FormControl, Panel, Form, FormGroup, Button, Table, MenuItem, ControlLabel, Checkbox } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'

interface QuickSearchActionProps extends React.ClassAttributes<QuickSearchActionComponent> {
    QuickSearchText: string;
    AdaptableBlotter: IAdaptableBlotter;
    onSetQuickSearchText: (QuickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction,
}

interface QuickSearchActionState {
    EditedQuickSearchText: string
}

class QuickSearchActionComponent extends React.Component<QuickSearchActionProps, QuickSearchActionState> {

    constructor() {
        super();
        this.state = { EditedQuickSearchText: "" }
    }

    public componentDidMount() {
        this.setState({ EditedQuickSearchText: this.props.QuickSearchText });
    }

    handleFileNameChange(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.setState({ EditedQuickSearchText: e.value });
    }

    onApplySearch(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.props.onSetQuickSearchText(this.state.EditedQuickSearchText);
    }

    render() {
        var blotter = this.props.AdaptableBlotter;
        return (
            <div >
                <Panel header="Quick Search" bsStyle="primary">
                    <Form inline>
                        <div style={divStyle}>
                            <ControlLabel>Search For: </ControlLabel>
                            {'   '}
                            <FormControl value={this.state.EditedQuickSearchText} type="string" placeholder="Enter quick search text"
                                onChange={(e: React.FormEvent) => this.handleFileNameChange(e)} />
                        </div>
                        <div style={divStyle}>
                            <Button bsStyle="primary" onClick={(x) => this.onApplySearch(x)} >Search</Button>
                        </div>
                    </Form>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.AdaptableBlotter,
        QuickSearchText: state.QuickSearch.QuickSearchText,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetQuickSearchText: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(quickSearchText)),
    };
}

export let QuickSearchAction = connect(mapStateToProps, mapDispatchToProps)(QuickSearchActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '10px'
};