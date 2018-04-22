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
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { IEntitlement } from "../../Core/Interface/Interfaces";

interface QuickSearchToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
    onShowQuickSearchPopup: () => PopupRedux.PopupShowAction;
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
        let cssClassName: string = this.props.cssClassName + "__quicksearch";

        let content = <span>
            <div className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                <AdaptableBlotterFormControlTextClear
                    style={{ width: "100px" }}
                    bsSize="small"
                    type="text"
                    placeholder="Search Text"
                    value={this.state.EditedQuickSearchText}
                    OnTextChange={(x) => this.onUpdateQuickSearchText(x)} />
                {' '}
                <ButtonEdit cssClassName={cssClassName} onClick={() => this.props.onShowQuickSearchPopup()}
                    size={"small"}
                    overrideTooltip="Edit Quick Search"
                    DisplayMode="Glyph" />
            </div>
        </span>
      return <PanelDashboard cssClassName={cssClassName}  headerText={StrategyNames.QuickSearchStrategyName} glyphicon={StrategyGlyphs.QuickSearchGlyph} onClose={() => this.props.onClose(StrategyIds.QuickSearchStrategyId)}
                onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
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
        onShowQuickSearchPopup: () => dispatch(PopupRedux.PopupShow(ScreenPopups.QuickSearchPopup)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.QuickSearchPopup, isReadOnly)),
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);