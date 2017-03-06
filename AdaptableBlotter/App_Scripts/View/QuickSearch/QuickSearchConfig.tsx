/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Radio, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { LeafExpressionOperator, QuickSearchDisplayType } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../PanelWithImage';
import { ColorPicker } from '../ColorPicker';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ButtonClear } from '../ButtonClear';
import { StringExtensions } from '../../Core/Extensions';

interface QuickSearchConfigProps extends IStrategyViewPopupProps<QuickSearchConfigComponent> {
    QuickSearchText: string;
    QuickSearchOperator: LeafExpressionOperator;
    QuickSearchDisplayType: QuickSearchDisplayType;
    QuickSearchBackColor: string,
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchRunAction,
    onClearQuickSearch: () => QuickSearchRedux.QuickSearchClearAction,
    onSetSearchOperator: (leafExpressionOperator: LeafExpressionOperator) => QuickSearchRedux.QuickSearchSetSearchOperatorAction
    onSetSearchDisplayType: (quickSearchDisplayType: QuickSearchDisplayType) => QuickSearchRedux.QuickSearchSetSearchDisplayAction
    onSetSearchBackColor: (backColor: string) => QuickSearchRedux.QuickSearchSetBackColorAction
}

interface QuickSearchConfigState {
    EditedQuickSearchText: string
}

class QuickSearchConfigComponent extends React.Component<QuickSearchConfigProps, QuickSearchConfigState> {

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
        this.props.onRunQuickSearch(this.state.EditedQuickSearchText);
    }

    onClearQuickSearch() {
        this.setState({ EditedQuickSearchText: "" });
        this.props.onClearQuickSearch();
    }

    onStringOperatorChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchOperator(Number.parseInt(e.value));
    }

    onDisplayTypeChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchDisplayType(Number.parseInt(e.value));
    }

    onBackColorChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchBackColor(e.value);
    }

    render() {
        let stringOperators: LeafExpressionOperator[] = [LeafExpressionOperator.Contains, LeafExpressionOperator.StartsWith];

        let optionOperators = EnumExtensions.getNamesAndValues(LeafExpressionOperator).filter
            (nv => stringOperators.find(s => s == nv.value) != null).map((stringOperatorNameAndValue: any) => {
                return <option key={stringOperatorNameAndValue.value} value={stringOperatorNameAndValue.value}>{ExpressionHelper.OperatorToFriendlyString(stringOperatorNameAndValue.value)}</option>
            })

        return (
            <div >
                <PanelWithImage header="Quick Search" bsStyle="primary" glyphicon="eye-open">
                    <AdaptableBlotterForm inline onSubmit={()=> this.onSetQuickSearch()}>
                        <div >
                            <Panel header={"Search For"} bsStyle="info">
                                <FormControl
                                    value={this.state.EditedQuickSearchText}
                                    type="string"
                                    placeholder="Quick Search Text"
                                    onChange={(e: React.FormEvent) => this.handleQuickSearchTextChange(e)}/>
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="tooltipRunSearch">Run Quick Search</Tooltip>}>
                                    <Button bsStyle='success' onClick={() => this.onSetQuickSearch()}>Search</Button>
                                </OverlayTrigger>
                                {' '}
                                <ButtonClear onClick={() => this.onClearQuickSearch()}
                                    overrideTooltip="Clear Quick Search"
                                    overrideDisableButton={StringExtensions.IsEmpty(this.props.QuickSearchText)}
                                    DisplayMode="Glyph+Text" />
                            </Panel>

                        </div>
                    </AdaptableBlotterForm>

                    <AdaptableBlotterForm horizontal>
                        <div >
                            <Panel header="Quick Search Options" eventKey="1" bsStyle="info">

                                <FormGroup controlId="formInlineSearchOperator">
                                    <Col xs={3}>
                                        <ControlLabel>Operator:</ControlLabel>
                                    </Col>
                                    <Col xs={8}>
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

                                <FormGroup controlId="formInlineSearchBackColor">
                                    <Col xs={3}>
                                        <ControlLabel>Back Colour: </ControlLabel>
                                    </Col>
                                    <Col xs={2}>
                                        <ColorPicker value={this.props.QuickSearchBackColor} onChange={(x) => this.onBackColorChange(x)} />
                                    </Col>
                                </FormGroup>

                            </Panel>
                        </div>
                    </AdaptableBlotterForm>
                </PanelWithImage>
            </div>
        );
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        QuickSearchOperator: state.QuickSearch.QuickSearchOperator,
        QuickSearchDisplayType: state.QuickSearch.QuickSearchDisplayType,
        QuickSearchBackColor: state.QuickSearch.QuickSearchBackColor,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchRun(quickSearchText)),
        onClearQuickSearch: () => dispatch(QuickSearchRedux.QuickSearchClear()),
        onSetSearchOperator: (searchOperator: LeafExpressionOperator) => dispatch(QuickSearchRedux.QuickSearchSetOperator(searchOperator)),
        onSetSearchDisplayType: (searchDisplayType: QuickSearchDisplayType) => dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType)),
        onSetSearchBackColor: (backColor: string) => dispatch(QuickSearchRedux.QuickSearchSetBackColor(backColor)),
    };
}

export let QuickSearchConfig = connect(mapStateToProps, mapDispatchToProps)(QuickSearchConfigComponent);
