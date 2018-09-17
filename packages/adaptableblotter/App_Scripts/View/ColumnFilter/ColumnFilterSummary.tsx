import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { SummaryRowItem } from '../Components/StrategySummary/SummaryRowItem';
import { StrategyProfile } from '../Components/StrategyProfile'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IColumnFilter, IAdaptableBlotterObject } from "../../Core/Api/Interface/AdaptableBlotterObjects";

export interface ColumnFilterSummaryProps extends StrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: IColumnFilter[]
    onClearFilter: (columnId: string) => FilterRedux.ColumnFilterClearAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class ColumnFilterSummaryComponent extends React.Component<ColumnFilterSummaryProps, EditableConfigEntityState> {

    constructor(props: ColumnFilterSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__columnfilter";
        let columnFilter: IColumnFilter = this.props.ColumnFilters.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let description: string = this.getDescription(columnFilter);

        let summaryItems: any[] = []
        summaryItems.push(<b>{<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyIds.ColumnFilterStrategyId} />}</b>)
        summaryItems.push(description);
        summaryItems.push(
            <ButtonClear cssClassName={this.props.cssClassName}
                bsStyle={"primary"}
                size={"small"} onClick={() => this.props.onClearFilter(columnFilter.ColumnId)}
                overrideTooltip="Clear Column Filter"
                DisplayMode="Glyph"
                overrideDisableButton={columnFilter == null} />)

        return <SummaryRowItem cssClassName={cssWizardClassName} SummaryItems={summaryItems} />
    }

    getDescription(columnFilter: IColumnFilter): string {
        if (this.props.Blotter && !this.props.Blotter.isFilterable()) {
            return "Grid is not filterable"
        }

        if ( this.props.SummarisedColumn  && !this.props.SummarisedColumn.Filterable) {
            return "Column is not filterable"
        }

        if (columnFilter == null) {
            return "No Column Filter Active"
        }
        return ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns)
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnFilters: state.Filter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearFilter: (columnId: string) => dispatch(FilterRedux.ColumnFilterClear(columnId)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ColumnFilterStrategyId))
    };
}

export let ColumnFilterSummary = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterSummaryComponent);