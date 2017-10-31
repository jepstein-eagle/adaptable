import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import * as _ from 'lodash'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, InputGroup, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonErase } from '../Components/Buttons/ButtonErase';
import * as StrategyIds from '../../Core/StrategyIds'

interface QuickSearchToolbarControlComponentProps extends IStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchRunAction;
    onClearQuickSearch: () => QuickSearchRedux.QuickSearchClearAction;
    onShowQuickSearchConfig: () => PopupRedux.PopupShowAction;
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    QuickSearchText: string
    QuickSearchDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean
}

interface QuickSearchToolbarControlComponentState {
    EditedQuickSearchText: string
}

class QuickSearchToolbarControlComponent extends React.Component<QuickSearchToolbarControlComponentProps, QuickSearchToolbarControlComponentState> {
    constructor(props: QuickSearchToolbarControlComponentProps) {
        super(props);
        this.state = { EditedQuickSearchText: this.props.QuickSearchText }
    }
    componentWillReceiveProps(nextProps: QuickSearchToolbarControlComponentProps, nextContext: any) {
        this.setState({
            EditedQuickSearchText: nextProps.QuickSearchText
        });
    }
    debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 250);

    render() {

        let tooltipText = this.props.QuickSearchDashboardControl.IsCollapsed ? "Expand" : "Collapse"
        let collapsedContent = <ControlLabel> {StringExtensions.IsNullOrEmpty(this.props.QuickSearchText) ? "None" : this.props.QuickSearchText}</ControlLabel>

        let toolbarHeaderButton = <span>

            <Form inline>
                <FormGroup controlId="formInlineName">
                    <Button bsStyle="primary" bsSize="small" onClick={() => this.expandCollapseClicked()}>
                        {' '}<Glyphicon glyph="eye-open" />{' '}Quick Search{' '}<Glyphicon glyph={this.props.QuickSearchDashboardControl.IsCollapsed ? "chevron-down" : "chevron-up"} />
                    </Button>
                    {' '}
                    <FormControl
                        style={{ width: "100px" }}
                        bsSize="small"
                        type="text"                    
                        placeholder="Search Text"
                        value={this.state.EditedQuickSearchText}
                        onChange={(x) => this.onUpdateQuickSearchText(x)} />
                </FormGroup>
                    <ButtonErase onClick={() => this.onClearQuickSearch()}
                    size="small"
                    overrideTooltip="Clear Quick Search"
                    overrideDisableButton={StringExtensions.IsEmpty(this.props.QuickSearchText)}
                    DisplayMode="Text" />
            </Form>


        </span>

        let expandedContent = <span>
            <div style={marginButtonStyle} className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <ButtonClear onClick={() => this.onClearQuickSearch()}
                    size="small"
                    overrideTooltip="Clear Quick Search"
                    overrideDisableButton={StringExtensions.IsEmpty(this.props.QuickSearchText)}
                    DisplayMode="Glyph+Text" />
                {' '}
                <ButtonEdit onClick={() => this.props.onShowQuickSearchConfig()}
                    size="small"
                    overrideTooltip="Edit Quick Search"
                    DisplayMode="Glyph+Text" />
            </div>
        </span>

        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm >
                {this.props.QuickSearchDashboardControl.IsCollapsed ?
                    <span>
                        {toolbarHeaderButton}
                    </span>
                    :
                    <span>
                        {toolbarHeaderButton}
                        {' '}  {' '}
                        {expandedContent}
                    </span>
                }
            </AdaptableBlotterForm>
        </Panel>

    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.QuickSearchDashboardControl.Strategy, !this.props.QuickSearchDashboardControl.IsCollapsed);
    }

    onUpdateQuickSearchText(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ EditedQuickSearchText: e.value })
        this.debouncedRunQuickSearch();
    }

    onClearQuickSearch() {
        this.props.onClearQuickSearch();
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        QuickSearchDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.QuickSearchStrategyId),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchRun(newQuickSearchText)),
        onClearQuickSearch: () => dispatch(QuickSearchRedux.QuickSearchClear()),
        onShowQuickSearchConfig: () => dispatch(PopupRedux.PopupShow("QuickSearchConfig")),
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed))
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);


var marginButtonStyle = {
    marginTop: '4px'
};