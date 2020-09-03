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
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface CustomSortPopupProps extends StrategyViewPopupProps<CustomSortPopupComponent> {
  onAddCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortAddAction;
  onEditCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortEditAction;
  CustomSorts: Array<CustomSort>;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        let columnId: string = this.props.popupParams.column.ColumnId;
        if (this.props.popupParams.action == 'New') {
          let newCustomSort = ObjectFactory.CreateEmptyCustomSort();
          newCustomSort.ColumnId = columnId;
          this.onNewFromColumn(newCustomSort);
        }
        if (this.props.popupParams.action == 'Edit') {
          let editCustomSort = this.props.CustomSorts.find(x => x.ColumnId == columnId);
          this.onEdit(editCustomSort);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
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
          api={this.props.api}
          adaptableObject={customSort}
          key={customSort.Uuid}
          onEdit={() => this.onEdit(customSort)}
          teamSharingActivated={this.props.teamSharingActivated}
          onShare={description => this.props.onShare(customSort, description)}
          onDeleteConfirm={CustomSortRedux.CustomSortDelete(customSort)}
          ColumnLabel={this.props.api.columnApi.getFriendlyNameFromColumnId(customSort.ColumnId)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Custom Sort"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.CustomSortStrategyFriendlyName}
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

          {this.state.editedAdaptableObject && (
            <CustomSortWizard
              editedAdaptableObject={this.state.editedAdaptableObject as CustomSort}
              configEntities={this.props.CustomSorts}
              modalContainer={this.props.modalContainer}
              api={this.props.api}
              wizardStartIndex={this.state.wizardStartIndex}
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
      editedAdaptableObject: Helper.cloneObject(customSort),
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyCustomSort(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onNewFromColumn(customsort: CustomSort) {
    let clonedObject: CustomSort = Helper.cloneObject(customsort);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStatus: WizardStatus.New,
      wizardStartIndex: 1,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let customSort: CustomSort = this.state.editedAdaptableObject as CustomSort;
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditCustomSort(customSort);
    } else {
      this.props.onAddCustomSort(customSort);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  canFinishWizard() {
    let customSort = this.state.editedAdaptableObject as CustomSort;
    return (
      StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
      ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<CustomSortPopupProps> {
  return {
    CustomSorts: state.CustomSort.CustomSorts,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CustomSortPopupProps> {
  return {
    onAddCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortAdd(customSort)),
    onEditCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortEdit(customSort)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),

    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.CustomSortStrategyId,
          description
        )
      ),
  };
}

export let CustomSortPopup = connect(mapStateToProps, mapDispatchToProps)(CustomSortPopupComponent);
