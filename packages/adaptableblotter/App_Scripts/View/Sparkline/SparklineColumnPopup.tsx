import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as SparklineColumnRedux from '../../Redux/ActionsReducers/SparklineColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '../../Utilities/Helpers/Helper';

import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';

import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';

import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { SparklineColumn } from '../../PredefinedConfig/SparklineColumnState';
import { SparklineTypeEnum } from '../../PredefinedConfig/Common/ChartEnums';
import { SparklineColumnEntityRow } from './SparklineColumnEntityRow';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { SparklineColumnWizard } from './Wizard/SparklineColumnWizard';
import ObjectFactory from '../../Utilities/ObjectFactory';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

interface SparklineColumnPopupProps extends StrategyViewPopupProps<SparklineColumnPopupComponent> {
  SparklineColumns: SparklineColumn[];
  onAddSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnAddAction;
  onEditSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class SparklineColumnPopupComponent extends React.Component<
  SparklineColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: SparklineColumnPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    if (this.props.PopupParams) {
      let sparklineColumnId = this.props.PopupParams.columnId;
      if (sparklineColumnId) {
        const sparklineColumn = this.props.SparklineColumns.filter(
          c => c.ColumnId === sparklineColumnId
        )[0];

        if (sparklineColumn) {
          this.onEdit(sparklineColumn);
        }
      }
    }
  }

  render() {
    let infoBody: any[] = ['Use Sparklines to render columns with arrays of numeric values'];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 2 },
      { Content: 'Type', Size: 2 },
      { Content: 'Min', Size: 2 },
      { Content: 'Max', Size: 2 },
      { Content: 'Color', Size: 2 },
      { Content: '', Size: 2 },
    ];

    let SparklineItems = this.props.SparklineColumns.map((sparklineColumn: SparklineColumn) => {
      let column = ColumnHelper.getColumnFromId(sparklineColumn.ColumnId, this.props.Columns);
      return (
        <SparklineColumnEntityRow
          key={sparklineColumn.Uuid}
          colItems={colItems}
          AdaptableObject={sparklineColumn}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          ColorPalette={this.props.ColorPalette}
          onEdit={() => this.onEdit(sparklineColumn)}
          onShare={() => this.props.onShare(sparklineColumn)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={SparklineColumnRedux.SparklineColumnsDelete(sparklineColumn)}
          onMinimumValueChanged={(sparklineColumn, minimumValue) =>
            this.onMinimumValueChanged(sparklineColumn, minimumValue)
          }
          onSparklineTypeChange={this.onSparklineTypeChange}
          onMaximumValueChanged={(sparklineColumn, maximumValue) =>
            this.onMaximumValueChanged(sparklineColumn, maximumValue)
          }
          onLineColorChanged={(sparklineColumn, color) =>
            this.onLineColorChanged(sparklineColumn, color)
          }
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.SparklineColumnStrategyName}
          style={{ height: '100%' }}
          glyphicon={StrategyConstants.SparklinesGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {SparklineItems.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={SparklineItems} />
          ) : (
            <EmptyContent>
              <p>You do not have any Sparkline Columns in your Grid.</p>
            </EmptyContent>
          )}

          {this.state.EditedAdaptableObject != null && (
            <SparklineColumnWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as SparklineColumn}
              ConfigEntities={null}
              ColorPalette={this.props.ColorPalette}
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

  onSparklineTypeChange = (
    sparklineColumn: SparklineColumn,
    sparklineType: SparklineTypeEnum
  ): void => {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(sparklineColumn);
    clonedSparklineColumn.SparklineType = sparklineType;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  };
  onMaximumValueChanged(sparklineColumn: SparklineColumn, maximumValue: number): void {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(sparklineColumn);
    clonedSparklineColumn.MaximumValue = maximumValue;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  }

  onLineColorChanged(sparklineColumn: SparklineColumn, color: string): void {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(sparklineColumn);
    clonedSparklineColumn.LineColor = color;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  }

  onNewFromColumn(sparklineColumn: SparklineColumn) {
    this.setState({
      EditedAdaptableObject: sparklineColumn,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptySparklineColumn(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }

  onEdit(sparklineColumn: SparklineColumn) {
    let clonedObject: SparklineColumn = Helper.cloneObject(sparklineColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let sparklineColumn: SparklineColumn = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditSparklineColumn(sparklineColumn);
    } else {
      this.props.onAddSparklineColumn(sparklineColumn);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard(): boolean {
    let sparklineColumn = this.state.EditedAdaptableObject as SparklineColumn;
    if (StringExtensions.IsNullOrEmpty(sparklineColumn.ColumnId)) {
      return false;
    }

    return true;
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    SparklineColumns: state.SparklineColumn.SparklineColumns,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddSparklineColumn: (sparklineColumn: SparklineColumn) =>
      dispatch(SparklineColumnRedux.SparklineColumnsAdd(sparklineColumn)),
    onEditSparklineColumn: (sparklineColumn: SparklineColumn) =>
      dispatch(SparklineColumnRedux.SparklineColumnsEdit(sparklineColumn)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.SparklineStrategyId)),
  };
}

export let SparklineColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SparklineColumnPopupComponent);
