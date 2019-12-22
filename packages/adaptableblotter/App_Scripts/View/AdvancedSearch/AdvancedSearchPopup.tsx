import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdvancedSearchWizard } from './Wizard/AdvancedSearchWizard';
import { AdvancedSearchEntityRow } from './AdvancedSearchEntityRow';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';

interface AdvancedSearchPopupProps extends StrategyViewPopupProps<AdvancedSearchPopupComponent> {
  AdvancedSearches: AdvancedSearch[];
  CurrentAdvancedSearchName: string;
  onAddAdvancedSearch: (
    advancedSearch: AdvancedSearch
  ) => AdvancedSearchRedux.AdvancedSearchAddAction;
  onEditAdvancedSearch: (
    advancedSearch: AdvancedSearch
  ) => AdvancedSearchRedux.AdvancedSearchEditAction;
  onSelectAdvancedSearch: (
    SelectedSearchName: string
  ) => AdvancedSearchRedux.AdvancedSearchSelectAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class AdvancedSearchPopupComponent extends React.Component<
  AdvancedSearchPopupProps,
  EditableConfigEntityState
> {
  constructor(props: AdvancedSearchPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;

  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action) {
        if (this.props.PopupParams.action == 'New') {
          this.onNew();
        }
        if (this.props.PopupParams.action == 'Edit') {
          let currentAdvancedSearch = this.props.AdvancedSearches.find(
            as => as.Name == this.props.CurrentAdvancedSearchName
          );
          if (currentAdvancedSearch) {
            this.onEdit(currentAdvancedSearch);
          }
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
    }
  }

  render() {
    let infoBody: any[] = [
      'Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.',
      <br />,
      <br />,
      'Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard.',
    ];

    let startWizardText =
      this.props.AccessLevel == AccessLevel.ReadOnly
        ? 'You have no Advanced Searches.'
        : " Click 'New' to start the Advanced Search Wizard to create a new Advanced Search.";

    let colItems: IColItem[] = [
      { Content: 'Current', Size: 1 },
      { Content: 'Name', Size: 3 },
      { Content: 'Query', Size: 6 },
      { Content: '', Size: 2 },
    ];

    let advancedSearchRows = this.props.AdvancedSearches.map(
      (advancedSearch: AdvancedSearch, index) => {
        return (
          <AdvancedSearchEntityRow
            key={advancedSearch.Uuid || index}
            colItems={colItems}
            IsCurrentAdvancedSearch={advancedSearch.Name == this.props.CurrentAdvancedSearchName}
            AdaptableObject={advancedSearch}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            onEdit={advancedSearch => this.onEdit(advancedSearch as AdvancedSearch)}
            onShare={() => this.props.onShare(advancedSearch)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onDeleteConfirm={AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch)}
            onSelect={() => this.props.onSelectAdvancedSearch(advancedSearch.Name)}
            AccessLevel={this.props.AccessLevel}
          />
        );
      }
    );

    let newSearchButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Conditional Style"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.AdvancedSearchStrategyName}
          infoBody={infoBody}
          button={newSearchButton}
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.AdvancedSearchGlyph}
        >
          {advancedSearchRows.length > 0 && (
            <AdaptableObjectCollection colItems={colItems} items={advancedSearchRows} />
          )}

          {advancedSearchRows.length == 0 && (
            <EmptyContent>
              <p>{startWizardText}</p>
            </EmptyContent>
          )}

          {this.state.EditedAdaptableObject != null && (
            <AdvancedSearchWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject}
              ConfigEntities={this.props.AdvancedSearches}
              Blotter={this.props.Blotter}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              WizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyAdvancedSearch(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(advancedSearch: AdvancedSearch) {
    let clonedObject: AdvancedSearch = Helper.cloneObject(advancedSearch);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    // if we've come from the Toolbar and the Searches are identical then close the main popup
    if (
      this.props.PopupParams &&
      this.props.PopupParams.source &&
      this.props.PopupParams.source == 'Toolbar'
    ) {
      if (
        this.props.AdvancedSearches ===
        this.props.Blotter.api.advancedSearchApi.getAllAdvancedSearch()
      ) {
        this.props.onClosePopup();
      }
    }
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let clonedObject: AdvancedSearch = Helper.cloneObject(this.state.EditedAdaptableObject);
    let currentSearch: AdvancedSearch = this.props.AdvancedSearches.filter(
      s => s.Name === this.props.CurrentAdvancedSearchName
    )[0];
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddAdvancedSearch(clonedObject);
    } else if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditAdvancedSearch(clonedObject);
    }
    let wizardStatus = this.state.WizardStatus; // need this?
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    if (
      wizardStatus == WizardStatus.New ||
      (currentSearch && currentSearch.Uuid === clonedObject.Uuid)
    ) {
      // it its new - make it the new search
      // or if we are editing the current search - but might have changed the name
      this.props.onSelectAdvancedSearch(clonedObject.Name);
    }
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let advancedSearch = this.state.EditedAdaptableObject as AdvancedSearch;
    return (
      StringExtensions.IsNotNullOrEmpty(advancedSearch.Name) &&
      ExpressionHelper.IsNotEmptyOrInvalidExpression(advancedSearch.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
    CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddAdvancedSearch: (advancedSearch: AdvancedSearch) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch)),
    onEditAdvancedSearch: (advancedSearch: AdvancedSearch) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchEdit(advancedSearch)),
    onSelectAdvancedSearch: (selectedSearchName: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
    onShare: (entity: AdaptableObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AdvancedSearchStrategyId)
      ),
  };
}

export let AdvancedSearchPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchPopupComponent);
