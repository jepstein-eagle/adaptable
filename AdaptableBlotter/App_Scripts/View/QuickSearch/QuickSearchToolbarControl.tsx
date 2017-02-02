/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';

import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { Form, Panel, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'

interface QuickSearchToolbarControlComponentProps extends IStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onSetQuickSearchText: (quickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction;
    QuickSearchText: string
}

interface QuickSearchToolbarControlComponentState {
    EditedQuickSearchText: string
}

class QuickSearchToolbarControlComponent extends React.Component<QuickSearchToolbarControlComponentProps, QuickSearchToolbarControlComponentState> {

    constructor() {
        super();
        this.state = { EditedQuickSearchText: "" }
    }
    componentWillReceiveProps(nextProps: QuickSearchToolbarControlComponentProps, nextContext: any) {
        this.setState({
            EditedQuickSearchText: nextProps.QuickSearchText
        });
    }

    render(): any {
        return <Form className='navbar-form'>
            <Panel className="small-padding-panel" >
                <ControlLabel style={labelStyle}>Quick Search:</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter Search Text"
                    value={(this.state != null) ? this.state.EditedQuickSearchText : ""}
                    onChange={(x) => this.onUpdateQuickSearchText(x)}
                    onKeyDown={(x) => this.onKeyDownQuickSearch(x)}
                    />{' '}

                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Run Quick Search</Tooltip>}>
                    <Button bsSize='small' bsStyle='info' disabled={StringExtensions.IsEmpty(this.state.EditedQuickSearchText)} onClick={() => this.onSetQuickSearch()}>Search</Button>
                </OverlayTrigger>
                {' '}
                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear Quick Search</Tooltip>}>
                    <Button bsSize='small' disabled={StringExtensions.IsEmpty(this.state.EditedQuickSearchText)} onClick={() => this.onClearQuickSearch()}>Clear</Button>
                </OverlayTrigger>
            </Panel>
        </Form>

    }

    onUpdateQuickSearchText(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ EditedQuickSearchText: e.value });
    }

    // doing 2 things here 
    // 1. stopping reload of blotter on pressing enter in form
    // 2.  triggering the apply quick search (in other words making it as though I pressed the search button)
    onKeyDownQuickSearch(event: React.KeyboardEvent) {
        if (event.keyCode == 13) {
            event.preventDefault();
            this.onSetQuickSearch();
        }
    }

    onSetQuickSearch() {
        this.props.onSetQuickSearchText(this.state.EditedQuickSearchText);
    }

    onClearQuickSearch() {
        //Jo:no need to update state since we'll get the update from redux
        // this.setState({ EditedQuickSearchText: "" });
        this.props.onSetQuickSearchText("");
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetQuickSearchText: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(newQuickSearchText))
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);

var labelStyle = {
    marginRight: '3px'
};

