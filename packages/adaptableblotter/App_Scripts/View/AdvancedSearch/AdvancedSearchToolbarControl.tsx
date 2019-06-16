import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder, AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';
import { InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IAdvancedSearch } from '../../PredefinedConfig/IUserState/AdvancedSearchState';

interface AdvancedSearchToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
  CurrentAdvancedSearchName: string;
  AdvancedSearches: IAdvancedSearch[];
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
    const selectSearchString: string = 'Select a Search';
    let cssClassName: string = this.props.cssClassName + '__advancedsearch';

    let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(
      s => s.Name == this.props.CurrentAdvancedSearchName
    );

    let currentSearchName = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName)
      ? selectSearchString
      : this.props.CurrentAdvancedSearchName;

    let sortedAdvancedSearches: IAdvancedSearch[] = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.AdvancedSearches,
      'Name'
    );

    let availableSearches: any[] = sortedAdvancedSearches
      .filter(s => s.Name != this.props.CurrentAdvancedSearchName)
      .map((search, index) => {
        return (
          <MenuItem
            key={index}
            eventKey={index}
            onClick={() => this.onSelectedSearchChanged(search.Name)}
          >
            {search.Name}
          </MenuItem>
        );
      });
    let content = (
      <span>
        <InputGroup>
          <DropdownButton
            disabled={availableSearches.length == 0}
            style={{ minWidth: '120px' }}
            className={cssClassName}
            bsSize={this.props.DashboardSize}
            bsStyle={'default'}
            title={currentSearchName}
            id="advancedSearch"
            componentClass={InputGroup.Button}
          >
            {availableSearches}
          </DropdownButton>
          {currentSearchName != selectSearchString && (
            <InputGroup.Button>
              <ButtonClear
                bsStyle={'default'}
                cssClassName={cssClassName}
                onClick={() => this.onSelectedSearchChanged('')}
                size={this.props.DashboardSize}
                overrideTooltip="Clear Search"
                overrideDisableButton={currentSearchName == selectSearchString}
                DisplayMode="Glyph"
                AccessLevel={this.props.AccessLevel}
                showDefaultStyle={this.props.UseSingleColourForButtons}
              />
            </InputGroup.Button>
          )}
        </InputGroup>

        <span
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <ButtonEdit
            style={{ marginLeft: '5px' }}
            onClick={() => this.props.onEditAdvancedSearch()}
            cssClassName={cssClassName}
            size={this.props.DashboardSize}
            overrideTooltip="Edit Current Advanced Search"
            overrideDisableButton={currentSearchName == selectSearchString}
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />
          <ButtonNew
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            onClick={() => this.props.onNewAdvancedSearch()}
            size={this.props.DashboardSize}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />
          <ButtonDelete
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            size={this.props.DashboardSize}
            overrideTooltip="Delete Advanced Search"
            overrideDisableButton={currentSearchName == selectSearchString}
            DisplayMode="Glyph"
            ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
            ConfirmationMsg={
              "Are you sure you want to delete '" + !savedSearch ? '' : savedSearch.Name + "'?"
            }
            ConfirmationTitle={'Delete Advanced Search'}
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />
        </span>
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onSelectAdvancedSearch: (advancedSearchName: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName)),
    onNewAdvancedSearch: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup,
          'New'
        )
      ),
    onEditAdvancedSearch: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.AdvancedSearchStrategyId,
          ScreenPopups.AdvancedSearchPopup,
          'Edit'
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
