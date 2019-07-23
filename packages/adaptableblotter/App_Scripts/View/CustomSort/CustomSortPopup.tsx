import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IColumn } from '../../Utilities/Interface/IColumn';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { CustomSort } from '../../PredefinedConfig/RunTimeState/CustomSortState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';

interface CustomSortPopupProps extends StrategyViewPopupProps<CustomSortPopupComponent> {
  onAddCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortAddAction;
  onEditCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortEditAction;
  CustomSorts: Array<CustomSort>;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class CustomSortPopupComponent extends React.Component<
  CustomSortPopupProps,
  EditableConfigEntityState
> {
  constructor(props: CustomSortPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      if (arrayParams.length == 2 && arrayParams[0] == 'New') {
        let newCustomSort = ObjectFactory.CreateEmptyCustomSort();
        newCustomSort.ColumnId = arrayParams[1];
        this.onNewFromColumn(newCustomSort);
      }
      if (arrayParams.length == 2 && arrayParams[0] == 'Edit') {
        let editCustomSort = this.props.CustomSorts.find(x => x.ColumnId == arrayParams[1]);
        this.onEdit(editCustomSort);
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__customsort';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__customsort';

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
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={customSort}
          key={customSort.Uuid}
          onEdit={() => this.onEdit(customSort)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={() => this.props.onShare(customSort)}
          onDeleteConfirm={CustomSortRedux.CustomSortDelete(customSort)}
          ColumnLabel={ColumnHelper.getFriendlyNameFromColumnId(
            customSort.ColumnId,
            this.props.Columns
          )}
        />
      );
    });

    let newButton = (
      <ButtonNew
        className={cssClassName}
        onClick={() => this.onNew()}
        tooltip="Create Custom Sort"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex className={cssClassName} flex={1} flexDirection="column">
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.CustomSortStrategyName}
          infoBody={infoBody}
          button={newButton}
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.CustomSortGlyph}
        >
          {customSorts.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={customSorts}
            />
          ) : (
            <EmptyContent>
              Click 'New' to create a bespoke sort order for a selected column.
            </EmptyContent>
          )}

          {this.state.EditedAdaptableBlotterObject && (
            <CustomSortWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as CustomSort}
              ConfigEntities={this.props.CustomSorts}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
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
      EditedAdaptableBlotterObject: Helper.cloneObject(customSort),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyCustomSort(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onNewFromColumn(customsort: CustomSort) {
    let clonedObject: CustomSort = Helper.cloneObject(customsort);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
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
    let customSort: CustomSort = this.state.EditedAdaptableBlotterObject as CustomSort;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditCustomSort(customSort);
    } else {
      this.props.onAddCustomSort(customSort);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  canFinishWizard() {
    let customSort = this.state.EditedAdaptableBlotterObject as CustomSort;
    return (
      StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
      ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CustomSorts: state.CustomSort.CustomSorts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortAdd(customSort)),
    onEditCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortEdit(customSort)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId)),
  };
}

export let CustomSortPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSortPopupComponent);
