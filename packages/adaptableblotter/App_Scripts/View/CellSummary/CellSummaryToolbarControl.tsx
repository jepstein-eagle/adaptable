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
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import {
  AccessLevel,
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common/Enums';

import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ICellSummmary } from '../../Utilities/Interface/Selection/ICellSummmary';
import { AdaptablePopover } from '../AdaptablePopover';
import { CellSummaryPopover } from './CellSummaryPopover';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { CELLS_SELECTED_EVENT } from '../../Utilities/Constants/GeneralConstants';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';

interface CellSummaryToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<CellSummaryToolbarControlComponent> {
  SelectedCellInfo: SelectedCellInfo;
  CellSummaryOperation: CellSummaryOperation | CellSummaryOptionalOperation;
  OptionalSummaryOperations: string[];
  onCellSummaryOperationChange: (
    summaryOperation: CellSummaryOperation | CellSummaryOptionalOperation
  ) => SelectedCellsRedux.CellSummaryChangeOperationAction;
  onCreateCellSummary: () => GridRedux.GridCreateCellSummaryAction;
  CellSummary: ICellSummmary;
}

class CellSummaryToolbarControlComponent extends React.Component<
  CellSummaryToolbarControlComponentProps,
  {}
> {
  constructor(props: CellSummaryToolbarControlComponentProps) {
    super(props);
  }
  public componentDidMount() {
    if (this.props.Blotter) {
      this.props.Blotter.on(CELLS_SELECTED_EVENT, () => {
        this.props.onCreateCellSummary();
      });
    }
  }

  // needed?
  // public componentWillUnmount() {
  //   if (this.props.Blotter) {
  //     this.props.Blotter.onSelectedCellsChanged().Unsubscribe(this.state.SubFunc);
  //   }
  // }

  render() {
    let operationMenuItems = EnumExtensions.getNames(CellSummaryOperation).map(
      (summaryOperation: CellSummaryOperation, index) => {
        return {
          label: summaryOperation as CellSummaryOperation,
          onClick: () => this.props.onCellSummaryOperationChange(summaryOperation),
        };
      }
    );

    let operationOptionalMenuItems = EnumExtensions.getNames(CellSummaryOptionalOperation)
      .map((summaryOperation: CellSummaryOptionalOperation, index) => {
        if (ArrayExtensions.ContainsItem(this.props.OptionalSummaryOperations, summaryOperation)) {
          return {
            onClick: () => this.props.onCellSummaryOperationChange(summaryOperation),
            label: summaryOperation as CellSummaryOptionalOperation,
          };
        }
      })
      .filter(x => !!x);
    let cellSummaryPopover = <CellSummaryPopover CellSummary={this.props.CellSummary} />;

    let content = (
      <Flex
        flexDirection="row"
        alignItems="center"
        width="100%"
        className={
          this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
        }
      >
        <DropdownButton
          marginRight={2}
          columns={['label']}
          items={[...operationMenuItems, ...operationOptionalMenuItems]}
        >
          {this.props.CellSummaryOperation}
        </DropdownButton>
        {this.props.CellSummary != null && (
          <>
            <Flex
              flex={1}
              marginRight={2}
              justifyContent="center"
              color={'var(--ab-color-text-on-primary)'}
            >
              {this.getOperationValue()}
            </Flex>
            {this.props.CellSummary != null && this.props.CellSummary.Count > 0 && (
              <AdaptablePopover
                bodyText={[cellSummaryPopover]}
                tooltipText={'Show Cell Summary'}
                useButton={true}
                showEvent={'focus'}
                hideEvent="blur"
              />
            )}
          </>
        )}
      </Flex>
    );

    return (
      <PanelDashboard
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
