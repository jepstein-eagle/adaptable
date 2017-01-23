/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Radio, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { LeafExpressionOperator, QuickSearchDisplayType } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'


interface QuickSearchActionProps extends IStrategyViewPopupProps<QuickSearchActionComponent> {
    QuickSearchText: string;
    QuickSearchOperator: LeafExpressionOperator;
    QuickSearchDisplayType: QuickSearchDisplayType;
    onSetQuickSearchText: (quickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction,
    onSetSearchOperator: (leafExpressionOperator: LeafExpressionOperator) => QuickSearchRedux.QuickSearchSetSearchOperatorAction
    onSetSearchDisplayType: (quickSearchDisplayType: QuickSearchDisplayType) => QuickSearchRedux.QuickSearchSetSearchDisplayAction
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

    onDisplayTypeChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchDisplayType(Number.parseInt(e.value));
    }

    render() {
        var blotter = this.props.AdaptableBlotter;

        let stringOperators: LeafExpressionOperator[] = [LeafExpressionOperator.Contains, LeafExpressionOperator.StartsWith];

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
                                    <Col xs={3}>
                                        <ControlLabel>Operator:</ControlLabel>
                                    </Col>
                                    <Col xs={9}>
                                        <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchOperator.toString()} onChange={(x) => this.onStringOperatorChange(x)} >
                                            <option value="select" key="select">Select operator</option>
                                            {optionOperators}
                                        </FormControl>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formInlineSearchDisplay">
                                    <Col xs={3}>
                                        <ControlLabel>Display:</ControlLabel>
                                    </Col>
                                    <Col xs={9}>
                                        <Radio value={QuickSearchDisplayType.ColourCell.toString()} checked={this.props.QuickSearchDisplayType == QuickSearchDisplayType.ColourCell} onChange={(e) => this.onDisplayTypeChange(e)}>Colour cells that match search text </Radio>
                                        <Radio value={QuickSearchDisplayType.HideNonMatchingRow.toString()} checked={this.props.QuickSearchDisplayType == QuickSearchDisplayType.HideNonMatchingRow} onChange={(e) => this.onDisplayTypeChange(e)}>Display only rows with cells that match search text</Radio>
                                        <Radio value={QuickSearchDisplayType.HideRowAndColourCell.toString()} checked={this.props.QuickSearchDisplayType == QuickSearchDisplayType.HideRowAndColourCell} onChange={(e) => this.onDisplayTypeChange(e)}>Display matching rows AND colour cells</Radio>
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
        QuickSearchOperator: state.QuickSearch.QuickSearchOperator,
        QuickSearchDisplayType: state.QuickSearch.QuickSearchDisplayType,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSetQuickSearchText: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(quickSearchText)),
        onSetSearchOperator: (searchOperator: LeafExpressionOperator) => dispatch(QuickSearchRedux.QuickSearchSetSearchOperator(searchOperator)),
        onSetSearchDisplayType: (searchDisplayType: QuickSearchDisplayType) => dispatch(QuickSearchRedux.QuickSearchSetSearchDisplay(searchDisplayType)),
    };
}

export let QuickSearchAction = connect(mapStateToProps, mapDispatchToProps)(QuickSearchActionComponent);
