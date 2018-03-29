import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { FormControl, ControlLabel, Panel, FormGroup, Col, Checkbox } from 'react-bootstrap';
import { LeafExpressionOperator, QuickSearchDisplayType, PopoverType } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';
import { IStyle } from '../../Core/Interface/IStyle';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";

interface QuickSearchPopupProps extends StrategyViewPopupProps<QuickSearchPopupComponent> {
    QuickSearchBackColor: string;
    QuickSearchForeColor: string;
    QuickSearchText: string;
    QuickSearchOperator: LeafExpressionOperator;
    QuickSearchDisplayType: QuickSearchDisplayType;
    QuickSearchStyle: IStyle,
   
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction,
    onSetSearchOperator: (leafExpressionOperator: LeafExpressionOperator) => QuickSearchRedux.QuickSearchSetSearchOperatorAction
    onSetSearchDisplayType: (quickSearchDisplayType: QuickSearchDisplayType) => QuickSearchRedux.QuickSearchSetSearchDisplayAction
    onSetStyle: (style: IStyle) => QuickSearchRedux.QuickSearchSetStyleAction
}

interface QuickSearchPopupState {
    EditedQuickSearchText: string,
    EditedStyle: IStyle
}

class QuickSearchPopupComponent extends React.Component<QuickSearchPopupProps, QuickSearchPopupState> {

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
        this.props.onSetSearchOperator(e.value as LeafExpressionOperator);
    }

    onDisplayTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchDisplayType(e.value as QuickSearchDisplayType);
    }

    private onUseBackColorCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.BackColor = (e.checked) ? this.props.QuickSearchBackColor : null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onUseForeColorCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.ForeColor = (e.checked) ? this.props.QuickSearchForeColor : null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onBackColorSelectChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.BackColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onForeColorSelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.ForeColor = e.value;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    render() {
        let infoBody: any[] = ["Run a simple text search across all visible cells in the Blotter.", <br />, <br />, "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", <br />, <br />, "For a more powerful, multi-column, saveable search with a wide range of options, use ", <i>Advanced Search</i>, "."]

        let stringOperators: LeafExpressionOperator[] = [LeafExpressionOperator.Contains, LeafExpressionOperator.StartsWith];

        let optionOperators = EnumExtensions.getNames(LeafExpressionOperator).filter
            (name => stringOperators.find(s => s == name) != null).map((stringOperatorName) => {
                return <option key={stringOperatorName} value={stringOperatorName}>{ExpressionHelper.OperatorToShortFriendlyString(stringOperatorName as LeafExpressionOperator)}</option>
            })

        let quickSearchDisplayTypes = EnumExtensions.getNames(QuickSearchDisplayType).map((enumName) => {
            return <option key={enumName} value={enumName}>{this.getTextForQuickSearchDisplayType(enumName as QuickSearchDisplayType)}</option>
        })

        return <div className="adaptable_blotter_style_popup_quicksearch">
            <PanelWithImage header={StrategyNames.QuickSearchStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.QuickSearchGlyph} infoBody={infoBody}>
                <AdaptableBlotterForm inline>
                    <Panel header={"Search For"} bsStyle="info" >
                        <AdaptableBlotterFormControlTextClear
                        bsSize={"lg"}
                            type="text"
                            placeholder="Quick Search Text"
                            value={this.state.EditedQuickSearchText}
                            OnTextChange={(x) => this.handleQuickSearchTextChange(x)} />
                    </Panel>
                </AdaptableBlotterForm>

                <AdaptableBlotterForm horizontal>
                    <Panel header="Quick Search Options" eventKey="1" bsStyle="info"  >

                        <FormGroup controlId="formInlineSearchOperator">
                            <Col xs={2}>
                                <ControlLabel>Operator:</ControlLabel>
                            </Col>
                            <Col xs={5}>
                                <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchOperator.toString()} onChange={(x) => this.onStringOperatorChange(x)} >
                                    {optionOperators}
                                </FormControl>
                            </Col>
                            <Col xs={1}>
                                <AdaptablePopover headerText={"Quick Search: Operator"}
                                    bodyText={[<b>Starts With:</b>, " Returns cells whose contents begin with the search text", <br />, <br />, <b>Contains:</b>, " Returns cells whose contents contain the search text anywhere."]} popoverType={PopoverType.Info} />

                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formInlineSearchDisplay">
                            <Col xs={2}>
                                <ControlLabel>Behaviour:</ControlLabel>
                            </Col>
                            <Col xs={5 }>
                                <FormControl componentClass="select" placeholder="select" value={this.props.QuickSearchDisplayType.toString()} onChange={(x) => this.onDisplayTypeChange(x)} >
                                    {quickSearchDisplayTypes}
                                </FormControl>
                            </Col>
                            <Col xs={1}>
                                <AdaptablePopover headerText={"Quick Search: Behaviour"}
                                    bodyText={[<b>Highlight Cells Only:</b>, " Changes back colour of cells matching search text", <br />, <br />, <b>Show Matching Rows Only:</b>, " Only shows rows containing cells matching search text", <br />, <br />, <b>Highlight Cells and Show Matching Rows:</b>, " Only shows rows containing cells (which are also coloured) matching search text"]}
                                    popoverType={PopoverType.Info} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="colorBackStyle">
                            <Col xs={2} >
                                <ControlLabel>Set Back Colour:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox value="existing" checked={this.props.QuickSearchStyle.BackColor ? true : false} onChange={(e) => this.onUseBackColorCheckChange(e)}></Checkbox>
                            </Col>
                            <Col xs={5}>
                                {this.props.QuickSearchStyle.BackColor != null &&
                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.props.QuickSearchStyle.BackColor} onChange={(x) => this.onBackColorSelectChange(x)} />
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="colorForeStyle">
                            <Col xs={2} >
                                <ControlLabel>Set Fore Colour:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox value="existing" checked={this.props.QuickSearchStyle.ForeColor ? true : false} onChange={(e) => this.onUseForeColorCheckChange(e)}></Checkbox>
                            </Col>
                            <Col xs={5}>
                                {this.props.QuickSearchStyle.ForeColor != null &&
                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.props.QuickSearchStyle.ForeColor} onChange={(x) => this.onForeColorSelectChange(x)} />
                                }
                            </Col>
                        </FormGroup>

                    </Panel>
                </AdaptableBlotterForm>
            </PanelWithImage>
        </div>

    }

    private getTextForQuickSearchDisplayType(quickSearchDisplayType: QuickSearchDisplayType): string {
        switch (quickSearchDisplayType) {
            case QuickSearchDisplayType.HighlightCell:
                return "Highlight Cells Only"
            case QuickSearchDisplayType.ShowRow:
                return "Show Matching Rows Only"
            case QuickSearchDisplayType.ShowRowAndHighlightCell:
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
        QuickSearchBackColor: state.QuickSearch.QuickSearchBackColor,
        QuickSearchForeColor: state.QuickSearch.QuickSearchForeColor,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText)),
        onSetSearchOperator: (searchOperator: LeafExpressionOperator) => dispatch(QuickSearchRedux.QuickSearchSetOperator(searchOperator)),
        onSetSearchDisplayType: (searchDisplayType: QuickSearchDisplayType) => dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType)),
        onSetStyle: (style: IStyle) => dispatch(QuickSearchRedux.QuickSearchSetStyle(style)),
    };
}

export let QuickSearchPopup = connect(mapStateToProps, mapDispatchToProps)(QuickSearchPopupComponent);
