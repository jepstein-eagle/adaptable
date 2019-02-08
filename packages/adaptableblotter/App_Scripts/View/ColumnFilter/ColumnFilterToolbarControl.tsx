import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IColumn } from '../../Utilities/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import { AdaptablePopover } from '../AdaptablePopover';
import { MessageType, AccessLevel } from '../../Utilities/Enums';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { IEntitlement } from "../../Utilities/Interface/IEntitlement";
import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { FormControl } from "react-bootstrap";
import { ColumnFilterHelper } from "../../Utilities/Helpers/ColumnFilterHelper";
import { IKeyValuePair } from "../../Utilities/Interface/IKeyValuePair";
import { ActiveFiltersPanel } from "../Components/ActiveFiltersPanel";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { IUIPrompt } from "../../Utilities/Interface/IMessage";

interface ColumnFilterToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
    onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction,
    onClearColumnFilter: (columnId: string) => ColumnFilterRedux.ColumnFilterClearAction,
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
   ColumnFilters: IColumnFilter[],
    Columns: IColumn[],
    UserFilters: IUserFilter[]
    Entitlements: IEntitlement[];
}
class ColumnFilterToolbarControlComponent extends React.Component<ColumnFilterToolbarControlComponentProps, {}> {

    render(): any {

        let cssClassName: string = this.props.cssClassName + "__columnfilter";
        let collapsedText = this.props.ColumnFilters.length == 0 ?
            "No Filters" :
            this.props.ColumnFilters.length == 1 ?
                "1 Column" :
                this.props.ColumnFilters.length + " Columns";

        let activeFiltersPanel =
            <ActiveFiltersPanel
                cssClassName={cssClassName}
                Columns={this.props.Columns}
                ColumnFilters={this.props.ColumnFilters}
                AccessLevel={this.props.AccessLevel}
                onClear={(columnFilter: IColumnFilter) => this.onClearColumnFilter(columnFilter)}
                onSaveColumnFilterasUserFilter={(columnFilter: IColumnFilter) => this.onSaveColumnFilterasUserFilter(columnFilter)}
            />

        let content = <span>
            <div className={this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <FormControl bsSize="small" style={{ width: "80px" }} value={collapsedText} disabled={true} type="string" />
                {' '}
                {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters) &&
                    <span>
                        <AdaptablePopover cssClassName={cssClassName} headerText="Active Filters" bodyText={[activeFiltersPanel]} tooltipText={"Show Filter Details"} useButton={true} triggerAction={"click"} popoverMinWidth={400} />
                        {' '}
                        <ButtonClear onClick={() => this.onClearFilters()}
                            bsStyle={"primary"}
                            cssClassName={cssClassName}
                            size={"small"}
                            overrideTooltip="Clear Column Filters"
                            DisplayMode="Text+Glyph"
                            overrideDisableButton={this.props.ColumnFilters.length == 0}
                            AccessLevel={this.props.AccessLevel}
                        />
                    </span>
                }
            </div>
        </span>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyConstants.ColumnFilterStrategyName} glyphicon={StrategyConstants.ColumnFilterGlyph} onClose={() => this.props.onClose(StrategyConstants.ColumnFilterStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    private onClearFilters() {
        // better to put in store but lets test first...
        this.props.onClearAllFilters();
        this.props.Blotter.clearGridFiltering();
    }

    private onClearColumnFilter(columnFilter: IColumnFilter) {
        this.props.onClearColumnFilter(columnFilter.ColumnId)
        this.props.Blotter.clearColumnFiltering([columnFilter.ColumnId])
    }

    private onSaveColumnFilterasUserFilter(columnFilter: IColumnFilter): void {
        let prompt: IUIPrompt = {
            Header: "Enter name for User Filter",
            Msg: "",
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, "")
        }
        this.props.onShowPrompt(prompt)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearColumnFilter: (columnId: string) => dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
        onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
        onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup))
    };
}

export let ColumnFilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);