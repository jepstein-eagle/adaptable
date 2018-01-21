import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import * as _ from 'lodash'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, InputGroup, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IToolbarStrategyViewPopupProps } from '../../Core/Interface/IToolbarStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyIds from '../../Core/StrategyIds'
import * as ScreenPopups from '../../Core/ScreenPopups'
import { IUIConfirmation } from "../../Core/Interface/IStrategy";

interface QuickSearchToolbarControlComponentProps extends IToolbarStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchRunAction;
    onShowQuickSearchConfig: () => PopupRedux.PopupShowAction;
    QuickSearchText: string
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

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <AdaptableBlotterFormControlTextClear
                    style={{ width: "100px" }}
                    type="text"
                    placeholder="Search Text"
                    value={this.state.EditedQuickSearchText}
                    OnTextChange={(x) => this.onUpdateQuickSearchText(x)} />
                {' '}
                <ButtonEdit onClick={() => this.props.onShowQuickSearchConfig()}
                    overrideTooltip="Edit Quick Search"
                    DisplayMode="Glyph" />
            </div>
        </span>
        return <PanelDashboard headerText="Quick Search" glyphicon="eye-open" onClose={() => this.props.onClose(this.props.DashboardControl)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onUpdateQuickSearchText(quckSearchText: string) {
        this.setState({ EditedQuickSearchText: quckSearchText })
        this.debouncedRunQuickSearch();
    }

   
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.QuickSearchStrategyId),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchRun(newQuickSearchText)),
        onShowQuickSearchConfig: () => dispatch(PopupRedux.PopupShow(ScreenPopups.QuickSearchConfigPopup)),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: () => dispatch(PopupRedux.PopupShow(ScreenPopups.QuickSearchConfigPopup)),
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);