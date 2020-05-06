﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';

import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';

import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';

import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';

interface AdvancedSearchToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<AdvancedSearchToolPanelComponent> {
  CurrentAdvancedSearchName: string;
  AdvancedSearches: AdvancedSearch[];
  onSelectAdvancedSearch: (
    advancedSearchName: string
  ) => AdvancedSearchRedux.AdvancedSearchSelectAction;
  onNewAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
  onEditAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
}

interface AdvancedSearchToolPanelComponentState {
  IsMinimised: boolean;
}

class AdvancedSearchToolPanelComponent extends React.Component<
  AdvancedSearchToolPanelComponentProps,
  AdvancedSearchToolPanelComponentState
> {
  constructor(props: AdvancedSearchToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

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
        flexDirection="column"
        alignItems="stretch"
        className="ab-ToolPanel__AdvancedSearch__wrap"
      >
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className="ab-ToolPanel__AdvancedSearch__wrap"
        >
          <Dropdown
            className="ab-ToolPanel__AdvancedSearch__select"
            disabled={availableSearches.length == 0}
            style={{ minWidth: 170 }}
            options={availableSearches}
            value={this.props.CurrentAdvancedSearchName}
            placeholder="Select Search"
            onChange={searchName => this.onSelectedSearchChanged(searchName)}
          ></Dropdown>
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className="ab-ToolPanel__AdvancedSearch__wrap"
        >
          <ButtonEdit
            onClick={() => this.props.onEditAdvancedSearch()}
            className="ab-ToolPanel__AdvancedSearch__edit"
            tooltip="Edit Current Advanced Search"
            disabled={StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName)}
            AccessLevel={this.props.AccessLevel}
          />
          <ButtonNew
            variant="text"
            tone="neutral"
            className="ab-ToolPanel__AdvancedSearch__new"
            onClick={() => this.props.onNewAdvancedSearch()}
            tooltip="Create New Advanced Search"
            AccessLevel={this.props.AccessLevel}
            children={null}
          ></ButtonNew>

          <ButtonDelete
            tooltip="Delete Advanced Search"
            className="ab-ToolPanel__AdvancedSearch__delete"
            disabled={StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName)}
            ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
            ConfirmationMsg={
              "Are you sure you want to delete '" + !savedSearch ? '' : savedSearch.Name + "'?"
            }
            ConfirmationTitle={'Delete Advanced Search'}
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__AdvancedSearch"
        headerText={StrategyConstants.AdvancedSearchStrategyFriendlyName}
        // glyphicon={StrategyConstants.AdvancedSearchGlyph}
        //  onClose={() => this.props.onClose(StrategyConstants.AdvancedSearchStrategyId)}
        onConfigure={() => this.props.onConfigure()}
        onClose={() => this.props.onClose('AdvancedSearch')}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  onSelectedSearchChanged(searchName: string) {
    this.props.onSelectAdvancedSearch(searchName);
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<AdvancedSearchToolPanelComponentProps> {
  return {
    CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
    AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<AdvancedSearchToolPanelComponentProps> {
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
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup
        )
      ),
  };
}

export let AdvancedSearchToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchToolPanelComponent);
