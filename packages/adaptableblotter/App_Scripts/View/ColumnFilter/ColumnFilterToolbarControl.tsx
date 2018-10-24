import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { AdaptablePopover } from '../AdaptablePopover';
import { MessageType, AccessLevel } from '../../Core/Enums';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IUserFilter, IColumnFilter } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { FormControl } from "react-bootstrap";
import { ColumnFilterHelper } from "../../Core/Helpers/ColumnFilterHelper";
import { KeyValuePair } from "../UIInterfaces";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { IEntitlement } from "../../Core/Interface/Interfaces";

interface ColumnFilterToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ColumnFilterToolbarControlComponent> {
    onClearAllFilters: () => ColumnFilterRedux.ColumnFilterClearAllAction,
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

                let filterStrings: KeyValuePair[] = ColumnFilterHelper.ConvertColumnFiltersToKVPArray(this.props.ColumnFilters, this.props.Columns)
        let infoBody: any[] = []
       filterStrings.forEach(fs => {
                infoBody.push(<b> {fs.Key} </b>)
                infoBody.push(fs.Value, <br />)
            
        })

        let content = <span>
            <div className={this.props.AccessLevel==AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <FormControl bsSize="small" style={{ width: "80px" }} value={collapsedText} disabled={true} type="string" />
                {' '}
                {infoBody.length > 0 &&
                    <span>
                        <AdaptablePopover cssClassName={cssClassName} headerText="Active Filters" bodyText={infoBody} tooltipText={"Show Filter Details"} MessageType={MessageType.Info} useButton={true} triggerAction={"click"} />

                        {' '}
                        <ButtonClear onClick={() => this.onClearFilters() }
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

    private onClearFilters(){
        // better to put in store but lets test first...
        this.props.onClearAllFilters();
        this.props.Blotter.clearGridFiltering();
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
        onClearAllFilters: () => dispatch(ColumnFilterRedux.ColumnFilterClearAll()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ColumnFilterStrategyId, ScreenPopups.ColumnFilterPopup))
    };
}

export let ColumnFilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterToolbarControlComponent);