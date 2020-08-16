import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import { SummaryRowItem } from '../Components/StrategySummary/SummaryRowItem';
import { StrategyProfile } from '../Components/StrategyProfile';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { ColumnFilter } from '../../PredefinedConfig/FilterState';

export interface ColumnFilterSummaryProps
  extends StrategySummaryProps<ColumnFilterSummaryComponent> {
  ColumnFilters: ColumnFilter[];
  onClearFilter: (columnfilter: ColumnFilter) => FilterRedux.ColumnFilterClearAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
  Entitlements: Entitlement[];
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
      <b>{<StrategyProfile FunctionName={StrategyConstants.ColumnFilterStrategyId} />}</b>
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
    return ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Api);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<ColumnFilterSummaryProps> {
  return {
    ColumnFilters: state.ColumnFilter.ColumnFilters,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ColumnFilterSummaryProps> {
  return {
    onClearFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterClear(columnFilter)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.ColumnFilterStrategyId,
          description
        )
      ),
  };
}

export let ColumnFilterSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnFilterSummaryComponent);
