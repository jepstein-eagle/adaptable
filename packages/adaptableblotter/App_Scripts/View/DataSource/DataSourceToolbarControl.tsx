﻿import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import { AccessLevel } from "../../Core/Enums";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { IEntitlement } from "../../Core/Interface/Interfaces";


interface DataSourceToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<DataSourceToolbarControlComponent> {
    CurrentDataSource: string;
    DataSources: string[];
     onSelectDataSource: (DataSourceName: string) => DataSourceRedux.DataSourceSelectAction;
  }

class DataSourceToolbarControlComponent extends React.Component<DataSourceToolbarControlComponentProps, {}> {
   
   
    render() {
        const selectDataSourceString: string = "Select Data Source"
        let cssClassName: string = this.props.cssClassName + "__DataSource";
   
        let currentDataSource = StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource) ?
        selectDataSourceString : this.props.CurrentDataSource

        let availableSearches: any[] = this.props.DataSources.filter(s => s != this.props.CurrentDataSource).map((dataSource, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedDataSourceChanged(dataSource)} >{dataSource}</MenuItem>
        })
        let content = <span>

            <InputGroup>
                <DropdownButton disabled={availableSearches.length == 0} style={{ minWidth: "140px" }} 
                  className={cssClassName} bsSize={"small"} bsStyle={"default"} title={currentDataSource} id="DataSource" componentClass={InputGroup.Button}>
                    {availableSearches}
                </DropdownButton>
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedDataSourceChanged("")}
                            size={"small"}
                            overrideTooltip="Clear Search"
                            overrideDisableButton={StringExtensions.IsNullOrEmpty(this.props.CurrentDataSource)}
                            DisplayMode="Glyph" 
                            AccessLevel={this.props.AccessLevel}
                            />
                    </InputGroup.Button>
             </InputGroup>

           </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyIds.DataSourceStrategyName} glyphicon={StrategyIds.DataSourceGlyph} onClose={() => this.props.onClose(StrategyIds.DataSourceStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onSelectedDataSourceChanged(searchName: string) {
        this.props.onSelectDataSource(searchName);
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentDataSource: state.DataSource.CurrentDataSource,
        DataSources: state.DataSource.DataSources,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectDataSource: (DataSourceName: string) => dispatch(DataSourceRedux.DataSourceSelect(DataSourceName)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.DataSourceStrategyId, ScreenPopups.DataSourcePopup))
    };
}

export let DataSourceToolbarControl = connect(mapStateToProps, mapDispatchToProps)(DataSourceToolbarControlComponent);
