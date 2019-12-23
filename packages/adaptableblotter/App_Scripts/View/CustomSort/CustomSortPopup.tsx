import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { CustomSortEntityRow } from './CustomSortEntityRow';
import { CustomSortWizard } from './Wizard/CustomSortWizard';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface CustomSortPopupProps extends StrategyViewPopupProps<CustomSortPopupComponent> {
  onAddCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortAddAction;
  onEditCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortEditAction;
  CustomSorts: Array<CustomSort>;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class CustomSortPopupComponent extends React.Component<
  CustomSortPopupProps,
  EditableConfigEntityState
> {
  constructor(props: CustomSortPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        let columnId: string = this.props.PopupParams.columnId;
        if (this.props.PopupParams.action == 'New') {
          let newCustomSort = ObjectFactory.CreateEmptyCustomSort();
          newCustomSort.ColumnId = columnId;
          this.onNewFromColumn(newCustomSort);
        }
        if (this.props.PopupParams.action == 'Edit') {
          let editCustomSort = this.props.CustomSorts.find(x => x.ColumnId == columnId);
          this.onEdit(editCustomSort);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Custom Sorts enable you to create your own sort orders for columns where the default (alphabetical ascending or descending) is insufficient.',
      <br />,
      <br />,
      'Use the Wizard to specify and order the column values in the Sort.',
      <br />,
      <br />,
      'A Custom Sort can contain as many column values as required; any values not contained in the Custom Sort will be sorted alphabetically ',
      <strong>after</strong>,
      ' the sort order has been applied.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 3 },
      { Content: 'Sort Order', Size: 7 },
      { Content: '', Size: 2 },
    ];

    let customSorts = this.props.CustomSorts.map((customSort: CustomSort, index) => {
      return (
        <CustomSortEntityRow
          colItems={colItems}
          AdaptableObject={customSort}
          key={customSort.Uuid}
          onEdit={() => this.onEdit(customSort)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={() => this.props.onShare(customSort)}
          onDeleteConfirm={CustomSortRedux.CustomSortDelete(customSort)}
          ColumnLabel={ColumnHelper.getFriendlyNameFromColumnId(
            customSort.ColumnId,
            this.props.Columns
          )}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Custom Sort"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.CustomSortStrategyName}
          infoBody={infoBody}
          button={newButton}
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.CustomSortGlyph}
        >
          {customSorts.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={customSorts} />
          ) : (
            <EmptyContent>
              Click 'New' to create a bespoke sort order for a selected column.
            </EmptyContent>
          )}

          {this.state.EditedAdaptableObject && (
            <CustomSortWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as CustomSort}
              ConfigEntities={this.props.CustomSorts}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              Blotter={this.props.Blotter}
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

  onEdit(customSort: CustomSort) {
    //so we dont mutate original object
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(customSort),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyCustomSort(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onNewFromColumn(customsort: CustomSort) {
    let clonedObject: CustomSort = Helper.cloneObject(customsort);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let customSort: CustomSort = this.state.EditedAdaptableObject as CustomSort;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditCustomSort(customSort);
    } else {
      this.props.onAddCustomSort(customSort);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let customSort = this.state.EditedAdaptableObject as CustomSort;
    return (
      StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
      ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    CustomSorts: state.CustomSort.CustomSorts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortAdd(customSort)),
    onEditCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortEdit(customSort)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId)),
  };
}

export let CustomSortPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSortPopupComponent);
