import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
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



class QuickSearchToolbarControlComponent extends React.Component<QuickSearchToolbarControlComponentProps, {}> {

    render(): any {

        let tooltipText = this.props.QuickSearchDashboardControl.IsCollapsed ? "Expand" : "Collapse"
        let collapsedContent = <ControlLabel> {StringExtensions.IsNullOrEmpty(this.props.QuickSearchText) ? "None" : this.props.QuickSearchText}</ControlLabel>

        let toolbarHeaderButton = <OverlayTrigger overlay={<Tooltip id="toolexpand">{tooltipText}</Tooltip>}>
            <Button bsStyle="primary" onClick={() => this.expandCollapseClicked()}>
                {' '}<Glyphicon glyph="eye-open" />{' '}Quick Search{' '}<Glyphicon glyph={this.props.QuickSearchDashboardControl.IsCollapsed ? "chevron-down" : "chevron-up"} />
            </Button>
        </OverlayTrigger>


        let expandedContent = <AdaptableBlotterForm inline>
            <div style={marginButtonStyle} className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <FormControl
                    style={{ width: "120px" }}
                    type="text"
                    placeholder="Search Text"
                    value={this.props.QuickSearchText}
                    onChange={(x) => this.onUpdateQuickSearchText(x)}
                />
                {' '}
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
        </AdaptableBlotterForm>
        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm >
                {this.props.QuickSearchDashboardControl.IsCollapsed ?
                    <span>
                        {toolbarHeaderButton}
                        {' '}
                        {collapsedContent}
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
        this.props.onRunQuickSearch(e.value);
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