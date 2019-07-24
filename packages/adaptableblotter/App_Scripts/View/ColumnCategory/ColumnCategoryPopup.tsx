import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
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
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { ColumnCategory } from '../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnCategoryEntityRow } from './ColumnCategoryEntityRow';
import { ColumnCategoryWizard } from './Wizard/ColumnCategoryWizard';

interface ColumnCategoryPopupProps extends StrategyViewPopupProps<ColumnCategoryPopupComponent> {
  ColumnCategorys: ColumnCategory[];
  onAddColumnCategory: (
    columnCategory: ColumnCategory
  ) => ColumnCategoryRedux.ColumnCategoryAddAction;
  onEditColumnCategory: (
    columnCategory: ColumnCategory
  ) => ColumnCategoryRedux.ColumnCategoryEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ColumnCategoryPopupComponent extends React.Component<
  ColumnCategoryPopupProps,
  EditableConfigEntityState
> {
  constructor(props: ColumnCategoryPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams == 'New') {
      this.onNew();
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__ColumnCategory';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__ColumnCategory';

    let infoBody: any[] = [
      'Column Categories allow you to link different columns, primarily for use in Conditional Styles.',
      <br />,
      <br />,
      'They are also used in Column Chooser to make it easier to find and manage large column sets.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Categry', Size: 2 },
      { Content: 'Columns', Size: 8 },
      { Content: '', Size: 2 },
    ];

    let ColumnCategoryRows = this.props.ColumnCategorys.map((item, index) => {
      return (
        <ColumnCategoryEntityRow
          key={index}
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={item}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          onEdit={() => this.onEdit(item)}
          onShare={() => this.props.onShare(item)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={ColumnCategoryRedux.ColumnCategoryDelete(item)}
        />
      );
    });

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
          bsStyle="primary"
          headerText={StrategyConstants.ColumnCategoryStrategyName}
          infoBody={infoBody}
          button={newSearchButton}
          glyphicon={StrategyConstants.ColumnCategoryGlyph}
          className="ab_main_popup"
        >
          {ColumnCategoryRows.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={ColumnCategoryRows}
            />
          ) : (
            <HelpBlock>Click 'New' to start creating Column Categories.</HelpBlock>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <ColumnCategoryWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
              ConfigEntities={this.props.ColumnCategorys}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              ColumnCategorys={this.props.ColumnCategorys}
              Blotter={this.props.Blotter}
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
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyColumnCategory(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(columnCategory: ColumnCategory) {
    let clonedObject: ColumnCategory = Helper.cloneObject(columnCategory);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 1,
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
    let columnCategory = this.state.EditedAdaptableBlotterObject as ColumnCategory;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditColumnCategory(columnCategory);
    } else {
      this.props.onAddColumnCategory(columnCategory);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let ColumnCategory = this.state.EditedAdaptableBlotterObject as ColumnCategory;
    return (
      StringExtensions.IsNotEmpty(ColumnCategory.ColumnCategoryId) &&
      ArrayExtensions.IsNotEmpty(ColumnCategory.ColumnIds)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ColumnCategorys: state.ColumnCategory.ColumnCategories,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddColumnCategory: (ColumnCategory: ColumnCategory) =>
      dispatch(ColumnCategoryRedux.ColumnCategoryAdd(ColumnCategory)),
    onEditColumnCategory: (columnCategory: ColumnCategory) =>
      dispatch(ColumnCategoryRedux.ColumnCategoryEdit(columnCategory)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId)
      ),
  };
}

export let ColumnCategoryPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnCategoryPopupComponent);
