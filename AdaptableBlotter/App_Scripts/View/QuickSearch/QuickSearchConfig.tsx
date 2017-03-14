/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Radio, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { LeafExpressionOperator, QuickSearchDisplayType, PopoverType } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithInfo } from '../Components/Panels/PanelWithInfo';
import { ColorPicker } from '../ColorPicker';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { StringExtensions } from '../../Core/Extensions';
import { AdaptablePopover } from '../AdaptablePopover';


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
        let infoBody: any[] = ["Run a simple text search across all visible cells in the Blotter.\n\n" +
            "Options to set how quick search works - all of which are persisted.\n\n" +
            "For a more powerful, multi-column, saveable search use Advanced Search."]


        let stringOperators: LeafExpressionOperator[] = [LeafExpressionOperator.Contains, LeafExpressionOperator.StartsWith];

        let optionOperators = EnumExtensions.getNamesAndValues(LeafExpressionOperator).filter
            (nv => stringOperators.find(s => s == nv.value) != null).map((stringOperatorNameAndValue: any) => {
                return <option key={stringOperatorNameAndValue.value} value={stringOperatorNameAndValue.value}>{ExpressionHelper.OperatorToFriendlyString(stringOperatorNameAndValue.value)}</option>
            })

        let quickSearchDisplayTypes = EnumExtensions.getNamesAndValues(QuickSearchDisplayType).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{this.getTextForQuickSearchDisplayType(enumNameAndValue.value)}</option>
        })



        return (
            <span >
                <PanelWithImage header="Quick Search" bsStyle="primary" glyphicon="eye-open" infoBody={infoBody}>
                    <AdaptableBlotterForm inline onSubmit={() => this.onSetQuickSearch()}>
                        <Panel header={"Search For"} bsStyle="info" Click >
                            <FormControl
                                value={this.state.EditedQuickSearchText}
                                type="string"
                                placeholder="Quick Search Text"
                                onChange={(e: React.FormEvent) => this.handleQuickSearchTextChange(e)} />
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

                    </AdaptableBlotterForm>

                    <AdaptableBlotterForm horizontal>
                        <Panel header="Quick Search Options" eventKey="1" bsStyle="info"  >

                            <FormGroup controlId="formInlineSearchOperator">
                                <Col xs={3}>
                                    <ControlLabel>Operator:</ControlLabel>
                                </Col>
                                <Col xs={8}>
                                    <AdaptableBlotterForm inline >
                                        <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchOperator.toString()} onChange={(x) => this.onStringOperatorChange(x)} >
                                            {optionOperators}
                                        </FormControl>
                                        {' '}<AdaptablePopover headerText={"Quick Search: Operator"}
                                            bodyText={[<b>Starts With:</b>, " Returns cells whose contents begin with the search text",<br/>,<br/>,<b>Contains:</b>, " Returns cells whose contents contain the search text anywhere."]} popoverType={PopoverType.Info} />
                                    </AdaptableBlotterForm  >
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formInlineSearchDisplay">
                                <Col xs={3}>
                                    <ControlLabel>Behaviour:</ControlLabel>
                                </Col>
                                <Col xs={9}>
                                    <AdaptableBlotterForm inline >
                                        <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchDisplayType.toString()} onChange={(x) => this.onDisplayTypeChange(x)} >
                                            {quickSearchDisplayTypes}
                                        </FormControl>
                                        {' '}<AdaptablePopover headerText={"Quick Search: Behaviour"}
                                            bodyText={[<b>Colour Cells:</b>, " Changes back colour of cells matching search text", <br />, <br />, <b>Show Rows:</b>, " Only shows rows containing cells matching search text", <br />, <br />, <b>Colour Cells and Show Rows:</b>, " Only shows rows containing cells (which are also coloured) matching search text"]}
                                            popoverType={PopoverType.Info} />
                                    </AdaptableBlotterForm  >
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
                    </AdaptableBlotterForm>
                </PanelWithImage>
            </span>
        );
    }

    private getTextForQuickSearchDisplayType(quickSearchDisplayType: QuickSearchDisplayType): string {
        switch (quickSearchDisplayType) {
            case QuickSearchDisplayType.ColourCell:
                return "Colour Cells"
            case QuickSearchDisplayType.ShowRow:
                return "Show Rows"
            case QuickSearchDisplayType.ShowRowAndColourCell:
                return "Colour Cells & Show Rows"
        }
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
