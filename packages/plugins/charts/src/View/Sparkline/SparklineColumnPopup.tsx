import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as SparklineColumnRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SparklineColumnRedux';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';

import {
  EditableConfigEntityState,
  WizardStatus,
} from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '@adaptabletools/adaptable/src/View/UIInterfaces';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '@adaptabletools/adaptable/src/components/EmptyContent';
import { Flex } from 'rebass';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
import { SparklineColumnEntityRow } from './SparklineColumnEntityRow';
import { PanelWithButton } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton';
import { AdaptableObjectCollection } from '@adaptabletools/adaptable/src/View/Components/AdaptableObjectCollection';
import { SparklineColumnWizard } from './Wizard/SparklineColumnWizard';
import ObjectFactory from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import StringExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { AdaptableFunctionName } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Types';

interface SparklineColumnPopupProps extends StrategyViewPopupProps<SparklineColumnPopupComponent> {
  SparklineColumns: SparklineColumn[];
  onAddSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnAddAction;
  onEditSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class SparklineColumnPopupComponent extends React.Component<
  SparklineColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: SparklineColumnPopupProps) {
    super(props);
    this.state = {
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    if (this.props.popupParams) {
      let column = this.props.popupParams.column;
      if (column) {
        const sparklineColumn = this.props.SparklineColumns.filter(
          c => c.ColumnId === column.ColumnId
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
      let column = this.props.api.columnApi.getColumnFromId(sparklineColumn.ColumnId);
      return (
        <SparklineColumnEntityRow
          key={sparklineColumn.Uuid}
          colItems={colItems}
          api={this.props.api}
          adaptableObject={sparklineColumn}
          Column={column}
          onEdit={() => this.onEdit(sparklineColumn)}
          onShare={description => this.props.onShare(sparklineColumn, description)}
          teamSharingActivated={this.props.teamSharingActivated}
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
          accessLevel={this.props.accessLevel}
        />
      );
    });

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.SparklineColumnStrategyFriendlyName}
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

          {this.state.editedAdaptableObject != null && (
            <SparklineColumnWizard
              editedAdaptableObject={this.state.editedAdaptableObject as SparklineColumn}
              configEntities={null}
              api={this.props.api}
              modalContainer={this.props.modalContainer}
              wizardStartIndex={this.state.wizardStartIndex}
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
      editedAdaptableObject: sparklineColumn,
      wizardStatus: WizardStatus.New,
      wizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptySparklineColumn(),
      wizardStatus: WizardStatus.New,
      wizardStartIndex: 0,
    });
  }

  onEdit(sparklineColumn: SparklineColumn) {
    let clonedObject: SparklineColumn = Helper.cloneObject(sparklineColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let sparklineColumn: SparklineColumn = Helper.cloneObject(this.state.editedAdaptableObject);
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditSparklineColumn(sparklineColumn);
    } else {
      this.props.onAddSparklineColumn(sparklineColumn);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard(): boolean {
    let sparklineColumn = this.state.editedAdaptableObject as SparklineColumn;
    if (StringExtensions.IsNullOrEmpty(sparklineColumn.ColumnId)) {
      return false;
    }

    return true;
  }
}

function mapStateToProps(state: AdaptableState): Partial<SparklineColumnPopupProps> {
  return {
    SparklineColumns: state.SparklineColumn.SparklineColumns,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SparklineColumnPopupProps> {
  return {
    onAddSparklineColumn: (sparklineColumn: SparklineColumn) =>
      dispatch(SparklineColumnRedux.SparklineColumnsAdd(sparklineColumn)),
    onEditSparklineColumn: (sparklineColumn: SparklineColumn) =>
      dispatch(SparklineColumnRedux.SparklineColumnsEdit(sparklineColumn)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.SparklineColumnStrategyId,
          description
        )
      ),
  };
}

export let SparklineColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SparklineColumnPopupComponent);
