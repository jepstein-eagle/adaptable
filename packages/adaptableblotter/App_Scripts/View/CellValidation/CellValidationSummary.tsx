import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { CellValidationWizard } from './Wizard/CellValidationWizard';
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { CellValidationRule } from '../../PredefinedConfig/RunTimeState/CellValidationState';

export interface CellValidationSummaryProps
  extends StrategySummaryProps<CellValidationSummaryComponent> {
  CellValidations: CellValidationRule[];
  onAddCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationAddAction;
  onEditCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class CellValidationSummaryComponent extends React.Component<
  CellValidationSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: CellValidationSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__cellvalidation';
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.CellValidationStrategyName}
        cssClassName={this.props.cssClassName}
        StrategyId={StrategyConstants.CellValidationStrategyId}
        StrategySummary={Helper.ReturnItemCount(
          this.props.CellValidations.filter(
            item => item.ColumnId == this.props.SummarisedColumn.ColumnId
          ),
          StrategyConstants.CellValidationStrategyName
        )}
        onNew={() => this.onNew()}
        NewButtonTooltip={StrategyConstants.CellValidationStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.CellValidations.map((item, index) => {
      if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            cssClassName={this.props.cssClassName}
            key={'CV' + index}
            Item1={StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.ActionMode)}
            Item2={CellValidationHelper.createCellValidationDescription(item, this.props.Columns)}
            ConfigEnity={item}
            EntityType={StrategyConstants.CellValidationStrategyName}
            showShare={this.props.TeamSharingActivated}
            onEdit={() => this.onEdit(item)}
            onShare={() => this.props.onShare(item)}
            onDelete={CellValidationRedux.CellValidationDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableBlotterObject && (
          <CellValidationWizard
            cssClassName={cssWizardClassName}
            EditedAdaptableBlotterObject={
              this.state.EditedAdaptableBlotterObject as CellValidationRule
            }
            ConfigEntities={null}
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
      </div>
    );
  }

  onNew() {
    let configEntity: CellValidationRule = ObjectFactory.CreateEmptyCellValidation();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(CellValidation: CellValidationRule) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(CellValidation),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let cellValidationRule: CellValidationRule = Helper.cloneObject(
      this.state.EditedAdaptableBlotterObject
    );
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddCellValidation(cellValidationRule);
    } else {
      this.props.onEditCellValidation(cellValidationRule);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let cellValidatinRule = this.state.EditedAdaptableBlotterObject as CellValidationRule;
    return true;
  }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    CellValidations: state.CellValidation.CellValidations,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationAdd(cellValidationRule)),
    onEditCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationEdit(cellValidationRule)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellValidationStrategyId)
      ),
  };
}

export let CellValidationSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellValidationSummaryComponent);
