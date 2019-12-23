import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { FreeTextColumnWizard } from './Wizard/FreeTextColumnWizard';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface FreeTextColumnSummaryProps
  extends StrategySummaryProps<FreeTextColumnSummaryComponent> {
  FreeTextColumns: FreeTextColumn[];
  onAddFreeTextColumn: (
    FreeTextColumn: FreeTextColumn
  ) => FreeTextColumnRedux.FreeTextColumnAddAction;
  onEditFreeTextColumn: (
    FreeTextColumn: FreeTextColumn
  ) => FreeTextColumnRedux.FreeTextColumnEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class FreeTextColumnSummaryComponent extends React.Component<
  FreeTextColumnSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: FreeTextColumnSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let freeTextColumn: FreeTextColumn = this.props.FreeTextColumns.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noFreeTextColumn: boolean = freeTextColumn == null;

    let FreeTextColumnRow: any;

    if (!noFreeTextColumn) {
      let description: string = ArrayExtensions.IsNotEmpty(freeTextColumn.FreeTextStoredValues)
        ? ' Stored values: ' + freeTextColumn.FreeTextStoredValues.length
        : 'No stored values';
      let index = this.props.FreeTextColumns.findIndex(
        ftc => ftc.ColumnId == this.props.SummarisedColumn.ColumnId
      );
      FreeTextColumnRow = (
        <StrategyDetail
          key={StrategyConstants.FreeTextColumnStrategyName}
          Item1={<StrategyProfile StrategyId={StrategyConstants.FreeTextColumnStrategyId} />}
          Item2={description}
          ConfigEnity={freeTextColumn}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.FreeTextColumnStrategyName}
          onEdit={() => this.onEdit(freeTextColumn)}
          onShare={() => this.props.onShare(freeTextColumn)}
          onDelete={FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {FreeTextColumnRow}

        {this.state.EditedAdaptableObject && (
          <FreeTextColumnWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as FreeTextColumn}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            ConfigEntities={this.props.FreeTextColumns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            Blotter={this.props.Blotter}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: FreeTextColumn = ObjectFactory.CreateEmptyFreeTextColumn();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(FreeTextColumn: FreeTextColumn) {
    let clonedObject: FreeTextColumn = Helper.cloneObject(FreeTextColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 0,
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
    let FreeTextColumn: FreeTextColumn = this.state.EditedAdaptableObject as FreeTextColumn;
    if (this.props.FreeTextColumns.find(x => x.ColumnId == FreeTextColumn.ColumnId)) {
      this.props.onEditFreeTextColumn(FreeTextColumn);
    } else {
      this.props.onAddFreeTextColumn(FreeTextColumn);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let FreeTextColumn = this.state.EditedAdaptableObject as FreeTextColumn;
    return StringExtensions.IsNotNullOrEmpty(FreeTextColumn.ColumnId);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddFreeTextColumn: (FreeTextColumn: FreeTextColumn) =>
      dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
    onEditFreeTextColumn: (FreeTextColumn: FreeTextColumn) =>
      dispatch(FreeTextColumnRedux.FreeTextColumnEdit(FreeTextColumn)),
    onShare: (entity: AdaptableObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.FreeTextColumnStrategyId as AdaptableFunctionName
        )
      ),
  };
}

export let FreeTextColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeTextColumnSummaryComponent);
