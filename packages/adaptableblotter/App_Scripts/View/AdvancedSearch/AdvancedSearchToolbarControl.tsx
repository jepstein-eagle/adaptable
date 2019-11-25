import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';

import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';

import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';

import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';

interface AdvancedSearchToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
  CurrentAdvancedSearchName: string;
  AdvancedSearches: AdvancedSearch[];
  onSelectAdvancedSearch: (
    advancedSearchName: string
  ) => AdvancedSearchRedux.AdvancedSearchSelectAction;
  onNewAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
  onEditAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
}

class AdvancedSearchToolbarControlComponent extends React.Component<
  AdvancedSearchToolbarControlComponentProps,
  {}
> {
  render() {
    let savedSearch: AdvancedSearch = this.props.AdvancedSearches.find(
      s => s.Name == this.props.CurrentAdvancedSearchName
    );

    let sortedAdvancedSearches: AdvancedSearch[] = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.AdvancedSearches,
      'Name'
    );

    let availableSearches: any[] = sortedAdvancedSearches.map((search, index) => {
      return {
        label: search.Name,
        value: search.Name,
      };
    });
    let content = (
      <Flex
        flexDirection="row"
        alignItems="stretch"
        className="ab-DashboardToolbar__AdvancedSearch__wrap"
      >
        <Dropdown
          className="ab-DashboardToolbar__AdvancedSearch__select"
          disabled={availableSearches.length == 0}
          style={{ minWidth: 160 }}
          options={availableSearches}
          value={this.props.CurrentAdvancedSearchName}
          placeholder="Select Search"
          onChange={searchName => this.onSelectedSearchChanged(searchName)}
          marginRight={2}
        ></Dropdown>

        <ButtonEdit
          onClick={() => this.props.onEditAdvancedSearch()}
          className="ab-DashboardToolbar__AdvancedSearch__edit"
          tooltip="Edit Current Advanced Search"
          disabled={StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName)}
          AccessLevel={this.props.AccessLevel}
        />
        <ButtonNew
          variant="text"
          className="ab-DashboardToolbar__AdvancedSearch__new"
          onClick={() => this.props.onNewAdvancedSearch()}
          tooltip="Create New Advanced Search"
          AccessLevel={this.props.AccessLevel}
          children={null}
        />

        <ButtonDelete
          tooltip="Delete Advanced Search"
          className="ab-DashboardToolbar__AdvancedSearch__delete"
          disabled={StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName)}
          ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
          ConfirmationMsg={
            "Are you sure you want to delete '" + !savedSearch ? '' : savedSearch.Name + "'?"
          }
          ConfirmationTitle={'Delete Advanced Search'}
          AccessLevel={this.props.AccessLevel}
        />
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__AdvancedSearch"
        headerText={StrategyConstants.AdvancedSearchStrategyName}
        glyphicon={StrategyConstants.AdvancedSearchGlyph}
        onClose={() => this.props.onClose(StrategyConstants.AdvancedSearchStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedSearchChanged(searchName: string) {
    this.props.onSelectAdvancedSearch(searchName);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
    AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onSelectAdvancedSearch: (advancedSearchName: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName)),
    onNewAdvancedSearch: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup,
          {
            action: 'New',
            source: 'Toolbar',
          }
        )
      ),
    onEditAdvancedSearch: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup,
          {
            action: 'Edit',
            source: 'Toolbar',
          }
        )
      ),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup
        )
      ),
  };
}

export let AdvancedSearchToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchToolbarControlComponent);
