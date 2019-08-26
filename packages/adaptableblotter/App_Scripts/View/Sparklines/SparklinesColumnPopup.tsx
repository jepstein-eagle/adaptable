import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as SparklineColumnRedux from '../../Redux/ActionsReducers/SparklineColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { SparklinesColumnWizard } from './Wizard/SparklinesColumnWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { SparklinesColumnEntityRow } from './SparklinesColumnEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';

import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';

import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { SparklineColumn } from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

interface SparklinesColumnPopupProps
  extends StrategyViewPopupProps<SparklinesColumnPopupComponent> {
  SparklineColumns: SparklineColumn[];
  onAddSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnAddAction;
  onEditSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class SparklinesColumnPopupComponent extends React.Component<
  SparklinesColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: SparklinesColumnPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    let sparklineColumnId = this.props.PopupParams;
    if (sparklineColumnId) {
      const sparklineColumn = this.props.SparklineColumns.filter(
        c => c.ColumnId === sparklineColumnId
      )[0];

      if (sparklineColumn) {
        this.onEdit(sparklineColumn);
      }
    }
  }

  render() {
    let infoBody: any[] = ['Use Sparklines to render columns with arrays of numeric values'];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 2 },
      { Content: 'Min', Size: 2 },
      { Content: 'Max', Size: 2 },

      { Content: '', Size: 2 },
    ];

    let SparklineItems = this.props.SparklineColumns.map((sparklineColumn: SparklineColumn) => {
      let column = ColumnHelper.getColumnFromId(sparklineColumn.ColumnId, this.props.Columns);
      return (
        <SparklinesColumnEntityRow
          key={sparklineColumn.Uuid}
          colItems={colItems}
          AdaptableBlotterObject={sparklineColumn}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          onEdit={() => this.onEdit(sparklineColumn)}
          onShare={() => this.props.onShare(sparklineColumn)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={SparklineColumnRedux.SparklineColumnsDelete(sparklineColumn)}
          onMinimumValueChanged={(sparklineColumn, minimumValue) =>
            this.onMinimumValueChanged(sparklineColumn, minimumValue)
          }
          onMaximumValueChanged={(sparklineColumn, maximumValue) =>
            this.onMaximumValueChanged(sparklineColumn, maximumValue)
          }
          AccessLevel={this.props.AccessLevel}
        />
      );
    });
    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Sparkline Column "
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.SparklinesColumnStrategyName}
          style={{ height: '100%' }}
          button={newButton}
          glyphicon={StrategyConstants.SparklinesGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {SparklineItems.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={SparklineItems} />
          ) : (
            <EmptyContent>
              <p>Click 'New' to start creating Sparkline Columns.</p>
              <p>
                Visualise numeric array columns as a sparkline in order better to see their
                contents.
              </p>
            </EmptyContent>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <SparklinesColumnWizard
              EditedAdaptableBlotterObject={
                this.state.EditedAdaptableBlotterObject as SparklineColumn
              }
              ConfigEntities={null}
              Blotter={this.props.Blotter}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
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

  onMinimumValueChanged(sparklineColumn: SparklineColumn, minimumValue: number): void {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(sparklineColumn);
    clonedSparklineColumn.MinimumValue = minimumValue;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  }
  onMaximumValueChanged(sparklineColumn: SparklineColumn, maximumValue: number): void {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(sparklineColumn);
    clonedSparklineColumn.MaximumValue = maximumValue;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  }

  onNewFromColumn(sparklineColumn: SparklineColumn) {
    this.setState({
      EditedAdaptableBlotterObject: sparklineColumn,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptySparklineColumn(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }

  onEdit(sparklineColumn: SparklineColumn) {
    let clonedObject: SparklineColumn = Helper.cloneObject(sparklineColumn);
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
    let sparklineColumn: SparklineColumn = Helper.cloneObject(
      this.state.EditedAdaptableBlotterObject
    );
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditSparklineColumn(sparklineColumn);
    } else {
      this.props.onAddSparklineColumn(sparklineColumn);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard(): boolean {
    let sparklineColumn = this.state.EditedAdaptableBlotterObject as SparklineColumn;
    if (StringExtensions.IsNullOrEmpty(sparklineColumn.ColumnId)) {
      return false;
    }

    return true;
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    SparklineColumns: state.SparklineColumn.Columns,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddSparklineColumn: (sparklineColumn: SparklineColumn) =>
      dispatch(SparklineColumnRedux.SparklineColumnsAdd(sparklineColumn)),
    onEditSparklineColumn: (sparklineColumn: SparklineColumn) =>
      dispatch(SparklineColumnRedux.SparklineColumnsEdit(sparklineColumn)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.SparklinesStrategyId)),
  };
}

export let SparklinesColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SparklinesColumnPopupComponent);
