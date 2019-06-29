import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/CellSummaryRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { IAdaptableBlotter } from '../../Utilities/Interface/IAdaptableBlotter';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import {
  AccessLevel,
  CellSummaryOperation,
  CellSummaryOptionalOperation,
  DashboardSize,
} from '../../PredefinedConfig/Common/Enums';
import { DropdownButton, MenuItem, InputGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { AdaptablePopover } from '../AdaptablePopover';
import { CellSummaryPopover } from './CellSummaryPopover';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

interface CellSummaryToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<CellSummaryToolbarControlComponent> {
  SelectedCellInfo: ISelectedCellInfo;
  CellSummaryOperation: CellSummaryOperation | CellSummaryOptionalOperation;
  OptionalSummaryOperations: string[];
  onCellSummaryOperationChange: (
    summaryOperation: CellSummaryOperation | CellSummaryOptionalOperation
  ) => SelectedCellsRedux.CellSummaryChangeOperationAction;
  onCreateCellSummary: () => GridRedux.GridCreateCellSummaryAction;
  CellSummary: ICellSummmary;
}

interface CellSummaryToolbarControlComponentState {
  SubFunc: any;
}

class CellSummaryToolbarControlComponent extends React.Component<
  CellSummaryToolbarControlComponentProps,
  CellSummaryToolbarControlComponentState
> {
  constructor(props: CellSummaryToolbarControlComponentProps) {
    super(props);
    this.state = {
      SubFunc: (sender: IAdaptableBlotter, event: IAdaptableBlotter) => {
        this.onSelectionChanged();
      },
    };
  }
  public componentDidMount() {
    if (this.props.Blotter) {
      this.props.Blotter.onSelectedCellsChanged().Subscribe(this.state.SubFunc);
    }
  }

  public componentWillUnmount() {
    if (this.props.Blotter) {
      this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__CellSummary';

    let operationMenuItems = EnumExtensions.getNames(CellSummaryOperation).map(
      (summaryOperation: CellSummaryOperation, index) => {
        return (
          <MenuItem
            key={index}
            eventKey="index"
            onClick={() => this.props.onCellSummaryOperationChange(summaryOperation)}
          >
            {summaryOperation as CellSummaryOperation}
          </MenuItem>
        );
      }
    );

    let operationOptionalMenuItems = EnumExtensions.getNames(CellSummaryOptionalOperation).map(
      (summaryOperation: CellSummaryOptionalOperation, index) => {
        if (ArrayExtensions.ContainsItem(this.props.OptionalSummaryOperations, summaryOperation)) {
          return (
            <MenuItem
              key={index}
              eventKey="index"
              onClick={() => this.props.onCellSummaryOperationChange(summaryOperation)}
            >
              {summaryOperation as CellSummaryOptionalOperation}
            </MenuItem>
          );
        }
      }
    );
    let cellSummaryPopover = (
      <CellSummaryPopover cssClassName={cssClassName} CellSummary={this.props.CellSummary} />
    );

    let content = (
      <span>
        <div
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <InputGroup>
            <DropdownButton
              style={{ marginRight: '3px', width: '75px' }}
              title={this.props.CellSummaryOperation}
              id="CellSummary_Operation"
              bsSize={this.props.DashboardSize}
              componentClass={InputGroup.Button}
            >
              {operationMenuItems}
              {operationOptionalMenuItems}
            </DropdownButton>
            {this.props.CellSummary != null && (
              <span>
                <ControlLabel style={{ marginLeft: '3px' }}>
                  {this.getOperationValue()}{' '}
                </ControlLabel>{' '}
                {this.props.CellSummary != null && this.props.CellSummary.Count > 0 && (
                  <AdaptablePopover
                    showDefaultStyle={this.props.UseSingleColourForButtons}
                    size={this.props.DashboardSize}
                    cssClassName={cssClassName}
                    headerText="Cell Summary"
                    bodyText={[cellSummaryPopover]}
                    tooltipText={'Show Cell Summary'}
                    useButton={true}
                    triggerAction={'click'}
                    popoverMinWidth={300}
                  />
                )}
              </span>
            )}
          </InputGroup>
        </div>
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
        headerText={StrategyConstants.CellSummaryStrategyName}
        glyphicon={StrategyConstants.CellSummaryGlyph}
        onClose={() => this.props.onClose(StrategyConstants.CellSummaryStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private onSelectionChanged(): void {
    this.props.onCreateCellSummary();
  }

  private getOperationValue(): any {
    switch (this.props.CellSummaryOperation) {
      case CellSummaryOperation.Sum:
        return this.props.CellSummary.Sum;
      case CellSummaryOperation.Average:
        return this.props.CellSummary.Average;
      case CellSummaryOperation.Median:
        return this.props.CellSummary.Median;
      case CellSummaryOperation.Max:
        return this.props.CellSummary.Max;
      case CellSummaryOperation.Min:
        return this.props.CellSummary.Min;
      case CellSummaryOperation.Distinct:
        return this.props.CellSummary.Distinct;
      case CellSummaryOperation.Count:
        return this.props.CellSummary.Count;
      case CellSummaryOptionalOperation.Only:
        return this.props.CellSummary.Only;
      case CellSummaryOptionalOperation.VWAP:
        return this.props.CellSummary.VWAP;
    }
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    SelectedCellInfo: state.Grid.SelectedCellInfo,
    CellSummaryOperation: state.CellSummary.SummaryOperation,
    OptionalSummaryOperations: state.CellSummary.OptionalSummaryOperations,
    CellSummary: state.Grid.CellSummary,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onCellSummaryOperationChange: (
      summaryOperation: CellSummaryOperation | CellSummaryOptionalOperation
    ) => dispatch(SelectedCellsRedux.CellSummaryChangeOperation(summaryOperation)),
    onCreateCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.CellSummaryStrategyId,
          ScreenPopups.CellSummaryPopup
        )
      ),
  };
}

export let CellSummaryToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellSummaryToolbarControlComponent);
