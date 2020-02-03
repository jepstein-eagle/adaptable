import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { GradientColumnWizard } from './Wizard/GradientColumnWizard';
import * as GradientColumnRedux from '../../Redux/ActionsReducers/GradientColumnRedux';
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
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface GradientColumnSummaryProps
  extends StrategySummaryProps<GradientColumnSummaryComponent> {
  GradientColumns: GradientColumn[];
  ColorPalette: string[];
  StyleClassNames: string[];
  onAddGradientColumn: (
    GradientColumn: GradientColumn
  ) => GradientColumnRedux.GradientColumnAddAction;
  onEditGradientColumn: (
    GradientColumn: GradientColumn
  ) => GradientColumnRedux.GradientColumnEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class GradientColumnSummaryComponent extends React.Component<
  GradientColumnSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: GradientColumnSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let GradientColumn: GradientColumn = this.props.GradientColumns.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noGradientColumn: boolean = GradientColumn == null;

    let GradientColumnRow: any;

    if (noGradientColumn) {
      GradientColumnRow = (
        <StrategyHeader
          key={StrategyConstants.GradientColumnStrategyFriendlyName}
          FunctionName={StrategyConstants.GradientColumnStrategyId}
          StrategySummary={'No Percent Bar'}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.GradientColumnStrategyFriendlyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else {
      GradientColumnRow = (
        <StrategyDetail
          key={StrategyConstants.GradientColumnStrategyFriendlyName}
          Item1={<StrategyProfile FunctionName={StrategyConstants.GradientColumnStrategyId} />}
          Item2={'Percent Bar set'}
          ConfigEnity={GradientColumn}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.GradientColumnStrategyFriendlyName}
          onEdit={() => this.onEdit(GradientColumn)}
          onShare={() => this.props.onShare(GradientColumn)}
          onDelete={GradientColumnRedux.GradientColumnDelete(GradientColumn)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {GradientColumnRow}

        {this.state.EditedAdaptableObject && (
          <GradientColumnWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as GradientColumn}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            ConfigEntities={this.props.GradientColumns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            ColorPalette={this.props.ColorPalette}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            Adaptable={this.props.Adaptable}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: GradientColumn = ObjectFactory.CreateEmptyGradientColumn();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;

    let distinctColumnsValues: number[] = this.props.Adaptable.StrategyService.getDistinctColumnValues(
      this.props.SummarisedColumn.ColumnId
    );

    configEntity.NegativeValue = Math.min(...distinctColumnsValues);
    configEntity.PositiveValue = Math.max(...distinctColumnsValues);

    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(renderedColumn: GradientColumn) {
    let clonedObject: GradientColumn = Helper.cloneObject(renderedColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
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
    let GradientColumn: GradientColumn = this.state.EditedAdaptableObject as GradientColumn;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditGradientColumn(GradientColumn);
    } else {
      this.props.onAddGradientColumn(GradientColumn);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let GradientColumn = this.state.EditedAdaptableObject as GradientColumn;
    return StringExtensions.IsNotNullOrEmpty(GradientColumn.ColumnId);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    GradientColumns: state.GradientColumn.GradientColumns,
    ColorPalette: state.UserInterface.ColorPalette,
    Entitlements: state.Entitlements.FunctionEntitlements,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddGradientColumn: (GradientColumn: GradientColumn) =>
      dispatch(GradientColumnRedux.GradientColumnAdd(GradientColumn)),
    onEditGradientColumn: (GradientColumn: GradientColumn) =>
      dispatch(GradientColumnRedux.GradientColumnEdit(GradientColumn)),
    onShare: (entity: AdaptableObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.GradientColumnStrategyId)
      ),
  };
}

export let GradientColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientColumnSummaryComponent);
