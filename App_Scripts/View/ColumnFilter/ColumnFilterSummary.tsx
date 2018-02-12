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
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import { SummaryRowItem } from '../Components/StrategySummary/SummaryRowItem';
import { StrategyProfile } from '../Components/StrategyProfile'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';


export interface ColumnFilterSummaryProps extends StrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: IColumnFilter[]
    onDeleteFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class ColumnFilterSummaryComponent extends React.Component<ColumnFilterSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;  
    }

    render(): any {

        let columnFilter: IColumnFilter = this.props.ColumnFilters.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let description: string = (columnFilter == null) ? "No Column Filter Active" : ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, this.props.UserFilters)

        let summaryItems: any[] = []
        summaryItems.push(<b>{<StrategyProfile StrategyId={StrategyIds.ColumnFilterStrategyId} />}</b>)
        summaryItems.push(description);
        summaryItems.push(
            <ButtonClear size={"small"} onClick={() => this.props.onDeleteFilter(columnFilter)} overrideTooltip="Clear Column Filter"
                DisplayMode="Glyph"
                overrideDisableButton={columnFilter == null} />)
        return <SummaryRowItem SummaryItems={summaryItems} />
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.ColumnFilterDelete(columnFilter)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ColumnFilterStrategyId))
    };
}

export let ColumnFilterSummary = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterSummaryComponent);