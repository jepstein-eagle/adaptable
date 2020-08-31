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
import { CellValueType } from '../../PredefinedConfig/Common/Enums';
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
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
      c => c.ColumnId == this.props.summarisedColumn.ColumnId
    );
    let noGradientColumn: boolean = GradientColumn == null;

    let GradientColumnRow: any;

    if (noGradientColumn) {
      GradientColumnRow = (
        <StrategyHeader
          key={StrategyConstants.GradientColumnStrategyFriendlyName}
          functionName={StrategyConstants.GradientColumnStrategyId}
          strategySummary={'No Gradient Column'}
          onNew={() => this.onNew()}
          newButtonTooltip={StrategyConstants.GradientColumnStrategyFriendlyName}
          accessLevel={this.props.accessLevel}
        />
      );
    } else {
      GradientColumnRow = (
        <StrategyDetail
          key={StrategyConstants.GradientColumnStrategyFriendlyName}
          item1={<StrategyProfile FunctionName={StrategyConstants.GradientColumnStrategyId} />}
          item2={'Gradient Column set'}
          configEnity={GradientColumn}
          showShare={this.props.teamSharingActivated}
          entityType={StrategyConstants.GradientColumnStrategyFriendlyName}
          onEdit={() => this.onEdit(GradientColumn)}
          onShare={description => this.props.onShare(GradientColumn, description)}
          onDelete={GradientColumnRedux.GradientColumnDelete(GradientColumn)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {GradientColumnRow}

        {this.state.editedAdaptableObject && (
          <GradientColumnWizard
            editedAdaptableObject={this.state.editedAdaptableObject as GradientColumn}
            modalContainer={this.props.modalContainer}
            configEntities={this.props.GradientColumns}
            wizardStartIndex={this.state.wizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            api={this.props.api}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: GradientColumn = ObjectFactory.CreateEmptyGradientColumn();
    configEntity.ColumnId = this.props.summarisedColumn.ColumnId;

    let distinctColumnsValues: number[] = this.props.api.columnApi.getDistinctRawValuesForColumn(
      this.props.summarisedColumn.ColumnId
    );

    configEntity.NegativeValue = Math.min(...distinctColumnsValues);
    configEntity.PositiveValue = Math.max(...distinctColumnsValues);

    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(renderedColumn: GradientColumn) {
    let clonedObject: GradientColumn = Helper.cloneObject(renderedColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let GradientColumn: GradientColumn = this.state.editedAdaptableObject as GradientColumn;
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditGradientColumn(GradientColumn);
    } else {
      this.props.onAddGradientColumn(GradientColumn);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let GradientColumn = this.state.editedAdaptableObject as GradientColumn;
    return StringExtensions.IsNotNullOrEmpty(GradientColumn.ColumnId);
  }
}
function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<GradientColumnSummaryProps> {
  return {
    GradientColumns: state.GradientColumn.GradientColumns,
    ColorPalette: state.UserInterface.ColorPalette,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<GradientColumnSummaryProps> {
  return {
    onAddGradientColumn: (GradientColumn: GradientColumn) =>
      dispatch(GradientColumnRedux.GradientColumnAdd(GradientColumn)),
    onEditGradientColumn: (GradientColumn: GradientColumn) =>
      dispatch(GradientColumnRedux.GradientColumnEdit(GradientColumn)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.GradientColumnStrategyId,
          description
        )
      ),
  };
}

export let GradientColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientColumnSummaryComponent);
