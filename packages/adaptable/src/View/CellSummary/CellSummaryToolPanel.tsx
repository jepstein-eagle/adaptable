import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import * as SelectedCellsRedux from '../../Redux/ActionsReducers/CellSummaryRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { AccessLevel, CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import { CellSummaryOperationDefinition } from '../../PredefinedConfig/CellSummaryState';

import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { CellSummmary } from '../../Utilities/Interface/Selection/CellSummmary';
import { AdaptablePopover } from '../AdaptablePopover';
import { CellSummaryPopover } from './CellSummaryPopover';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import DropdownButton from '../../components/DropdownButton';
import { Flex } from 'rebass';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import Dropdown from '../../components/Dropdown';
import Helper from '../../Utilities/Helpers/Helper';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

interface CellSummaryToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<CellSummaryToolPanelComponent> {
  SelectedCellInfo: SelectedCellInfo;
  CellSummaryOperationDefinitions: CellSummaryOperationDefinition[];
  CellSummaryOperation: CellSummaryOperation | string;
  onCellSummaryOperationChange: (
    summaryOperation: CellSummaryOperation | string
  ) => SelectedCellsRedux.CellSummaryChangeOperationAction;
  onCreateCellSummary: () => GridRedux.GridCreateCellSummaryAction;
  CellSummary: CellSummmary;
}

interface CellSummaryToolPanelComponentState {
  IsMinimised: boolean;
}

class CellSummaryToolPanelComponent extends React.Component<
  CellSummaryToolPanelComponentProps,
  CellSummaryToolPanelComponentState
> {
  constructor(props: CellSummaryToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }
  public componentDidMount() {
    if (this.props.Adaptable) {
      this.props.Adaptable._on('CellsSelected', () => {
        this.props.onCreateCellSummary();
      });
    }
  }

  render() {
    let operationMenuItems = EnumExtensions.getNames(CellSummaryOperation).map(
      (summaryOperation: CellSummaryOperation, index) => {
        return {
          label: summaryOperation as CellSummaryOperation,
          onClick: () => this.props.onCellSummaryOperationChange(summaryOperation),
        };
      }
    );

    const { CellSummaryOperationDefinitions } = this.props;

    const operationDefinitions = CellSummaryOperationDefinitions.map(
      (operationDefinition: CellSummaryOperationDefinition) => {
        return {
          onClick: () => this.props.onCellSummaryOperationChange(operationDefinition.OperationName),
          label: operationDefinition.OperationName,
        };
      }
    );
    let options = [...operationMenuItems, ...operationDefinitions];

    let availableOptions: any[] = options.map((option, index) => {
      return {
        label: option.label,
        value: option.label,
      };
    });

    let cellSummaryPopover = <CellSummaryPopover CellSummary={this.props.CellSummary} />;

    let shouldDisable: boolean =
      this.props.AccessLevel == AccessLevel.ReadOnly ||
      this.props.Adaptable.api.internalApi.isGridInPivotMode() ||
      this.props.CellSummary == null;

    let operationValue = shouldDisable ? null : this.getOperationValue();

    let content = (
      <Flex
        flexDirection="column"
        alignItems="stretch"
        className={
          shouldDisable ? GeneralConstants.READ_ONLY_STYLE : 'ab-ToolPanel__CellSummary__wrap'
        }
      >
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__CellSummary__wrap">
          <Dropdown
            style={{ minWidth: 170 }}
            className="ab-ToolPanel__CellSummary__select"
            placeholder="Select Summary Operation"
            value={this.props.CellSummaryOperation}
            options={availableOptions}
            showClearButton={false}
            //  onChange={() => this.onSelectionChanged()}
            onChange={(summaryOperation: any) =>
              this.props.onCellSummaryOperationChange(summaryOperation)
            }
          />
        </Flex>
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__CellSummary__wrap">
          {!shouldDisable && (
            <>
              {JSON.stringify(operationValue) != '""' && (
                <Flex
                  flexDirection="row"
                  alignItems="stretch"
                  className="ab-ToolPanel__SystemStatus__text"
                  style={{ borderRadius: 'var(--ab__border-radius)' }}
                  marginRight={2}
                  marginLeft={1}
                  marginTop={1}
                  padding={2}
                  color={'var( --ab-color-text-on-info)'}
                  backgroundColor={'var(--ab-color-info)'}
                  fontSize={'var( --ab-font-size-2)'}
                >
                  {this.getOperationValue()}
                </Flex>
              )}

              {this.props.CellSummary != null && this.props.CellSummary.Count > 0 && (
                <AdaptablePopover
                  className="ab-ToolPanel__CellSummary__info"
                  bodyText={[cellSummaryPopover]}
                  useButton={true}
                  showEvent={'focus'}
                  hideEvent="blur"
                />
              )}
            </>
          )}
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__ColumnFilter"
        headerText={StrategyConstants.CellSummaryStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('CellSummary')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
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
      case CellSummaryOperation.Mode:
        return this.props.CellSummary.Mode;
      case CellSummaryOperation.Max:
        return this.props.CellSummary.Max;
      case CellSummaryOperation.Min:
        return this.props.CellSummary.Min;
      case CellSummaryOperation.Distinct:
        return this.props.CellSummary.Distinct;
      case CellSummaryOperation.Count:
        return this.props.CellSummary.Count;
      default:
        return this.props.CellSummary[this.props.CellSummaryOperation];
    }
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    SelectedCellInfo: state.Grid.SelectedCellInfo,
    CellSummaryOperation: state.CellSummary.SummaryOperation,
    CellSummaryOperationDefinitions: state.System.CellSummaryOperationDefinitions,
    CellSummary: state.Grid.CellSummary,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onCellSummaryOperationChange: (summaryOperation: CellSummaryOperation | string) =>
      dispatch(SelectedCellsRedux.CellSummaryChangeOperation(summaryOperation)),
    onCreateCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.CellSummaryStrategyId,
          ScreenPopups.CellSummaryPopup
        )
      ),
  };
}

export let CellSummaryToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(CellSummaryToolPanelComponent);
