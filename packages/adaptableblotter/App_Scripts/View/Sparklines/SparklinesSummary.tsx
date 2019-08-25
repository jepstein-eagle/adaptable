import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { SparklineWizard } from './Wizard/SparklinesWizard';
import * as SparklineColumnRedux from '../../Redux/ActionsReducers/SparklineColumnRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { PercentBar } from '../../PredefinedConfig/RunTimeState/PercentBarState';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';
import { SparklineColumn } from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export interface SparklineColumnSummaryProps
  extends StrategySummaryProps<SparklineColumnSummaryComponent> {
  SparklineColumns: SparklineColumn[];
  onAddPercentBar: (percentBar: PercentBar) => SparklineColumnRedux.SparklineColumnAddAction;
  onEditPercentBar: (percentBar: PercentBar) => SparklineColumnRedux.SparklineColumnEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class SparklineColumnSummaryComponent extends React.Component<
  SparklineColumnSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: SparklineColumnSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let sparklineColumn: SparklineColumn = this.props.SparklineColumns.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noSparklinecolumn: boolean = sparklineColumn == null;

    let sparklineColumnRow: any;

    if (noSparklinecolumn) {
      sparklineColumnRow = (
        <StrategyHeader
          key={StrategyConstants.PercentBarStrategyName}
          StrategyId={StrategyConstants.PercentBarStrategyId}
          StrategySummary={'No Percent Bar'}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.PercentBarStrategyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else {
      sparklineColumnRow = (
        <StrategyDetail
          key={StrategyConstants.PercentBarStrategyName}
          Item1={<StrategyProfile StrategyId={StrategyConstants.PercentBarStrategyId} />}
          Item2={'Percent Bar set'}
          ConfigEnity={sparklineColumn}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.PercentBarStrategyName}
          onEdit={() => this.onEdit(sparklineColumn)}
          onShare={() => this.props.onShare(sparklineColumn)}
          onDelete={SparklineColumnRedux.SparklineColumnsDelete(sparklineColumn)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {sparklineColumnRow}

        {this.state.EditedAdaptableBlotterObject && (
          <SparklineWizard
            EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as PercentBar}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            ConfigEntities={this.props.SparklineColumns}
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
    let configEntity: PercentBar = ObjectFactory.CreateEmptyPercentBar();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;

    let distinctColumnsValues: number[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
      this.props.SummarisedColumn.ColumnId,
      DistinctCriteriaPairValue.RawValue,
      false
    ).map(pair => {
      return pair.RawValue;
    });
    configEntity.MinValue = Math.min(...distinctColumnsValues);
    configEntity.MaxValue = Math.max(...distinctColumnsValues);

    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(renderedColumn: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(renderedColumn);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
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
    let percentBar: PercentBar = this.state.EditedAdaptableBlotterObject as PercentBar;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPercentBar(percentBar);
    } else {
      this.props.onAddPercentBar(percentBar);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let percentBar = this.state.EditedAdaptableBlotterObject as PercentBar;
    return StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId);
  }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    SparklineColumns: state.SparklineColumn.Columns,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarAdd(percentBar)),
    onEditPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarEdit(percentBar)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
  };
}

export let SparklineColumnSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(SparklineColumnSummaryComponent);
