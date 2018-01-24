import { IUserFilter } from '../../Core/Interface/IExpression';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import { UserFilterWizard } from '../UserFilter/UserFilterWizard'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyIds from '../../Core/StrategyIds'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Services/UserFilterHelper';
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { IRawValueDisplayValuePair, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { IColumnFilter } from '../../Core/Interface/IColumnFilterStrategy';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';
import { StrategyHeader } from '../Components/StrategyHeader'
import { ButtonClear } from '../Components/Buttons/ButtonClear';


export interface ColumnFilterSummaryProps extends IStrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: IColumnFilter[]
    onDeleteFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class ColumnFilterSummaryComponent extends React.Component<ColumnFilterSummaryProps, StrategySummaryInternalState> {

    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }
    }

    render(): any {

        let columnFilter: IColumnFilter = this.props.ColumnFilters.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let description: string = (columnFilter == null) ? "No Column Filter Active" : ExpressionHelper.ConvertExpressionToString(columnFilter.Filter, this.props.Columns, this.props.UserFilters)

        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: <b>{<StrategyHeader StrategyId={StrategyIds.ColumnFilterStrategyId} />}</b> })
        myCols.push({ size: 6, content: description });
        myCols.push({
            size: 3, content:
                <ButtonClear onClick={() => this.props.onDeleteFilter(columnFilter)} overrideTooltip="Clear Column Filter"
                    DisplayMode="Glyph"
                    overrideDisableButton={columnFilter == null} />
        })
        return <ConfigEntityRow items={myCols} />
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