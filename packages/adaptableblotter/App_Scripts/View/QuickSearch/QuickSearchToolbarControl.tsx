import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as _ from 'lodash'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { AccessLevel, DashboardSize } from "../../Utilities/Enums";

interface QuickSearchToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
    onShowQuickSearchPopup: () => PopupRedux.PopupShowScreenAction;
    QuickSearchText: string;
 
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
        let cssClassName: string = this.props.cssClassName + "__quicksearch";

        let content = <span>

            <AdaptableBlotterFormControlTextClear
                cssClassName={cssClassName}
                style={{ width: "135px" }}
                bsSize={this.props.DashboardSize}
                type="text"
                placeholder="Search Text"
                value={this.state.EditedQuickSearchText}
                OnTextChange={(x) => this.onUpdateQuickSearchText(x)} />
            {' '}
            {/*
            // taking this out as we dont really need it come to think of it as you can use the configure above
            <span className={this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <ButtonEdit cssClassName={cssClassName} onClick={() => this.props.onShowQuickSearchPopup()}
                    size={this.props.DashboardSize}
                    overrideTooltip="Edit Quick Search"
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel} />
            </span>
             */}
        </span>
        return <PanelDashboard cssClassName={cssClassName} useDefaultPanelStyle={this.props.UseSingleColourForButtons} headerText={StrategyConstants.QuickSearchStrategyName} glyphicon={StrategyConstants.QuickSearchGlyph} onClose={() => this.props.onClose(StrategyConstants.QuickSearchStrategyId)}
            onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onUpdateQuickSearchText(searchText: string) {
        this.setState({ EditedQuickSearchText: searchText })
        this.debouncedRunQuickSearch();
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
       
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
        onShowQuickSearchPopup: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.QuickSearchStrategyId, ScreenPopups.QuickSearchPopup)),
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);