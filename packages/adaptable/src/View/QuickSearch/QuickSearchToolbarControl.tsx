﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';

import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { AdaptableFormControlTextClear } from '../Components/Forms/AdaptableFormControlTextClear';

interface QuickSearchToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  onShowQuickSearchPopup: () => PopupRedux.PopupShowScreenAction;
  QuickSearchText: string;
}

interface QuickSearchToolbarControlComponentState {
  EditedQuickSearchText: string;
}

class QuickSearchToolbarControlComponent extends React.Component<
  QuickSearchToolbarControlComponentProps,
  QuickSearchToolbarControlComponentState
> {
  constructor(props: QuickSearchToolbarControlComponentProps) {
    super(props);
    this.state = { EditedQuickSearchText: this.props.QuickSearchText };
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: QuickSearchToolbarControlComponentProps,
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
      <PanelDashboard
        className="ab-DashboardToolbar__QuickSearch"
        headerText={StrategyConstants.QuickSearchStrategyFriendlyName}
        glyphicon={StrategyConstants.QuickSearchGlyph}
        onConfigure={() => this.props.onConfigure()}
      >
        <AdaptableFormControlTextClear
          type="text"
          placeholder="Search Text"
          className="ab-DashboardToolbar__QuickSearch__text"
          value={this.state.EditedQuickSearchText}
          OnTextChange={x => this.onUpdateQuickSearchText(x)}
          style={{ height: '100%' }}
          inputStyle={{ width: '7rem' }}
        />
      </PanelDashboard>
    );
  }

  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText });
    this.debouncedRunQuickSearch();
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<QuickSearchToolbarControlComponentProps> {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QuickSearchToolbarControlComponentProps> {
  return {
    onRunQuickSearch: (newQuickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
    onShowQuickSearchPopup: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.QuickSearchStrategyId,
          ScreenPopups.QuickSearchPopup
        )
      ),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.QuickSearchStrategyId,
          ScreenPopups.QuickSearchPopup
        )
      ),
  };
}

export let QuickSearchToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSearchToolbarControlComponent);
