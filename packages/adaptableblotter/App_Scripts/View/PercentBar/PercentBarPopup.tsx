import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PercentBarWizard } from './Wizard/PercentBarWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { PercentBarEntityRow } from './PercentBarEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';

import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';

interface PercentBarPopupProps extends StrategyViewPopupProps<PercentBarPopupComponent> {
  PercentBars: PercentBar[];
  onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
  onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class PercentBarPopupComponent extends React.Component<
  PercentBarPopupProps,
  EditableConfigEntityState
> {
  constructor(props: PercentBarPopupProps) {
    super(props);
    this.state = {
      EditedAdaptableBlotterObject: null,
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
          let distinctColumnsValues: number[] = this.props.Blotter.StrategyService.getDistinctColumnValues(
            columnId
          );

          let newPercentRender: PercentBar = ObjectFactory.CreateEmptyPercentBar();
          newPercentRender.ColumnId = columnId;
          newPercentRender.MinValue = Math.min(...distinctColumnsValues);
          newPercentRender.MaxValue = Math.max(...distinctColumnsValues);
          this.onNewFromColumn(newPercentRender);
        }
        if (this.props.PopupParams.action == 'Edit') {
          let editPercentRender = this.props.PercentBars.find(x => x.ColumnId == columnId);
          this.onEdit(editPercentRender);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Use Percent Bars to render numeric columns with a coloured bar, the length of which is dependent on the column value',
      <br />,
      <br />,
      'For each Percent Bar you can select the colours and range boundaries.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 2 },
      { Content: 'Min', Size: 2 },
      { Content: 'Max', Size: 2 },
      { Content: 'Positive', Size: 2 },
      { Content: 'Negative', Size: 2 },
      { Content: '', Size: 2 },
    ];

    let PercentBarItems = this.props.PercentBars.map((percentBar: PercentBar, index) => {
      let column = ColumnHelper.getColumnFromId(percentBar.ColumnId, this.props.Columns);
      return (
        <PercentBarEntityRow
          key={percentBar.Uuid}
          colItems={colItems}
          AdaptableBlotterObject={percentBar}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          ColorPalette={this.props.ColorPalette}
          onEdit={() => this.onEdit(percentBar)}
          onShare={() => this.props.onShare(percentBar)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={PercentBarRedux.PercentBarDelete(percentBar)}
          onMinimumValueChanged={(percentBar, minimumValue) =>
            this.onMinimumValueChanged(percentBar, minimumValue)
          }
          onMaximumValueChanged={(percentBar, maximumValue) =>
            this.onMaximumValueChanged(percentBar, maximumValue)
          }
          onPositiveColorChanged={(percentBar, positiveColor) =>
            this.onPositiveColorChanged(percentBar, positiveColor)
          }
          onNegativeColorChanged={(percentBar, negativeColor) =>
            this.onNegativeColorChanged(percentBar, negativeColor)
          }
          AccessLevel={this.props.AccessLevel}
        />
      );
    });
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
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.MinValue = minimumValue;
    this.props.onEditPercentBar(clonedPercentBar);
  }
  onMaximumValueChanged(percentBar: PercentBar, maximumValue: number): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.MaxValue = maximumValue;
    this.props.onEditPercentBar(clonedPercentBar);
  }
  onPositiveColorChanged(percentBar: PercentBar, positiveColor: string): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.PositiveColor = positiveColor;
    this.props.onEditPercentBar(clonedPercentBar);
  }
  onNegativeColorChanged(percentBar: PercentBar, negativeColor: string): void {
    let clonedPercentBar: PercentBar = Helper.cloneObject(percentBar);
    clonedPercentBar.NegativeColor = negativeColor;
    this.props.onEditPercentBar(clonedPercentBar);
  }

  onNewFromColumn(percentBar: PercentBar) {
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

  onEdit(percentBar: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(percentBar);
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
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let percentBar: PercentBar = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
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
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard(): boolean {
    let percentBar = this.state.EditedAdaptableBlotterObject as PercentBar;
    if (
      StringExtensions.IsNullOrEmpty(percentBar.ColumnId) ||
      StringExtensions.IsNullOrEmpty(percentBar.PositiveColor) ||
      StringExtensions.IsNullOrEmpty(percentBar.NegativeColor)
    ) {
      return false;
    }
    // we are not currently checking for columns - ok? or problem?
    return true;
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    PercentBars: state.PercentBar.PercentBars,
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

export let PercentBarPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(PercentBarPopupComponent);
