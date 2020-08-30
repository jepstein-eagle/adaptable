import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
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

export interface FilterSummaryProps extends StrategySummaryProps<FilterSummaryComponent> {
  ColumnFilters: ColumnFilter[];
  onClearFilter: (columnfilter: ColumnFilter) => FilterRedux.ColumnFilterClearAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
  Entitlements: Entitlement[];
}

export class FilterSummaryComponent extends React.Component<
  FilterSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: FilterSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let columnFilter: ColumnFilter = this.props.ColumnFilters.find(
      c => c.ColumnId == this.props.summarisedColumn.ColumnId
    );
    let description: string = this.getDescription(columnFilter);
    let summaryItems: any[] = [];
    summaryItems.push(
      <b>{<StrategyProfile FunctionName={StrategyConstants.FilterStrategyId} />}</b>
    );
    summaryItems.push(description);
    summaryItems.push(
      <ButtonClear
        marginLeft={1}
        onClick={() => this.props.onClearFilter(columnFilter)}
        tooltip="Clear Column Filter"
        disabled={columnFilter == null}
        AccessLevel={this.props.accessLevel}
      />
    );

    return <SummaryRowItem SummaryItems={summaryItems} />;
  }

  getDescription(columnFilter: ColumnFilter): string {
    if (this.props.summarisedColumn && !this.props.summarisedColumn.Filterable) {
      return 'Column is not filterable';
    }

    if (columnFilter == null) {
      return 'No Column Filter Active';
    }
    return this.props.api.filterApi.convertColumnFilterToString(columnFilter);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FilterSummaryProps> {
  return {
    ColumnFilters: state.Filter.ColumnFilters,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FilterSummaryProps> {
  return {
    onClearFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterClear(columnFilter)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FilterStrategyId, description)
      ),
  };
}

export let FilterSummary = connect(mapStateToProps, mapDispatchToProps)(FilterSummaryComponent);
