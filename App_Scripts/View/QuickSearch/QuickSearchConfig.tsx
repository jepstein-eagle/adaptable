import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as _ from 'lodash'
import { Provider, connect } from 'react-redux';
import { Radio, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox, HelpBlock } from 'react-bootstrap';
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
import { IStyle } from '../../Core/Interface/IConditionalStyleStrategy';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';

interface QuickSearchConfigProps extends IStrategyViewPopupProps<QuickSearchConfigComponent> {
    QuickSearchDefaultBackColour: string;
    QuickSearchDefaultForeColour: string;
    QuickSearchText: string;
    QuickSearchOperator: LeafExpressionOperator;
    QuickSearchDisplayType: QuickSearchDisplayType;
    QuickSearchStyle: IStyle,
    PredefinedColorChoices: string[],
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchRunAction,
    onSetSearchOperator: (leafExpressionOperator: LeafExpressionOperator) => QuickSearchRedux.QuickSearchSetSearchOperatorAction
    onSetSearchDisplayType: (quickSearchDisplayType: QuickSearchDisplayType) => QuickSearchRedux.QuickSearchSetSearchDisplayAction
    onSetStyle: (style: IStyle) => QuickSearchRedux.QuickSearchSetStyleAction
}

interface QuickSearchConfigState {
    EditedQuickSearchText: string,
    EditedStyle: IStyle
}

class QuickSearchConfigComponent extends React.Component<QuickSearchConfigProps, QuickSearchConfigState> {

    constructor() {
        super();
        this.state = { EditedQuickSearchText: "", EditedStyle: null }
    }

    debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 250);    

    public componentDidMount() {
        this.setState({ EditedQuickSearchText: this.props.QuickSearchText, EditedStyle: this.props.QuickSearchStyle });
    }

    handleQuickSearchTextChange(text: string) {
        this.setState({ EditedQuickSearchText: text });
        this.debouncedRunQuickSearch();
    }

    onStringOperatorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchOperator(Number.parseInt(e.value));
    }

    onDisplayTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchDisplayType(Number.parseInt(e.value));
    }

    private onUseBackColourCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.BackColor = (e.checked) ? this.props.QuickSearchDefaultBackColour : null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onUseForeColourCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.ForeColor = (e.checked) ? this.props.QuickSearchDefaultForeColour : null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onBackColourSelectChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.BackColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onForeColourSelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.ForeColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    render() {
        let infoBody: any[] = ["Run a simple text search across all visible cells in the Blotter.", <br />, <br />, "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", <br />, <br />, "For a more powerful, multi-column, saveable search with a wide range of options, use ", <i>Advanced Search</i>, "."]

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
                    <AdaptableBlotterForm inline>
                        <Panel header={"Search For"} bsStyle="info" >
                            <AdaptableBlotterFormControlTextClear
                                type="text"
                                placeholder="Quick Search Text"
                                value={this.state.EditedQuickSearchText}
                                OnTextChange={(x) => this.handleQuickSearchTextChange(x)} />
                        </Panel>
                    </AdaptableBlotterForm>

                    <AdaptableBlotterForm horizontal>
                        <Panel header="Quick Search Options" eventKey="1" bsStyle="info"  >

                            <FormGroup controlId="formInlineSearchOperator">
                                <Col xs={4}>
                                    <ControlLabel>Operator:</ControlLabel>
                                </Col>
                                <Col xs={8}>
                                    <AdaptableBlotterForm inline >
                                        <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchOperator.toString()} onChange={(x) => this.onStringOperatorChange(x)} >
                                            {optionOperators}
                                        </FormControl>
                                        {' '}<AdaptablePopover headerText={"Quick Search: Operator"}
                                            bodyText={[<b>Starts With:</b>, " Returns cells whose contents begin with the search text", <br />, <br />, <b>Contains:</b>, " Returns cells whose contents contain the search text anywhere."]} popoverType={PopoverType.Info} />
                                    </AdaptableBlotterForm  >
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formInlineSearchDisplay">
                                <Col xs={4}>
                                    <ControlLabel>Behaviour:</ControlLabel>
                                </Col>
                                <Col xs={8}>
                                    <AdaptableBlotterForm inline >
                                        <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchDisplayType.toString()} onChange={(x) => this.onDisplayTypeChange(x)} >
                                            {quickSearchDisplayTypes}
                                        </FormControl>
                                        {' '}<AdaptablePopover headerText={"Quick Search: Behaviour"}
                                            bodyText={[<b>Highlight Cells Only:</b>, " Changes back colour of cells matching search text", <br />, <br />, <b>Show Matching Rows Only:</b>, " Only shows rows containing cells matching search text", <br />, <br />, <b>Highlight Cells and Show Matching Rows:</b>, " Only shows rows containing cells (which are also coloured) matching search text"]}
                                            popoverType={PopoverType.Info} />
                                    </AdaptableBlotterForm  >
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="colorBackStyle">
                                <Col xs={4} >
                                    <ControlLabel>Set Back Colour:</ControlLabel>
                                </Col>
                                <Col xs={1}>
                                    <Checkbox value="existing" checked={this.props.QuickSearchStyle.BackColor ? true : false} onChange={(e) => this.onUseBackColourCheckChange(e)}></Checkbox>
                                </Col>
                                <Col xs={7}>
                                    {this.props.QuickSearchStyle.BackColor != null &&
                                        <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} value={this.props.QuickSearchStyle.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                                    }
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="colorForeStyle">
                                <Col xs={4} >
                                    <ControlLabel>Set Fore Colour:</ControlLabel>
                                </Col>
                                <Col xs={1}>
                                    <Checkbox value="existing" checked={this.props.QuickSearchStyle.ForeColor ? true : false} onChange={(e) => this.onUseForeColourCheckChange(e)}></Checkbox>
                                </Col>
                                <Col xs={7}>
                                    {this.props.QuickSearchStyle.ForeColor != null &&
                                        <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} value={this.props.QuickSearchStyle.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                                    }
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
                return "Highlight Cells Only"
            case QuickSearchDisplayType.ShowRow:
                return "Show Matching Rows Only"
            case QuickSearchDisplayType.ShowRowAndColourCell:
                return "Highlight Cells & Show Matching Rows"
        }
    }

}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        QuickSearchOperator: state.QuickSearch.QuickSearchOperator,
        QuickSearchDisplayType: state.QuickSearch.QuickSearchDisplayType,
        QuickSearchStyle: state.QuickSearch.QuickSearchStyle,
        QuickSearchDefaultBackColour: state.QuickSearch.QuickSearchDefaultBackColour,
        QuickSearchDefaultForeColour: state.QuickSearch.QuickSearchDefaultForeColour,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchRun(quickSearchText)),
        onSetSearchOperator: (searchOperator: LeafExpressionOperator) => dispatch(QuickSearchRedux.QuickSearchSetOperator(searchOperator)),
        onSetSearchDisplayType: (searchDisplayType: QuickSearchDisplayType) => dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType)),
        onSetStyle: (style: IStyle) => dispatch(QuickSearchRedux.QuickSearchSetStyle(style)),
    };
}

export let QuickSearchConfig = connect(mapStateToProps, mapDispatchToProps)(QuickSearchConfigComponent);
