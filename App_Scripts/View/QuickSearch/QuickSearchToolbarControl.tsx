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
import * as StrategyIds from '../../Core/StrategyIds'

interface QuickSearchToolbarControlComponentProps extends IStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchRunAction;
    onClearQuickSearch: () => QuickSearchRedux.QuickSearchClearAction;
    onShowQuickSearchConfig: () => PopupRedux.PopupShowAction;
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

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Button bsStyle="primary">
                    {' '}<Glyphicon glyph="eye-open" />{' '}Quick Search
                        </Button>
                {' '}
                <FormControl
                    style={{ width: "100px" }}
                    type="text"
                    placeholder="Search Text"
                    value={this.state.EditedQuickSearchText}
                    onChange={(x) => this.onUpdateQuickSearchText(x)} />
                {' '}
                <ButtonClear onClick={() => this.onClearQuickSearch()}
                    overrideTooltip="Clear Quick Search"
                    overrideDisableButton={StringExtensions.IsEmpty(this.props.QuickSearchText)}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonEdit onClick={() => this.props.onShowQuickSearchConfig()}
                    overrideTooltip="Edit Quick Search"
                    DisplayMode="Glyph" />
            </div>
        </span>
        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm inline >
                {content}
            </AdaptableBlotterForm>
        </Panel>

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
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);