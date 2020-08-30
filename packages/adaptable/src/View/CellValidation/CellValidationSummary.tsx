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
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface CellValidationSummaryProps
  extends StrategySummaryProps<CellValidationSummaryComponent> {
  cellValidations: CellValidationRule[];
  onAddCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationAddAction;
  onEditCellValidation: (
    cellValidationRule: CellValidationRule
  ) => CellValidationRedux.CellValidationEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.CellValidationStrategyFriendlyName}
        functionName={StrategyConstants.CellValidationStrategyId}
        strategySummary={Helper.ReturnItemCount(
          this.props.cellValidations.filter(
            item => item.ColumnId == this.props.summarisedColumn.ColumnId
          ),
          StrategyConstants.CellValidationStrategyFriendlyName
        )}
        onNew={() => this.onNew()}
        newButtonTooltip={StrategyConstants.CellValidationStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.cellValidations.map((item, index) => {
      if (item.ColumnId == this.props.summarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            key={'CV' + index}
            Item1={StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.ActionMode)}
            Item2={this.props.api.internalApi
              .getValidationService()
              .createCellValidationDescription(item, this.props.api.columnApi.getColumns())}
            ConfigEnity={item}
            EntityType={StrategyConstants.CellValidationStrategyFriendlyName}
            showShare={this.props.teamSharingActivated}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
            onDelete={CellValidationRedux.CellValidationDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableObject && (
          <CellValidationWizard
            editedAdaptableObject={this.state.EditedAdaptableObject as CellValidationRule}
            configEntities={null}
            modalContainer={this.props.modalContainer}
            api={this.props.api}
            wizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            onSetNewSharedQueryName={() => {
              throw 'unimplemented';
            }}
            onSetUseSharedQuery={() => {
              throw 'unimplemented';
            }}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: CellValidationRule = ObjectFactory.CreateEmptyCellValidation();
    configEntity.ColumnId = this.props.summarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(CellValidation: CellValidationRule) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(CellValidation),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let cellValidationRule: CellValidationRule = Helper.cloneObject(
      this.state.EditedAdaptableObject
    );
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddCellValidation(cellValidationRule);
    } else {
      this.props.onEditCellValidation(cellValidationRule);
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let cellValidatinRule = this.state.EditedAdaptableObject as CellValidationRule;
    return true;
  }
}
function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<CellValidationSummaryProps> {
  return {
    cellValidations: state.CellValidation.CellValidations,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CellValidationSummaryProps> {
  return {
    onAddCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationAdd(cellValidationRule)),
    onEditCellValidation: (cellValidationRule: CellValidationRule) =>
      dispatch(CellValidationRedux.CellValidationEdit(cellValidationRule)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.CellValidationStrategyId,
          description
        )
      ),
  };
}

export let CellValidationSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellValidationSummaryComponent);
