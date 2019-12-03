import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';

import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';

interface QuickSearchToolPanelComponentProps
  extends ToolbarStrategyViewPopupProps<QuickSearchToolPanelComponentProps> {
  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  QuickSearchText: string;
}

interface QuickSearchToolPanelComponentState {
  EditedQuickSearchText: string;
  IsMinimised: boolean;
}

class QuickSearchToolPanelComponent extends React.Component<
  QuickSearchToolPanelComponentProps,
  QuickSearchToolPanelComponentState
> {
  constructor(props: QuickSearchToolPanelComponentProps) {
    super(props);
    this.state = { EditedQuickSearchText: this.props.QuickSearchText, IsMinimised: false };
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: QuickSearchToolPanelComponentProps,
    nextContext: any
  ) {
    this.setState({
      EditedQuickSearchText: nextProps.QuickSearchText,
    });
  }

  debouncedRunQuickSearch = _.debounce(
    () => this.props.onRunQuickSearch(this.state.EditedQuickSearchText),
    250
  );

  render() {
    return (
      <PanelToolPanel
        className="ab-DashboardToolbar__QuickSearch"
        headerText={StrategyConstants.QuickSearchStrategyName}
        glyphicon={StrategyConstants.QuickSearchGlyph}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.onMinimiseChanged()}
        isMinimised={this.state.IsMinimised}
      >
        {!this.state.IsMinimised && (
          <AdaptableBlotterFormControlTextClear
            type="text"
            placeholder="Search Text"
            className="ab-DashboardToolbar__QuickSearch__text"
            value={this.state.EditedQuickSearchText}
            OnTextChange={x => this.onUpdateQuickSearchText(x)}
            style={{ height: '100%' }}
            inputStyle={{ width: '7rem' }}
          />
        )}
      </PanelToolPanel>
    );
  }

  onMinimiseChanged() {
    this.setState({ IsMinimised: !this.state.IsMinimised });
  }
  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText });
    this.debouncedRunQuickSearch();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onRunQuickSearch: (newQuickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.QuickSearchStrategyId,
          ScreenPopups.QuickSearchPopup
        )
      ),
  };
}

export let QuickSearchToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSearchToolPanelComponent);
