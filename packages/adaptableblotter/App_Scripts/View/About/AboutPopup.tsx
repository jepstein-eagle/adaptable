import * as React from "react";
import * as Redux from "redux";
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux'
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableObjectRow } from "../Components/AdaptableObjectRow";
import { IColItem, KeyValuePair } from "../UIInterfaces";
import { Helper } from "../../Core/Helpers/Helper";
import { AdaptableObjectCollection } from "../Components/AdaptableObjectCollection";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";
import { ICalculatedColumn } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";
import { ColumnFilterHelper } from "../../Core/Helpers/ColumnFilterHelper";
import { ButtonClear } from "../Components/Buttons/ButtonClear";


interface AboutPopupComponentProps extends StrategyViewPopupProps<AboutPopupComponent> {
    CalculatedColumns: ICalculatedColumn[]
    onClearColumnFilters: () => FilterRedux.ColumnFilterClearAllAction,
    onClearAllSorts: () => GridRedux.GridSetSortAction,

}

interface AboutState {
   test: string
}

class AboutPopupComponent extends React.Component<AboutPopupComponentProps, AboutState> {

    constructor(props: AboutPopupComponentProps) {
        super(props);
        this.state = { test: "" }
    }

    

    render() {
        let cssClassName: string = this.props.cssClassName + "__about";
        let colItems: IColItem[] = [
            { Content: "Property", Size: 5 },
            { Content: "Value", Size: 5 },
            { Content: "", Size: 2 },
        ]

        let aboutItems = this.CreateAboutInfo(colItems, cssClassName).map((x, index) => {
            return <AdaptableObjectRow cssClassName={cssClassName} key={index} colItems={x} />
        })

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyIds.AboutStrategyName} bsStyle="primary" glyphicon={StrategyIds.AboutGlyph}>
                <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={aboutItems} />
             </PanelWithImage>
        </div>
    }

    public CreateAboutInfo(colItems: IColItem[], cssClassName: string): IColItem[][] {

        let options: IAdaptableBlotterOptions = this.props.Blotter.BlotterOptions;
        let returnRows: IColItem[][] = []
        returnRows.push(this.createColItem(colItems, "Vendor Grid", this.props.Blotter.VendorGridName));
        returnRows.push(this.createColItem(colItems, "Adaptable Blotter Version", "2.4"));

        if (options.blotterId != undefined) {
            returnRows.push(this.createColItem(colItems, "Blotter Id", options.blotterId));
        }
        if (options.userName != undefined) {
            returnRows.push(this.createColItem(colItems, "User", options.userName));
        }
        if (options.enableAuditLog != undefined) {
            returnRows.push(this.createColItem(colItems, "Audit Log", (options.enableAuditLog) ? "On" : "Off"));
        }
        if (options.enableRemoteConfigServer != undefined) {
            returnRows.push(this.createColItem(colItems, "Remote Configuration", (options.enableRemoteConfigServer) ? "On" : "Off"));
        }
        if (options.serverSearchOption != undefined) {
            returnRows.push(this.createColItem(colItems, "Server Search Option", options.serverSearchOption));
        }
        returnRows.push(this.createColItem(colItems, "Can Sort", this.props.Blotter.isSortable() ? "True" : "False"));

        let sorts = this.props.GridSorts.map(gs => {
            return ColumnHelper.getFriendlyNameFromColumnId(gs.Column, this.props.Columns) + ": " + gs.SortOrder
        })
        let clearSortsButton = <ButtonClear onClick={() => this.props.onClearAllSorts()} bsStyle={"primary"} cssClassName={cssClassName} size={"small"} overrideTooltip="Clear Grid Sorts" DisplayMode="Text+Glyph" overrideDisableButton={ArrayExtensions.IsNullOrEmpty(this.props.GridSorts)} />
       
        returnRows.push(this.createColItem(colItems, "Sorted Columns", ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join("; ") : "None"));
        returnRows.push(this.createColItem(colItems, "Can Filter", this.props.Blotter.isFilterable() ? "True" : "False"));

         let clearFilterButton = <ButtonClear onClick={() => this.clearColumnFilters()} bsStyle={"primary"} cssClassName={cssClassName} size={"small"} overrideTooltip="Clear Column Filters" DisplayMode="Text+Glyph" overrideDisableButton={ArrayExtensions.IsNullOrEmpty(this.props.ColumnFilters)} />
        
        returnRows.push(this.createColItem(colItems, "Column Filters", ColumnFilterHelper.getColumnFiltersDescription(this.props.ColumnFilters, this.props.Columns, this.props.Blotter)));
        returnRows.push(this.createColItem(colItems, "All Rows", this.props.Blotter.getRowCount()));
        returnRows.push(this.createColItem(colItems, "Visible Rows", this.props.Blotter.getVisibleRowCount()));
        returnRows.push(this.createColItem(colItems, "All Columns", this.props.Blotter.getColumnCount()));
        returnRows.push(this.createColItem(colItems, "Visible Column", this.props.Blotter.getVisibleColumnCount()));
        returnRows.push(this.createColItem(colItems, "Can Multi Select", this.props.Blotter.isSelectable() ? "True" : "False"));

        let calcColumns: string[] = this.props.CalculatedColumns.map(c => c.ColumnId)
        returnRows.push(this.createColItem(colItems, "Calculated Columns", ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None"))
        return returnRows;
    }

    createColItem(colItems: IColItem[], item1: any, item2: any, item3: any = null): IColItem[] {
        let rowColItems: IColItem[] = Helper.cloneObject(colItems)
        rowColItems[0].Content = item1
        rowColItems[1].Content = item2
        rowColItems[2].Content = item3

        return rowColItems;
    }

    clearColumnFilters(){
        this.props.onClearColumnFilters();
        this.forceUpdate();
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        ColumnFilters: state.Filter.ColumnFilters,
        GridSorts: state.Grid.GridSorts
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onClearColumnFilters: () => dispatch(FilterRedux.ColumnFilterClearAll()),
    };
}

export let AboutPopup = connect(mapStateToProps, mapDispatchToProps)(AboutPopupComponent);

