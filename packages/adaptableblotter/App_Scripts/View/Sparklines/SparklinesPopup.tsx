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
import { PercentBarWizard } from './Wizard/SparklinesWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { PercentBarEntityRow } from './SparklinesEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { PercentBar } from '../../PredefinedConfig/RunTimeState/PercentBarState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';

import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { SparklineColumn } from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

interface SparklinesPopupProps extends StrategyViewPopupProps<SparklinesPopupComponent> {
  SparklineColumns: SparklineColumn[];
  onAddSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnAddAction;
  onEditSparklineColumn: (
    sparklineColumn: SparklineColumn
  ) => SparklineColumnRedux.SparklineColumnEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class SparklinesPopupComponent extends React.Component<
  SparklinesPopupProps,
  EditableConfigEntityState
> {
  constructor(props: SparklinesPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    };
  }

  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      if (arrayParams.length == 2 && arrayParams[0] == 'New') {
        let columnId: string = arrayParams[1];
        let distinctColumnsValues: number[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
          columnId,
          DistinctCriteriaPairValue.RawValue,
          false
        ).map(pair => {
          return pair.RawValue;
        });
        let newPercentRender: PercentBar = ObjectFactory.CreateEmptyPercentBar();
        newPercentRender.ColumnId = columnId;
        newPercentRender.MinValue = Math.min(...distinctColumnsValues);
        newPercentRender.MaxValue = Math.max(...distinctColumnsValues);
        this.onNewFromColumn(newPercentRender);
      }
      // if (arrayParams.length == 2 && arrayParams[0] == 'Edit') {
      //   let editPercentRender = this.props.SparklineColumns.find(x => x.ColumnId == arrayParams[1]);
      //   this.onEdit(editPercentRender);
      // }
    }
  }

  render() {
    let infoBody: any[] = ['Use Sparklines to render columns with arrays of numeric values'];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 2 },
      { Content: 'Min', Size: 2 },
      { Content: 'Max', Size: 2 },
      { Content: 'Positive', Size: 2 },
      { Content: 'Negative', Size: 2 },
      { Content: '', Size: 2 },
    ];

    let PercentBarItems = this.props.SparklineColumns.map(
      (sparklineColumn: SparklineColumn, index) => {
        let column = ColumnHelper.getColumnFromId(sparklineColumn.ColumnId, this.props.Columns);
        return (
          <PercentBarEntityRow
            key={sparklineColumn.Uuid}
            colItems={colItems}
            AdaptableBlotterObject={sparklineColumn}
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
            onMaximumValueChanged={(sparklineColumn, maximumValue) =>
              this.onMaximumValueChanged(sparklineColumn, maximumValue)
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
          headerText={StrategyConstants.PercentBarStrategyName}
          style={{ height: '100%' }}
          button={newButton}
          glyphicon={StrategyConstants.PercentBarGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {PercentBarItems.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={PercentBarItems} />
          ) : (
            <EmptyContent>
              <p>Click 'New' to start creating Percent Bars.</p>
              <p>
                Visualise numeric columns as a bar (positive, negative or both) in order better to
                see their contents.
              </p>
            </EmptyContent>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <PercentBarWizard
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as PercentBar}
              ConfigEntities={null}
              Blotter={this.props.Blotter}
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

  onMinimumValueChanged(percentBar: PercentBar, minimumValue: number): void {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(percentBar);
    clonedSparklineColumn.MinimumValue = minimumValue;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  }
  onMaximumValueChanged(percentBar: SparklineColumn, maximumValue: number): void {
    let clonedSparklineColumn: SparklineColumn = Helper.cloneObject(percentBar);
    clonedSparklineColumn.MaximumValue = maximumValue;
    this.props.onEditSparklineColumn(clonedSparklineColumn);
  }

  onNewFromColumn(percentBar: SparklineColumn) {
    this.setState({
      EditedAdaptableBlotterObject: percentBar,
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 1,
    });
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyPercentBar(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }

  onEdit(sparklineColumn: SparklineColumn) {
    let clonedObject: PercentBar = Helper.cloneObject(sparklineColumn);
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
    let percentBar: PercentBar = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditSparklineColumn(percentBar);
    } else {
      this.props.onAddSparklineColumn(percentBar);
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
    onAddSparklineColumn: (percentBar: PercentBar) =>
      dispatch(SparklineColumnRedux.SparklineColumnsAdd(percentBar)),
    onEditSparklineColumn: (percentBar: PercentBar) =>
      dispatch(SparklineColumnRedux.SparklineColumnsEdit(percentBar)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.SparklinesStrategyId)),
  };
}

export let PercentBarPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SparklinesPopupComponent);
