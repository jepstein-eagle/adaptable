/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { Form, Panel, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';


interface QuickSearchToolbarControlProps extends React.ClassAttributes<QuickSearchToolbarControl> {
    Blotter: IAdaptableBlotter
    onSetQuickSearchText: (quickSearchText: string) => void;
}

interface QuickSearchActionState {
    EditedQuickSearchText: string
}

export class QuickSearchToolbarControl extends React.Component<QuickSearchToolbarControlProps, QuickSearchActionState> {


    constructor() {
        super();
        this.state = { EditedQuickSearchText: "" }
    }
    public componentDidMount() {
        this.props.Blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.onQuickSearchStateChanged())
    }

    render(): any {
        return <Form className='navbar-form'>
          <Panel>
           <ControlLabel style={labelStyle}>Quick Search:</ControlLabel>
             <FormControl
                type="text"
                placeholder="Enter Search Text"
                value={(this.state != null) ? this.state.EditedQuickSearchText : ""}
                onChange={(x) => this.onUpdateQuickSearchText(x)}
                onKeyDown={(x) => this.onKeyDownQuickSearch(x)}
                />{' '}

            <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Run Quick Search</Tooltip>}>
                <Button bsSize='small' bsStyle='success' onClick={() => this.onSetQuickSearch()}>Search</Button>
            </OverlayTrigger>
            {' '}
            <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear Quick Search</Tooltip>}>
                <Button bsSize='small' onClick={() => this.onClearQuickSearch()}>Clear</Button>
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
        this.setState({ EditedQuickSearchText: "" });
        this.props.onSetQuickSearchText("");
    }

    onQuickSearchStateChanged() {
        if (this.state != null && this.state.EditedQuickSearchText != this.props.Blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText) {
            this.setState({ EditedQuickSearchText: this.props.Blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText });
        }
    }
}

var labelStyle = {
     margin: '5px'
};

