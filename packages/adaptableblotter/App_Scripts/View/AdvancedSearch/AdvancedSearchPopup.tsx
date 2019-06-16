import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { PRIMARY_BSSTYLE } from '../../Utilities/Constants/StyleConstants';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { AdvancedSearch } from '../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';

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
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class AdvancedSearchPopupComponent extends React.Component<
  AdvancedSearchPopupProps,
  EditableConfigEntityState
> {
  constructor(props: AdvancedSearchPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams == 'New') {
      this.onNew();
    }
    if (this.props.PopupParams == 'Edit') {
      let currentAdvancedSearch = this.props.AdvancedSearches.find(
        as => as.Name == this.props.CurrentAdvancedSearchName
      );
      if (currentAdvancedSearch) {
        this.onEdit(currentAdvancedSearch);
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__advancedsearch';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__advancedsearch';

    let infoBody: any[] = [
      'Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.',
      <br />,
      <br />,
      'Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard.',
    ];

    let noExistingObjectText = 'You have no Advanced Searches.';
    let startWizardText =
      this.props.AccessLevel == AccessLevel.ReadOnly
        ? ''
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
            cssClassName={cssClassName}
            key={advancedSearch.Uuid || index}
            colItems={colItems}
            IsCurrentAdvancedSearch={advancedSearch.Name == this.props.CurrentAdvancedSearchName}
            AdaptableBlotterObject={advancedSearch}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            onEdit={advancedSearch => this.onEdit(advancedSearch as AdvancedSearch)}
            onShare={() => this.props.onShare(advancedSearch)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onDeleteConfirm={AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch)}
            onSelect={() => this.props.onSelectAdvancedSearch(advancedSearch.Name)}
          />
        );
      }
    );

    let newSearchButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.onNew()}
        overrideTooltip="Create New Advanced Search"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          bsStyle={PRIMARY_BSSTYLE}
          headerText={StrategyConstants.AdvancedSearchStrategyName}
          infoBody={infoBody}
          button={newSearchButton}
          glyphicon={StrategyConstants.AdvancedSearchGlyph}
          className="ab_main_popup"
        >
          {advancedSearchRows.length > 0 && (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={advancedSearchRows}
            />
          )}

          {advancedSearchRows.length == 0 && (
            <div>
              <HelpBlock>{noExistingObjectText}</HelpBlock>
              <HelpBlock>{startWizardText}</HelpBlock>
            </div>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <AdvancedSearchWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
              ConfigEntities={this.props.AdvancedSearches}
              Blotter={this.props.Blotter}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              WizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </div>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyAdvancedSearch(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(advancedSearch: AdvancedSearch) {
    let clonedObject: AdvancedSearch = Helper.cloneObject(advancedSearch);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let clonedObject: AdvancedSearch = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
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
      EditedAdaptableBlotterObject: null,
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
  }

  canFinishWizard() {
    let advancedSearch = this.state.EditedAdaptableBlotterObject as AdvancedSearch;
    return (
      StringExtensions.IsNotNullOrEmpty(advancedSearch.Name) &&
      ExpressionHelper.IsNotEmptyOrInvalidExpression(advancedSearch.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
    CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddAdvancedSearch: (advancedSearch: AdvancedSearch) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch)),
    onEditAdvancedSearch: (advancedSearch: AdvancedSearch) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchEdit(advancedSearch)),
    onSelectAdvancedSearch: (selectedSearchName: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AdvancedSearchStrategyId)
      ),
  };
}

export let AdvancedSearchPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchPopupComponent);
