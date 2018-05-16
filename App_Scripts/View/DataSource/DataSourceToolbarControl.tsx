import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { SortOrder } from '../../Core/Enums';
import { InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'


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
                            ConfigEntity={null}
                            DisplayMode="Glyph" />
                    </InputGroup.Button>
             </InputGroup>

           </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.DataSourceStrategyName} glyphicon={StrategyGlyphs.DataSourceGlyph} onClose={() => this.props.onClose(StrategyIds.DataSourceStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
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
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardSetToolbarVisibility(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.DataSourcePopup, isReadOnly))
    };
}

export let DataSourceToolbarControl = connect(mapStateToProps, mapDispatchToProps)(DataSourceToolbarControlComponent);
