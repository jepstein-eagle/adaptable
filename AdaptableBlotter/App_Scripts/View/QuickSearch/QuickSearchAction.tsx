/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Accordion, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { LeafExpressionOperator } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'


interface QuickSearchActionProps extends React.ClassAttributes<QuickSearchActionComponent> {
    QuickSearchText: string;
    QuickSearchOperator: LeafExpressionOperator;
    AdaptableBlotter: IAdaptableBlotter;
    onSetQuickSearchText: (quickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction,
    onSetSearchOperator: (leafExpressionOperator: LeafExpressionOperator) => QuickSearchRedux.QuickSearchSetSearchOperatorAction
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

    handleQuickSearchTextChange(event: React.FormEvent) {
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
        this.props.onSetSearchOperator(Number.parseInt(e.value));
    }

    render() {
        var blotter = this.props.AdaptableBlotter;

        // for the moment we can only search on string columns because of the way operators work with expressiosn
        // we need either to make the expressions better so you can do a contains across numeric columns, or use jquery to do the search
        // either way I think we can only use these operators becasue the others dont make sense across all columns...
        let stringOperators: LeafExpressionOperator[] =
            [LeafExpressionOperator.Contains, LeafExpressionOperator.StartsWith, LeafExpressionOperator.EndsWith];

        let optionOperators = EnumExtensions.getNamesAndValues(LeafExpressionOperator).filter
            (nv => stringOperators.find(s => s == nv.value) != null).map((stringOperatorNameAndValue: any) => {
                return <option key={stringOperatorNameAndValue.value} value={stringOperatorNameAndValue.value}>{ExpressionHelper.OperatorToFriendlyString(stringOperatorNameAndValue.value)}</option>
            })

        return (
            <div >
                <Panel header="Quick Search" bsStyle="primary">


                    <Form inline>
                        <div >
                            <Panel header={"Search For"} bsStyle="info">
                                <FormControl
                                    value={this.state.EditedQuickSearchText}
                                    type="string"
                                    placeholder="Enter quick search text"
                                    onChange={(e: React.FormEvent) => this.handleQuickSearchTextChange(e)}
                                    onKeyDown={(x) => this.onKeyDownQuickSearch(x)} />
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipRunSearch">Run Quick Search</Tooltip>}>
                                    <Button bsStyle='info' onClick={() => this.onSetQuickSearch()}>Search</Button>
                                </OverlayTrigger>
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipClearSearch">Clear Quick Search</Tooltip>}>
                                    <Button onClick={() => this.onClearQuickSearch()}>Clear</Button>
                                </OverlayTrigger>

                            </Panel>

                        </div>
                    </Form>

                    <Form horizontal>
                        <div >
                            <Panel header="Quick Search Options" eventKey="1" bsStyle="info">

                                <FormGroup controlId="formInlineSearchOperator">
                                    <Col xs={4}>
                                        <ControlLabel >Search Operator:</ControlLabel>
                                    </Col>
                                    <Col xs={8}>
                                        <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchOperator.toString()} onChange={(x) => this.onStringOperatorChange(x)} >
                                            <option value="select" key="select">Select operator</option>
                                            {optionOperators}
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                            </Panel>
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
        QuickSearchOperator: state.QuickSearch.QuickSearchOperator
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetQuickSearchText: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(quickSearchText)),
        onSetSearchOperator: (searchOperator: LeafExpressionOperator) => dispatch(QuickSearchRedux.QuickSearchSetSearchOperator(searchOperator)),
    };
}

export let QuickSearchAction = connect(mapStateToProps, mapDispatchToProps)(QuickSearchActionComponent);
