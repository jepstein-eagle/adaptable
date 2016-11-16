/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Accordion, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { SearchStringOperator } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';


interface QuickSearchActionProps extends React.ClassAttributes<QuickSearchActionComponent> {
    QuickSearchText: string;
    SearchStringOperator: SearchStringOperator;
    AdaptableBlotter: IAdaptableBlotter;
    onSetQuickSearchText: (quickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction,
    onSetStringOperator: (searchStringOperator: SearchStringOperator) => QuickSearchRedux.QuickSearchSetStringOperatorAction

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

    onSetQuickSearch() {
        this.props.onSetQuickSearchText(this.state.EditedQuickSearchText);
    }

    onKeyDownQuickSearch(event: React.KeyboardEvent) {
        if (event.keyCode == 13) {
            event.preventDefault();
            this.onSetQuickSearch();
        }
    }

    onClearQuickSearch() {
        this.setState({ EditedQuickSearchText: "" });
        this.props.onSetQuickSearchText("");
    }

    onStringOperatorChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetStringOperator(Number.parseInt(e.value));
    }

    render() {
        var blotter = this.props.AdaptableBlotter;

        let optionColours = EnumExtensions.getNamesAndValues(SearchStringOperator).map((stringOperatorNameAndValue: any) => {
            return <option key={stringOperatorNameAndValue.value} value={stringOperatorNameAndValue.value}>{stringOperatorNameAndValue.name}</option>
        })

        return (
            <div >
                <Panel header="Quick Search" bsStyle="primary">
                    <Form inline>
                        <div style={divStyle}>
                            <Panel header={"Search For"} style={headerStyle}>
                                <FormControl
                                    style={inputStyle}
                                    value={this.state.EditedQuickSearchText}
                                    type="string"
                                    placeholder="Enter quick search text"
                                    onChange={(e: React.FormEvent) => this.handleFileNameChange(e)}
                                    onKeyDown={(x) => this.onKeyDownQuickSearch(x)} />
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Run Quick Search</Tooltip>}>
                                    <Button bsStyle='primary' onClick={() => this.onSetQuickSearch()}>Search</Button>
                                </OverlayTrigger>
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear Quick Search</Tooltip>}>
                                    <Button onClick={() => this.onClearQuickSearch()}>Clear</Button>
                                </OverlayTrigger>

                            </Panel>
                        </div>

                        <div style={divStyle}>
                            <Accordion style={accordionStyle}>
                                <Panel header="Quick Search Options" style={accordionStyle} eventKey="1">


                                    <ControlLabel>Operator for Text Columns:</ControlLabel>
                                    <FormControl componentClass="select" placeholder="select" value={this.props.SearchStringOperator.toString()} onChange={(x) => this.onStringOperatorChange(x)} >
                                        <option value="select" key="select">Select an operator</option>
                                        {optionColours}
                                    </FormControl>
                                </Panel>
                            </Accordion>
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
        SearchStringOperator: state.QuickSearch.SearchStringOperator
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetQuickSearchText: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(quickSearchText)),
        onSetStringOperator: (searchStringOperator: SearchStringOperator) => dispatch(QuickSearchRedux.QuickSearchSetStringOperator(searchStringOperator)),
    };
}

export let QuickSearchAction = connect(mapStateToProps, mapDispatchToProps)(QuickSearchActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '10px'
};

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bolder',
    fontSize: '16px'
};

var inputStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'normal',

};

var accordionStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'normal',

};