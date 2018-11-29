import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { SummaryRowItem } from '../Components/StrategySummary/SummaryRowItem';
import { StrategyProfile } from '../Components/StrategyProfile'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IColumnFilter, IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Utilities/Enums";
import { IEntitlement } from "../../Core/Interface/Interfaces";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";

export interface ColumnFilterSummaryProps extends StrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: IColumnFilter[]
    onClearFilter: (columnId: string) => ColumnFilterRedux.ColumnFilterClearAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
    Entitlements: IEntitlement[]
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
        summaryItems.push(<b>{<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyConstants.ColumnFilterStrategyId} />}</b>)
        summaryItems.push(description);
        summaryItems.push(
            <ButtonClear cssClassName={this.props.cssClassName}
                bsStyle={StyleConstants.PRIMARY_BSSTYLE}
                size={"xs"} onClick={() => this.props.onClearFilter(columnFilter.ColumnId)}
                overrideTooltip="Clear Column Filter"
                DisplayMode="Glyph"
                overrideDisableButton={columnFilter == null}
                AccessLevel={this.props.AccessLevel} />)

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
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearFilter: (columnId: string) => dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnFilterStrategyId))
    };
}

export let ColumnFilterSummary = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterSummaryComponent);