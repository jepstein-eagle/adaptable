import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { FormControl, ControlLabel, Panel, FormGroup, Col, Checkbox } from 'react-bootstrap';
import { LeafExpressionOperator, DisplayAction, MessageType } from '../../Utilities/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ColorPicker } from '../ColorPicker';
import { AdaptablePopover } from '../AdaptablePopover';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { IStyle } from "../../Utilities/Interface/IStyle";
import { QUICK_SEARCH_DEFAULT_BACK_COLOR, QUICK_SEARCH_DEFAULT_FORE_COLOR } from "../../Utilities/Constants/GeneralConstants";

interface QuickSearchPopupProps extends StrategyViewPopupProps<QuickSearchPopupComponent> {
    QuickSearchText: string;
    DisplayAction: DisplayAction;
    QuickSearchStyle: IStyle,

    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction,
    onSetSearchDisplayType: (DisplayAction: DisplayAction) => QuickSearchRedux.QuickSearchSetDisplayAction
    onSetStyle: (style: IStyle) => QuickSearchRedux.QuickSearchSetStyleAction
}

interface QuickSearchPopupState {
    EditedQuickSearchText: string,
    EditedStyle: IStyle
}

class QuickSearchPopupComponent extends React.Component<QuickSearchPopupProps, QuickSearchPopupState> {

    constructor(props: QuickSearchPopupProps) {
        super(props);
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

    onDisplayTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onSetSearchDisplayType(e.value as DisplayAction);
    }

    private onUseBackColorCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.BackColor = (e.checked) ?
            (this.props.QuickSearchStyle.BackColor) ? this.props.QuickSearchStyle.BackColor : QUICK_SEARCH_DEFAULT_BACK_COLOR
            :
            null;
        this.setState({ EditedStyle: style });
        this.props.onSetStyle(style);
    }

    private onUseForeColorCheckChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let style: IStyle = this.state.EditedStyle;
        style.ForeColor = (e.checked) ?
            (this.props.QuickSearchStyle.ForeColor) ? this.props.QuickSearchStyle.ForeColor : QUICK_SEARCH_DEFAULT_FORE_COLOR
            :
            null;
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
        let cssClassName: string = this.props.cssClassName + "__quicksearch";

        let infoBody: any[] = ["Run a simple text search across all visible cells in the Blotter.", <br />, <br />, "Use Quick Search Options to set search operator, behaviour and back colour (all automatically saved).", <br />, <br />, "For a more powerful, multi-column, saveable search with a wide range of options, use ", <i>Advanced Search</i>, "."]

        let stringOperators: LeafExpressionOperator[] = [LeafExpressionOperator.Contains, LeafExpressionOperator.StartsWith];

        let optionOperators = EnumExtensions.getNames(LeafExpressionOperator).filter
            (name => stringOperators.find(s => s == name) != null).map((stringOperatorName) => {
                return <option key={stringOperatorName} value={stringOperatorName}>{ExpressionHelper.OperatorToShortFriendlyString(stringOperatorName as LeafExpressionOperator)}</option>
            })

        let DisplayActions = EnumExtensions.getNames(DisplayAction).map((enumName) => {
            return <option key={enumName} value={enumName}>{this.getTextForDisplayAction(enumName as DisplayAction)}</option>
        })

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.QuickSearchStrategyName} bsStyle="primary" glyphicon={StrategyConstants.QuickSearchGlyph} infoBody={infoBody}>
                <AdaptableBlotterForm inline>
                    <Panel header={"Search For"} bsStyle="info" >
                        <AdaptableBlotterFormControlTextClear
                            cssClassName={cssClassName}
                            type="text"
                            placeholder="Quick Search Text"
                            value={this.state.EditedQuickSearchText}
                            OnTextChange={(x) => this.handleQuickSearchTextChange(x)} />
                    </Panel>
                </AdaptableBlotterForm>

                <AdaptableBlotterForm horizontal>
                    <Panel header="Quick Search Options" eventKey="1" bsStyle="info"  >

                        <FormGroup controlId="formInlineSearchDisplay">
                            <Col xs={3}>
                                <ControlLabel>Behaviour:</ControlLabel>
                            </Col>
                            <Col xs={7}>
                                <FormControl componentClass="select" placeholder="select" value={this.props.DisplayAction.toString()} onChange={(x) => this.onDisplayTypeChange(x)} >
                                    {DisplayActions}
                                </FormControl>
                            </Col>
                            <Col xs={1}>
                                <AdaptablePopover cssClassName={cssClassName} headerText={"Quick Search: Behaviour"}
                                    bodyText={[<b>Highlight Cells Only:</b>, " Changes back colour of cells matching search text", <br />, <br />, <b>Show Matching Rows Only:</b>, " Only shows rows containing cells matching search text", <br />, <br />, <b>Highlight Cells and Show Matching Rows:</b>, " Only shows rows containing cells (which are also coloured) matching search text"]}
                                    />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="colorBackStyle">
                            <Col xs={3} >
                                <ControlLabel>Set Back Colour:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox value="existing" checked={this.props.QuickSearchStyle.BackColor ? true : false} onChange={(e) => this.onUseBackColorCheckChange(e)}></Checkbox>
                            </Col>
                            <Col xs={3}>
                                {this.props.QuickSearchStyle.BackColor != null &&
                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.props.QuickSearchStyle.BackColor} onChange={(x) => this.onBackColorSelectChange(x)} />
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="colorForeStyle">
                            <Col xs={3} >
                                <ControlLabel>Set Fore Colour:</ControlLabel>
                            </Col>
                            <Col xs={1}>
                                <Checkbox value="existing" checked={this.props.QuickSearchStyle.ForeColor ? true : false} onChange={(e) => this.onUseForeColorCheckChange(e)}></Checkbox>
                            </Col>
                            <Col xs={3}>
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

    private getTextForDisplayAction(displayAction: DisplayAction): string {
        switch (displayAction) {
            case DisplayAction.HighlightCell:
                return "Highlight Cells Only"
            case DisplayAction.ShowRow:
                return "Show Matching Rows Only"
            case DisplayAction.ShowRowAndHighlightCell:
                return "Highlight Cells & Show Matching Rows"
        }
    }

}


function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        DisplayAction: state.QuickSearch.DisplayAction,
        QuickSearchStyle: state.QuickSearch.Style,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (quickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchApply(quickSearchText)),
        onSetSearchDisplayType: (searchDisplayType: DisplayAction) => dispatch(QuickSearchRedux.QuickSearchSetDisplay(searchDisplayType)),
        onSetStyle: (style: IStyle) => dispatch(QuickSearchRedux.QuickSearchSetStyle(style)),
    };
}

export let QuickSearchPopup = connect(mapStateToProps, mapDispatchToProps)(QuickSearchPopupComponent);
