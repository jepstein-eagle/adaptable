import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { AdaptablePopover } from './../AdaptablePopover';
import { PopoverType } from '../../Core/Enums';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';

interface ColumnFilterToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
    onClearFilters: () => FilterRedux.ColumnFilterClearAction,
    IsReadOnly: boolean,
    ColumnFilters: IColumnFilter[],
    Columns: IColumn[],
    UserFilters: IUserFilter[]
}
class ColumnFilterToolbarControlComponent extends React.Component<ColumnFilterToolbarControlComponentProps, {}> {

    render(): any {

        let collapsedText = this.props.ColumnFilters.length == 0 ?
            "None" :
            this.props.ColumnFilters.length == 1 ?
                "1 Column" :
                this.props.ColumnFilters.length + " Columns";

        let infoBody: any[] = []
        this.props.ColumnFilters.forEach(x => {
            let column: IColumn = this.props.Columns.find(c => c.ColumnId == x.ColumnId);
            if (column) {
                let expression: string = ExpressionHelper.ConvertExpressionToString(x.Filter, this.props.Columns, this.props.UserFilters)
                infoBody.push(<b> {column.FriendlyName} </b>)
                infoBody.push(expression, <br/>)    
            }
        })

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                {collapsedText}
                {' '}
                {infoBody.length > 0 &&
                    <AdaptablePopover headerText="Active Filters" bodyText={infoBody} popoverType={PopoverType.Info} />
                }
                {' '}
                <ButtonClear onClick={() => this.props.onClearFilters()}
                   size={"small"} 
                   overrideTooltip="Clear Column Filters"
                    DisplayMode="Glyph"
                    overrideDisableButton={this.props.ColumnFilters.length == 0} />
            </div>
        </span>

        return  <div className="adaptable_blotter_style_dashboard_columnfilter">
        <PanelDashboard headerText={StrategyNames.ColumnFilterStrategyName} glyphicon={StrategyGlyphs.ColumnFilterGlyph} onClose={() => this.props.onClose(StrategyIds.ColumnFilterStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
        </div>
    }



}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
           ColumnFilters: state.Filter.ColumnFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearFilters: () => dispatch(FilterRedux.ColumnFilterClear()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.ColumnFilterPopup, isReadOnly))
    };
}

export let ColumnFilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);