import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { SummaryRowItem } from '../Components/StrategySummary/SummaryRowItem';
import { StrategyProfile } from '../Components/StrategyProfile';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { ColumnFilter } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { IEntitlement } from '../../PredefinedConfig/DesignTimeState/EntitlementsState';
import { Column } from 'ag-grid-community';

export interface ColumnFilterSummaryProps
  extends StrategySummaryProps<ColumnFilterSummaryComponent> {
  ColumnFilters: ColumnFilter[];
  onClearFilter: (columnfilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
  Entitlements: IEntitlement[];
}

export class ColumnFilterSummaryComponent extends React.Component<
  ColumnFilterSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: ColumnFilterSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let columnFilter: ColumnFilter = this.props.ColumnFilters.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let description: string = this.getDescription(columnFilter);
    let summaryItems: any[] = [];
    summaryItems.push(
      <b>{<StrategyProfile StrategyId={StrategyConstants.ColumnFilterStrategyId} />}</b>
    );
    summaryItems.push(description);
    summaryItems.push(
      <ButtonClear
        marginLeft={1}
        onClick={() => this.props.onClearFilter(columnFilter)}
        tooltip="Clear Column Filter"
        disabled={columnFilter == null}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <SummaryRowItem SummaryItems={summaryItems} />;
  }

  getDescription(columnFilter: ColumnFilter): string {
    if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
      return 'Column is not filterable';
    }

    if (columnFilter == null) {
      return 'No Column Filter Active';
    }
    return ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns);
  }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ColumnFilters: state.ColumnFilter.ColumnFilters,
    Columns: state.Grid.Columns,
    UserFilters: state.UserFilter.UserFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onClearFilter: (columnFilter: ColumnFilter) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnFilterStrategyId)),
  };
}

export let ColumnFilterSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnFilterSummaryComponent);
