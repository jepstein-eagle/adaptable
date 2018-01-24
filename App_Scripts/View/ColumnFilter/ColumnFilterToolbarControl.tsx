import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../../Core/Extensions';
import { IToolbarStrategyViewPopupProps } from '../../Core/Interface/IToolbarStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { IColumnFilter } from '../../Core/Interface/IColumnFilterStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/StrategyIds'
import * as ScreenPopups from '../../Core/ScreenPopups'
import { AdaptablePopover } from './../AdaptablePopover';
import { PopoverType } from '../../Core/Enums';
import { IUIConfirmation } from "../../Core/Interface/IStrategy";
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';


interface ColumnFilterToolbarControlComponentProps extends IToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
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
                    overrideTooltip="Clear Column Filters"
                    DisplayMode="Glyph"
                    overrideDisableButton={this.props.ColumnFilters.length == 0} />
            </div>
        </span>

        return <PanelDashboard headerText="Filters" glyphicon="filter" onClose={() => this.props.onClose(this.props.DashboardControl)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }



}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.ColumnFilterStrategyId),
        UserFilters: state.UserFilter.UserFilters,
        Columns: state.Grid.Columns,
        ColumnFilters: state.ColumnFilter.ColumnFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearFilters: () => dispatch(FilterRedux.ColumnFilterClear()),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: () => dispatch(PopupRedux.PopupShow(ScreenPopups.ColumnFilterConfig))
    };
}

export let ColumnFilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);