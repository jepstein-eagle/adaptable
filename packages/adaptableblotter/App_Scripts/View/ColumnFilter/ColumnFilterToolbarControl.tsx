import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as HomeRedux from '../../Redux/ActionsReducers/HomeRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
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
import { FormControl, Label } from "react-bootstrap";
import { ColumnFilterHelper } from "../../Utilities/Helpers/ColumnFilterHelper";
import { IKeyValuePair } from "../../Utilities/Interface/IKeyValuePair";
import { ActiveFiltersPanel } from "../Components/ActiveFiltersPanel";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { IUIPrompt } from "../../Utilities/Interface/IMessage";
import { SUCCESS_BSSTYLE, DEFAULT_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { ButtonDelete } from "../Components/Buttons/ButtonDelete";
import { ButtonNew } from "../Components/Buttons/ButtonNew";
import { ButtonEdit } from "../Components/Buttons/ButtonEdit";
import { ButtonHide } from "../Components/Buttons/ButtonHide";
import { ButtonShow } from "../Components/Buttons/ButtonShow";

interface ColumnFilterToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
    onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction,
    onClearColumnFilter: (columnId: string) => ColumnFilterRedux.ColumnFilterClearAction,
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
    onHideFloatingFilterBar: () => GridRedux.FloatingFilterBarHideAction;
    onShowFloatingFilterBar: () => GridRedux.FloatingFilterBarShowAction;
    ColumnFilters: IColumnFilter[],
    Columns: IColumn[],
    UserFilters: IUserFilter[]
    Entitlements: IEntitlement[];
    IsFloatingFilterActive: boolean
}



class ColumnFilterToolbarControlComponent extends React.Component<ColumnFilterToolbarControlComponentProps, {}> {



    render(): any {

        let cssClassName: string = this.props.cssClassName + "__columnfilter";
        let collapsedText = ArrayExtensions.IsNullOrEmpty(this.props.ColumnFilters) ?
            "No Filters" :
            ArrayExtensions.HasOneItem(this.props.ColumnFilters) ?
                "1 Filter" :
                this.props.ColumnFilters.length + " Filters";

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
                <Label bsSize={"large"} bsStyle={this.getStyleForLabel()}>{collapsedText}</Label>
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
                            DisplayMode="Text"
                            overrideDisableButton={this.props.ColumnFilters.length == 0}
                            AccessLevel={this.props.AccessLevel}
                        />
                    </span>
                }

                {this.props.IsFloatingFilterActive ?
                    <ButtonHide
                        style={{ marginLeft: "2px" }}
                        cssClassName={cssClassName}
                        onClick={() => this.props.onHideFloatingFilterBar()}
                        size={"small"}
                        overrideTooltip="Hide Floating Filter"
                        DisplayMode="Glyph"
                        AccessLevel={this.props.AccessLevel}
                        overrideDisableButton={!this.props.Blotter.BlotterOptions.filterOptions.useAdaptableBlotterFloatingFilter}
                    />
                    :
                    <ButtonShow
                        style={{ marginLeft: "2px" }}
                        cssClassName={cssClassName}
                        onClick={() => this.props.onShowFloatingFilterBar()}
                        size={"small"}
                        overrideTooltip="Show Floating Filter"
                        DisplayMode="Glyph"
                        AccessLevel={this.props.AccessLevel}
                        overrideDisableButton={!this.props.Blotter.BlotterOptions.filterOptions.useAdaptableBlotterFloatingFilter}
                    />

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

    private getStyleForLabel(): string {
        return (ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilters)) ? SUCCESS_BSSTYLE : DEFAULT_BSSTYLE
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
        IsFloatingFilterActive: state.Grid.IsFloatingFilterActive
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearColumnFilter: (columnId: string) => dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
        onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
        onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
        onHideFloatingFilterBar: () => dispatch(GridRedux.FloatingFilterBarHide()),
        onShowFloatingFilterBar: () => dispatch(GridRedux.FloatingilterBarShow()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup))
    };
}

export let ColumnFilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);