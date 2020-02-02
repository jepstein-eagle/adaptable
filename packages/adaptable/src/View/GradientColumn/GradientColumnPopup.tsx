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
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
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
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class GradientColumnPopupComponent extends React.Component<
  GradientColumnPopupProps,
  EditableConfigEntityState
> {
  constructor(props: GradientColumnPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        let columnId: string = this.props.PopupParams.columnId;
        if (this.props.PopupParams.action == 'New') {
          let distinctColumnsValues: number[] = this.props.Adaptable.StrategyService.getDistinctColumnValues(
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
            newGradientColumn.NegativeColor = undefined;
          } else {
            let positiveValues: number[] = distinctColumnsValues.filter(f => f > 0);
            newGradientColumn.BaseValue = Math.min(...positiveValues);
          }

          this.onNewFromColumn(newGradientColumn);
        }
        if (this.props.PopupParams.action == 'Edit') {
          let editGradientColumn = this.props.GradientColumns.find(x => x.ColumnId == columnId);
          this.onEdit(editGradientColumn);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
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
        let column = ColumnHelper.getColumnFromId(gradientColumn.ColumnId, this.props.Columns);
        return (
          <GradientColumnEntityRow
            key={gradientColumn.Uuid}
            colItems={colItems}
            AdaptableObject={gradientColumn}
            Column={column}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            ColorPalette={this.props.ColorPalette}
            onEdit={() => this.onEdit(gradientColumn)}
            onShare={() => this.props.onShare(gradientColumn)}
            TeamSharingActivated={this.props.TeamSharingActivated}
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
            AccessLevel={this.props.AccessLevel}
          />
        );
      }
    );
    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Percent Bar "
        AccessLevel={this.props.AccessLevel}
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

          {this.state.EditedAdaptableObject != null && (
            <GradientColumnWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as GradientColumn}
              ConfigEntities={null}
              Adaptable={this.props.Adaptable}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              ColorPalette={this.props.ColorPalette}
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
      EditedAdaptableObject: GradientColumn,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyGradientColumn(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }

  onEdit(GradientColumn: GradientColumn) {
    let clonedObject: GradientColumn = Helper.cloneObject(GradientColumn);
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
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let gradientColumn: GradientColumn = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditGradientColumn(gradientColumn);
    } else {
      this.props.onAddGradientColumn(gradientColumn);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard(): boolean {
    let gradientColumn = this.state.EditedAdaptableObject as GradientColumn;

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

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    GradientColumns: state.GradientColumn.GradientColumns,
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

export let GradientColumnPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientColumnPopupComponent);
