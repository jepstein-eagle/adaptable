import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as GradientColumnRedux from '../../Redux/ActionsReducers/GradientColumnRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { GradientColumnEntityRow } from './GradientColumnEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { GradientColumnWizard } from './Wizard/GradientColumnWizard';

interface GradientColumnPopupProps extends StrategyViewPopupProps<GradientColumnPopupComponent> {
  GradientColumns: GradientColumn[];
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

class GradientColumnPopupComponent extends React.Component<
  GradientColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: GradientColumnPopupProps) {
    super(props);
    this.state = {
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    };
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        let columnId: string = this.props.popupParams.column.ColumnId;
        if (this.props.popupParams.action == 'New') {
          let distinctColumnsValues: number[] = this.props.api.columnApi.getDistinctRawValuesForColumn(
            columnId
          );

          let newGradientColumn: GradientColumn = ObjectFactory.CreateEmptyGradientColumn();
          newGradientColumn.ColumnId = columnId;
          let smallestValue = Math.min(...distinctColumnsValues);
          newGradientColumn.NegativeValue = smallestValue < 0 ? smallestValue : undefined;
          let positiveValue = Math.max(...distinctColumnsValues);
          newGradientColumn.PositiveValue = positiveValue > 0 ? positiveValue : undefined;

          // work out the base value
          if (smallestValue > 0) {
            newGradientColumn.BaseValue = smallestValue;
            //   newGradientColumn.NegativeColor = undefined;
          } else {
            let positiveValues: number[] = distinctColumnsValues.filter(f => f > 0);
            newGradientColumn.BaseValue = Math.min(...positiveValues);
          }

          this.onNewFromColumn(newGradientColumn);
        }
        if (this.props.popupParams.action == 'Edit') {
          let editGradientColumn = this.props.GradientColumns.find(x => x.ColumnId == columnId);
          this.onEdit(editGradientColumn);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Use Gradient Columns to render numeric columns according to the ratio of the cell value to a given start and maximum value.',
      <br />,
      <br />,
      'For each Gradient Coumn you can select the colours and range boundaries, and choose whether to include negative numbers.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 2 },
      { Content: 'Pos', Size: 2 },
      { Content: 'Neg', Size: 2 },
      { Content: 'Base', Size: 2 },
      { Content: 'P1', Size: 2 },
      { Content: 'N1', Size: 2 },

      { Content: '', Size: 2 },
    ];

    let GradientColumnItems = this.props.GradientColumns.map(
      (gradientColumn: GradientColumn, index) => {
        let column = this.props.api.columnApi.getColumnFromId(gradientColumn.ColumnId);
        return (
          <GradientColumnEntityRow
            key={gradientColumn.Uuid}
            colItems={colItems}
            api={this.props.api}
            adaptableObject={gradientColumn}
            Column={column}
            onEdit={() => this.onEdit(gradientColumn)}
            onShare={description => this.props.onShare(gradientColumn, description)}
            teamSharingActivated={this.props.teamSharingActivated}
            onDeleteConfirm={GradientColumnRedux.GradientColumnDelete(gradientColumn)}
            onNegativeValueChanged={(gradientColumn, minimumValue) =>
              this.onNegativeValueChanged(gradientColumn, minimumValue)
            }
            onPositiveValueChanged={(gradientColumn, maximumValue) =>
              this.onPositiveValueChanged(gradientColumn, maximumValue)
            }
            onBaseValueChanged={(gradientColumn, maximumValue) =>
              this.onBaseValueChanged(gradientColumn, maximumValue)
            }
            onPositiveColorChanged={(gradientColumn, positiveColor) =>
              this.onPositiveColorChanged(gradientColumn, positiveColor)
            }
            onNegativeColorChanged={(gradientColumn, negativeColor) =>
              this.onNegativeColorChanged(gradientColumn, negativeColor)
            }
            accessLevel={this.props.accessLevel}
          />
        );
      }
    );
    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Percent Bar "
        accessLevel={this.props.accessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.GradientColumnStrategyFriendlyName}
          style={{ height: '100%' }}
          button={newButton}
          glyphicon={StrategyConstants.GradientColumnGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {GradientColumnItems.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={GradientColumnItems} />
          ) : (
            <EmptyContent>
              <p>Click 'New' to start creating Gradient Columns. </p>
              <p>
                Use Gradient Columns to render numeric columns according to the ratio of the cell
                value to a given start and maximum value.
              </p>
              <p>You can select the colours and range boundaries for each Gradient Column.</p>
            </EmptyContent>
          )}

          {this.state.editedAdaptableObject != null && (
            <GradientColumnWizard
              editedAdaptableObject={this.state.editedAdaptableObject as GradientColumn}
              configEntities={null}
              api={this.props.api}
              modalContainer={this.props.modalContainer}
              wizardStartIndex={this.state.wizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNegativeValueChanged(gradientColumn: GradientColumn, negativeValue: number): void {
    let clonedGradientColumn: GradientColumn = Helper.cloneObject(gradientColumn);
    clonedGradientColumn.NegativeValue = negativeValue;
    this.props.onEditGradientColumn(clonedGradientColumn);
  }
  onPositiveValueChanged(gradientColumn: GradientColumn, positiveValue: number): void {
    let clonedGradientColumn: GradientColumn = Helper.cloneObject(gradientColumn);
    clonedGradientColumn.PositiveValue = positiveValue;
    this.props.onEditGradientColumn(clonedGradientColumn);
  }
  onBaseValueChanged(gradientColumn: GradientColumn, baseValue: number): void {
    let clonedGradientColumn: GradientColumn = Helper.cloneObject(gradientColumn);
    clonedGradientColumn.BaseValue = baseValue;
    this.props.onEditGradientColumn(clonedGradientColumn);
  }

  onPositiveColorChanged(gradientColumn: GradientColumn, positiveColor: string): void {
    let clonedGradientColumn: GradientColumn = Helper.cloneObject(gradientColumn);
    clonedGradientColumn.PositiveColor = positiveColor;
    this.props.onEditGradientColumn(clonedGradientColumn);
  }
  onNegativeColorChanged(gradientColumn: GradientColumn, negativeColor: string): void {
    let clonedGradientColumn: GradientColumn = Helper.cloneObject(gradientColumn);
    clonedGradientColumn.NegativeColor = negativeColor;
    this.props.onEditGradientColumn(clonedGradientColumn);
  }

  onNewFromColumn(GradientColumn: GradientColumn) {
    this.setState({
      editedAdaptableObject: GradientColumn,
      wizardStatus: WizardStatus.New,
      wizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyGradientColumn(),
      wizardStatus: WizardStatus.New,
      wizardStartIndex: 0,
    });
  }

  onEdit(GradientColumn: GradientColumn) {
    let clonedObject: GradientColumn = Helper.cloneObject(GradientColumn);
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
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let gradientColumn: GradientColumn = Helper.cloneObject(this.state.editedAdaptableObject);
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditGradientColumn(gradientColumn);
    } else {
      this.props.onAddGradientColumn(gradientColumn);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard(): boolean {
    let gradientColumn = this.state.editedAdaptableObject as GradientColumn;

    if (StringExtensions.IsNullOrEmpty(gradientColumn.ColumnId)) {
      return false;
    }

    if (
      StringExtensions.IsNullOrEmpty(gradientColumn.PositiveColor) &&
      StringExtensions.IsNullOrEmpty(gradientColumn.NegativeColor)
    ) {
      return false;
    }

    if (!gradientColumn.PositiveValue && !gradientColumn.NegativeValue) {
      return false;
    }

    // if a positive value is set then need a positive colour
    if (
      gradientColumn.PositiveValue &&
      StringExtensions.IsNullOrEmpty(gradientColumn.PositiveColor)
    ) {
      return false;
    }
    // if a negative value is set then need a negative colour
    if (
      gradientColumn.NegativeValue &&
      StringExtensions.IsNullOrEmpty(gradientColumn.NegativeColor)
    ) {
      return false;
    }

    return true;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<GradientColumnPopupProps> {
  return {
    GradientColumns: state.GradientColumn.GradientColumns,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<GradientColumnPopupProps> {
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

export let GradientColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientColumnPopupComponent);
